import amqp, { Channel, Connection, ConsumeMessage, Replies } from "amqplib";
import { isNil } from "lodash";

import { IEntityHandler, IFeed, MQSettings } from "@feed";
import { ProcessingMessageError } from "@common";
import { BaseEntity } from "@entities";

import { MessageConsumer } from "./message-consumer";

/**
 * Class that represent all the abilities of rabbitmq instance
 */
class RabbitMQFeed implements IFeed {
  private requestQueue = "ReqQueue";
  private connection!: Connection;
  private channel!: Channel;
  private consume!: Replies.Consume;
  private consumerTag!: string;
  private isConnected: boolean = false;
  private stopTryReconnect: boolean = false;

  private readonly consumer: MessageConsumer;

  constructor(private mqSettings: MQSettings, private logger: Console) {
    this.requestQueue = `_${this.mqSettings.packageId}_`;
    this.stopTryReconnect = false;
    this.consumer = new MessageConsumer(this.logger);
  }

  setLogger = (logger: Console) => {
    this.logger = logger;
  };
  getLogger = () => {
    return this.logger;
  };

  public start = async () => {
    try {
      await this.connect();

      this.attachListeners();

      // config and define queue prefetch
      await this.channel.prefetch(this.mqSettings.prefetchCount, false);

      const isAutoAck: boolean = this.mqSettings.autoAck;

      const { consumerTag } = await this.channel.consume(
        this.requestQueue,
        async (msg) => {
          if (!isNil(msg) && !isNil(msg.content)) {
            try {
              await this.consumer.HandleBasicMessage(msg.content);

              this.handleLatency(msg);

              // Manually acknowledge the processed message
              if (!isAutoAck) await this.channel.ack(msg);
            } catch (err) {
              if (!isAutoAck) await this.channel.nack(msg, false, true);

              throw new ProcessingMessageError(
                `Error processing message, Error: ${err}`
              );
            }
          }
        },
        {
          noAck: isAutoAck,
        }
      );

      this.consumerTag = consumerTag;
    } catch (err) {
      // TODO: handle or not handle error
      throw err;
    }
  };

  /**
   * establish connectation to rabbitmq
   */
  private connect = async () => {
    if (this.isConnected && this.channel) return;

    try {
      this.logger.log("connect - Connecting to RabbitMQ Server");

      // Establish connection to RabbitMQ server
      const connectionString = encodeURI(
        `amqp://${this.mqSettings.userName}:${this.mqSettings.password}@${this.mqSettings.host}:${this.mqSettings.port}/${this.mqSettings.virtualHost}`
      );

      this.connection = await amqp.connect(
        connectionString /*config.msgBrokerURL!*/
      );

      if (!this.connection) {
        this.logger.error("connect - Failed to connect to RabbitMQ!");
        throw new Error("connect - Failed to connect to RabbitMQ!");
      }

      this.logger.log(
        `connect - Rabbit MQ Connection is ready!\nconnectionString: ${connectionString}\nListen to ${this.requestQueue} queue`
      );

      this.isConnected = true;
      // create channel through the connection
      this.channel = await this.connection.createChannel();

      this.logger.log("connect - Created RabbitMQ Channel successfully!");
    } catch (err) {
      this.logger.error(`connect - Not connected to MQ Server, error: ${err}`);
      throw err;
    }
  };

  /**
   * attach listeners for desire invoked events
   */
  private attachListeners = () => {
    this.connection.on("error", this.connectionErrorHandler);
    this.connection.on("close", this.connectionClosedHandler);
  };

  /**
   * handle close event invoke for rabbitmq instance
   * handle reconnection option
   * @param res
   */
  private connectionClosedHandler = async (res: any) => {
    this.logger.log("event handler - connection to RabbitMQ closed!");
    this.isConnected = false;
    if (!this.stopTryReconnect)
      if (this.mqSettings.automaticRecoveryEnabled)
        // Retry establish connection after a delay
        setTimeout(
          async () => await this.start(),
          this.mqSettings.networkRecoveryIntervalInMs
        );
  };

  /**
   * handle error event invoke for rabbitmq instance
   * @param err error been thrown
   */
  private connectionErrorHandler = (err: Error) => {
    this.logger.error(err.message);
  };

  private handleLatency = async (msg: ConsumeMessage) => {
    this.checkConsumptionLatency(msg);
    this.checkProcessingLatency(msg);
  };

  private checkConsumptionLatency = (msg: ConsumeMessage): void => {
    const consumptionTimestamp = Date.now();
    const rabbitMqTimestamp = this.getRabbitMqTimestamp(msg);
    const thresholdInSeconds = this.mqSettings.consumptionLatencyThreshold;

    const {
      properties: { messageId },
    } = msg;

    if (!isNil(rabbitMqTimestamp)) {
      const delayInSeconds = (consumptionTimestamp - rabbitMqTimestamp) / 1000;

      if (delayInSeconds > thresholdInSeconds) {
        this.logger.warn("Message consumption delay exceeded threshold", {
          delayInSeconds,
          thresholdInSeconds,
          messageId,
          rabbitMqTimestamp,
          consumptionTimestamp,
        });
      } else {
        this.logger.info("Message consumed within threshold", {
          delayInSeconds,
          thresholdInSeconds,
          messageId,
        });
      }
    } else {
      this.logger.warn(
        "Unable to check message consumption delay: Missing RabbitMQ timestamp",
        { messageId }
      );
    }
  };

  private checkProcessingLatency = (msg: ConsumeMessage): void => {
    const rabbitMqTimestamp = this.getRabbitMqTimestamp(msg);
    const processingTimestamp = this.getServerTimestamp(msg);
    const thresholdInSeconds =
      this.mqSettings.lsportsProcessingLatencyThreshold;

    const {
      properties: { messageId },
    } = msg;

    if (isNil(rabbitMqTimestamp))
      this.logger.warn(
        "Unable to check message processing delay: Missing RabbitMQ timestamp",
        { messageId }
      );
    else if (isNil(processingTimestamp))
      this.logger.warn(
        "Unable to check message processing delay: Missing LSports Server timestamp",
        { messageId }
      );
    else {
      const delayInSeconds = (rabbitMqTimestamp - processingTimestamp) / 1000;

      if (delayInSeconds > thresholdInSeconds) {
        this.logger.warn(
          "Message LSports processing delay exceeded threshold",
          {
            delayInSeconds,
            thresholdInSeconds,
            messageId,
            rabbitMqTimestamp,
            processingTimestamp,
          }
        );
      } else {
        this.logger.info("Message LSports processed within threshold", {
          delayInSeconds,
          thresholdInSeconds,
          messageId,
        });
      }
    }
  };

  private getRabbitMqTimestamp = (msg: ConsumeMessage): number | undefined => {
    const timestamp = msg.properties.timestamp;

    if (typeof timestamp === "number") {
      // RabbitMQ timestamps are in seconds, so convert to milliseconds
      return timestamp * 1000;
    } else if (timestamp instanceof Date) {
      return timestamp.getTime();
    }

    return;
  };

  private getServerTimestamp = (msg: ConsumeMessage): number | undefined => {
    const rawMessage = !isNil(msg.content.toString())
      ? JSON.parse(msg.content.toString())
      : undefined;

    if (
      isNil(rawMessage) ||
      isNil(rawMessage.Header) ||
      isNil(rawMessage.Header.ServerTimestamp)
    )
      return;

    const timestamp = rawMessage.Header.ServerTimestamp;

    if (typeof timestamp === "number") {
      // Lsports ServerTimestamp is in milliseconds
      return timestamp;
    } else if (timestamp instanceof Date) {
      return timestamp.getTime();
    }

    return;
  };

  public stop = async () => {
    this.stopTryReconnect = true;
    if (this.isConnected) {
      await this.channel?.cancel(this.consumerTag);
      await this.connection?.close();
    }

    this.logger.log("stop - closed channel and connection to rabbitMQ!");
  };

  public addEntityHandler = async <TEntity extends BaseEntity>(
    entityHandler: IEntityHandler<TEntity>,
    entityConstructor: new () => TEntity
  ) => {
    this.consumer.RegisterEntityHandler(entityHandler, entityConstructor);
  };
}

export = RabbitMQFeed;
