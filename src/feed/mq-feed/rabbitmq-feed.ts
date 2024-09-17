import { Channel, Connection, MessageProperties, connect } from 'amqplib';
import { isNil } from 'lodash';

import { BaseEntity } from '@entities';
import { IEntityHandler, IFeed, MQSettings } from '@feed';
import { ConsumptionMessageError } from '@lsports/errors';
import { AsyncLock, withRetry } from '@utilities';
import { ILogger } from '@logger';

import { MessageConsumer } from './message-consumer';

/**
 * Class that represent all the abilities of rabbitmq instance
 */
class RabbitMQFeed implements IFeed {
  private requestQueue = 'ReqQueue';

  private connection!: Connection;

  private channel!: Channel;

  private consumerTag!: string;

  private isConnected: boolean = false;

  private stopTryReconnect: boolean = false;

  private readonly reconnectionLock: AsyncLock = new AsyncLock();

  private isReconnecting: boolean = false;

  private readonly consumer: MessageConsumer;

  constructor(
    private mqSettings: MQSettings,
    private logger: ILogger,
  ) {
    this.requestQueue = `_${this.mqSettings.packageId}_`;
    this.stopTryReconnect = false;
    this.consumer = new MessageConsumer(this.logger);
  }

  setLogger = (logger: ILogger): void => {
    this.logger = logger;
  };

  getLogger = (): ILogger => {
    return this.logger;
  };

  public start = async (): Promise<void> => {
    await this.connect();

    this.attachListeners();

    const { prefetchCount, autoAck, consumptionLatencyThreshold } = this.mqSettings;

    // config and define queue prefetch
    await this.channel.prefetch(prefetchCount, false);

    const isAutoAck: boolean = autoAck;

    const { consumerTag } = await this.channel.consume(
      this.requestQueue,
      async (msg) => {
        if (!isNil(msg) && !isNil(msg.content)) {
          try {
            const { content, properties } = msg;
            await this.consumer.HandleBasicMessage(content, {
              messageMqTimestamp: this.getMessageMqTimestamp(properties),
              consumptionLatencyThreshold,
            });

            // Manually acknowledge the processed message
            if (!isAutoAck) await this.channel.ack(msg);
          } catch (err) {
            if (!isAutoAck) await this.channel.nack(msg, false, true);

            throw new ConsumptionMessageError(`Error processing message, Error: ${err}`);
          }
        }
      },
      {
        noAck: isAutoAck,
      },
    );

    this.consumerTag = consumerTag;
  };

  /**
   * establish connectation to rabbitmq
   */
  private connect = async (): Promise<void> => {
    if (this.isConnected && this.channel) return;

    const { host, port, userName, password, virtualHost } = this.mqSettings;

    try {
      this.logger.info('connect - Connecting to RabbitMQ Server');

      // Establish connection to RabbitMQ server
      const connectionString = encodeURI(
        `amqp://${userName}:${password}@${host}:${port}/${virtualHost}`,
      );

      this.connection = await connect(connectionString /*config.msgBrokerURL!*/);

      if (!this.connection) {
        this.logger.error('connect - Failed to connect to RabbitMQ!');
        throw new Error('connect - Failed to connect to RabbitMQ!');
      }

      this.logger.info(
        `connect - Rabbit MQ Connection is ready!\nconnectionString: ${connectionString}\nListen to ${this.requestQueue} queue`,
      );

      this.isConnected = true;
      // create channel through the connection
      this.channel = await this.connection.createChannel();

      this.logger.info('connect - Created RabbitMQ Channel successfully!');
    } catch (err) {
      this.logger.error(`connect - Not connected to MQ Server, error: ${err}`);
      throw err;
    }
  };

  /**
   * attach listeners for desire invoked events
   */
  private attachListeners = (): void => {
    this.connection.on('error', this.connectionErrorHandler);
    this.connection.on('close', this.connectionClosedHandler);
  };

  /**
   * handle close event invoke for rabbitmq instance
   * handle reconnection option
   */
  private connectionClosedHandler = async (): Promise<void> => {
    this.logger.debug('event handler - connection to RabbitMQ closed!');

    this.isConnected = false;

    const { automaticRecoveryEnabled, networkRecoveryIntervalInMs } = this.mqSettings;

    const options = {
      maxAttempts: 12,
      delayMs: networkRecoveryIntervalInMs,
      backoffFactor: 1,
    };

    if (this.stopTryReconnect || this.isConnected || !automaticRecoveryEnabled) {
      return;
    }

    // Retry establish connection after a delay
    await this.reconnectionLock.acquire();

    try {
      if (this.isReconnecting) return; // Already reconnecting, exit to prevent multiple attempts
      this.isReconnecting = true;

      return await withRetry(
        async () => {
          await this.start();
        },
        options,
        'Retry establish connection after a delay',
        this.logger,
      );
    } finally {
      this.isReconnecting = false;
      this.reconnectionLock.release();
    }
  };

  /**
   * handle error event invoke for rabbitmq instance
   * @param err error been thrown
   */
  private connectionErrorHandler = (err: Error): void => {
    this.logger.error(err.message);
  };

  public getMessageMqTimestamp = (msgProperties: MessageProperties): number | undefined => {
    if (isNil(msgProperties)) return;

    const { timestamp, headers } = msgProperties;

    const timestampInMs = headers?.timestamp_in_ms;

    if (!isNil(timestampInMs)) return timestampInMs;
    if (typeof timestamp === 'number') {
      // RabbitMQ timestamps are in seconds, so convert to milliseconds
      return timestamp * 1000;
    } else if (timestamp instanceof Date) {
      return timestamp.getTime();
    }

    return;
  };

  public stop = async (): Promise<void> => {
    this.stopTryReconnect = true;
    if (this.isConnected) {
      await this.channel?.cancel(this.consumerTag);
      await this.connection?.close();
    }

    this.logger.info('stop - closed channel and connection to rabbitMQ!');
  };

  public addEntityHandler = async <TEntity extends BaseEntity>(
    entityHandler: IEntityHandler<TEntity>,
    entityConstructor: new () => TEntity,
  ): Promise<void> => {
    this.consumer.RegisterEntityHandler(entityHandler, entityConstructor);
  };
}

export = RabbitMQFeed;
