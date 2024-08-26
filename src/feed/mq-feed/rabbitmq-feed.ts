import amqp, { Channel, Connection, Replies } from "amqplib";
import { isNil } from "lodash";

import { BaseEntity, IEntityHandler, IFeed, MQSettings } from "../..";
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

      await this.assertQueue();

      const { consumerTag } = await this.channel.consume(
        this.requestQueue,
        async (msg) => {
          if (!isNil(msg) && !isNil(msg.content)) {
            await this.consumer.HandleBasicMessage(msg.content);

            // Acknowledge the processed message
            // this.channel.ack(msg);
          }
        },
        {
          noAck: this.mqSettings.autoAck,
          // noAck: false,
        }
      );

      this.consumerTag = consumerTag;
    } catch (err) {
      // TODO: handle or not handle error
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
      const connectionString = `amqp://${this.mqSettings.userName}:${this.mqSettings.password}@${this.mqSettings.host}:${this.mqSettings.port}/${this.mqSettings.virtualHost}`;
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

  /**
   * assert queue configuration and define queue prefetch
   */
  private assertQueue = async () => {
    await this.channel.assertQueue(this.requestQueue, { durable: true });
    // config prefetch value
    await this.channel.prefetch(this.mqSettings.prefetchCount, false);
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
