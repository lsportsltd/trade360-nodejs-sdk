import { Channel, Connection, MessageProperties, connect } from 'amqplib';
import { isNil } from 'lodash';

import { BaseEntity, Constructor } from '@entities';
import { IEntityHandler, IFeed, MQSettingsOptions } from '@feed';
import { ConsoleAdapter, ILogger } from '@logger';
import { ConsumptionMessageError } from '@lsports/errors';
import { AsyncLock, withRetry } from '@utilities';

import { MessageConsumer } from './message-consumer';

/**
 * Class that represent all the abilities of rabbitmq instance
 * to consume messages and handle them with all the configured
 * desired handlers for entities types and process them with
 * the entityHandler call-back function for the entityConstructor
 * class type entity type and process them with the entityHandler
 * call-back function for the entityConstructor class type entity type
 * @implements IFeed interface that represent Feed implementation for
 * the feed service to consume messages, process connect creation,
 * attach listeners for reconnection and consumption process and
 * handle them with all the configured desired handlers for entities
 * types
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
    private mqSettings: MQSettingsOptions,
    private logger: ILogger = new ConsoleAdapter(),
  ) {
    this.requestQueue = `_${this.mqSettings.packageId}_`;
    this.stopTryReconnect = false;
    this.consumer = new MessageConsumer(this.logger);
  }

  setLogger(logger: ILogger): void {
    this.logger = logger;
  }

  getLogger(): ILogger {
    return this.logger;
  }

  public async start(): Promise<void> {
    await this.connect();

    await this.attachListeners();

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
            await this.consumer.handleBasicMessage(content, {
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
  }

  /**
   * establish connection to rabbitmq
   */
  private async connect(): Promise<void> {
    if (this.isConnected && this.channel) return;

    const { hostname, port, username, password, vhost } = this.mqSettings;

    try {
      this.logger.info('initialize connection to RabbitMQ');

      // Establish connection to RabbitMQ server
      const connectionString = encodeURI(
        `amqp://${username}:${password}@${hostname}:${port}/${vhost}`,
      );

      this.connection = await connect(connectionString);

      if (!this.connection) {
        throw new Error('failed initializing connection!');
      }

      this.logger.info(
        `connection initialized successfully!\nconnectionString: ${connectionString}\nListen to ${this.requestQueue} queue`,
      );

      // create channel through the connection
      this.channel = await this.connection.createChannel();

      this.isConnected = true;
    } catch (err) {
      this.logger.error(`failed initialize connection to RabbitMQ, Error: ${err}`);
      throw err;
    }
  }

  /**
   * attach listeners for desire invoked events
   */
  private async attachListeners(): Promise<void> {
    this.connection.on('error', await this.connectionErrorHandler.bind(this));
    this.connection.on('close', await this.connectionClosedHandler.bind(this));
  }

  /**
   * handle close event invoke for rabbitmq instance
   * handle reconnection option
   */
  private async connectionClosedHandler(): Promise<void> {
    this.logger.debug('RabbitMQ connection was closed!');

    this.isConnected = false;

    const { automaticRecoveryEnabled, networkRecoveryIntervalInMs, maxRetryAttempts } =

    const options = {
      maxAttempts: maxRetryAttempts,
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
  }

  /**
   * handle error event invoke for rabbitmq instance
   * connection error
   * @param err error been thrown from the connection
   * instance of rabbitmq instance connection error
   * event invoke handler method call back function
   * @returns void
   */
  private connectionErrorHandler(err: Error): void {
    this.logger.error(err.message);
  }

  /**
   * get the message timestamp from the message properties
   * @param msgProperties the message properties
   * @returns the message timestamp in milliseconds
   */
  public getMessageMqTimestamp(msgProperties: MessageProperties): number | undefined {
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
  }

  public async stop(): Promise<void> {
    this.stopTryReconnect = true;
    if (this.isConnected) {
      await this.channel?.cancel(this.consumerTag);
      await this.connection?.close();
    }

    this.logger.info('closed gracefully channel and connection to rabbitMQ!');
  }

  public async addEntityHandler<TEntity extends BaseEntity>(
    entityHandler: IEntityHandler<TEntity>,
    entityConstructor: Constructor<TEntity>,
  ): Promise<void> {
    this.consumer.RegisterEntityHandler(entityHandler, entityConstructor);
  }
}

export = RabbitMQFeed;
