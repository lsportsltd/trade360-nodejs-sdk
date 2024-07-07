import amqp, { Channel, Connection, Replies } from "amqplib";
import { MQSettings } from "../../";

class RabbitMQFeed {
  private requestQueue = "ReqQueue";
  private connection!: Connection;
  private channel!: Channel;
  private consume!: Replies.Consume;
  private consumerTag!: string;
  private isConnected: boolean = false;
  private stopTryRecovery: boolean = false;

  private defaultMessageHandler!: Function;

  constructor(private mqSettings: MQSettings, private logger: Console) {
    this.requestQueue = `_${this.mqSettings.PackageId}_`;
    this.stopTryRecovery = false;
  }

  setLogger = (logger: Console) => {
    this.logger = logger;
  };
  getLogger = () => {
    return this.logger;
  };

  // start action, process connect and consumption action from rabbitmq
  public start = async () => {
    try {
      await this.connect();

      this.attachListeners();

      await this.assertQueue();

      this.consume = await this.channel.consume(
        this.requestQueue,
        async (msg) => {
          if (msg && msg.content) {
            const messageContent = JSON.parse(msg.content.toString());

            await this.defaultMessageHandler(messageContent);

            // Acknowledge the processed message
            // this.channel.ack(msg);
          }
        },
        {
          noAck: this.mqSettings.AutoAck,
        }
      );

      this.consumerTag = this.consume.consumerTag;
    } catch (err) {}
  };

  // establish connectation to rabbitmq
  private connect = async () => {
    if (this.isConnected && this.channel) return;

    try {
      this.logger.log("connect - Connecting to RabbitMQ Server");

      // Establish connection to RabbitMQ server
      const connectionString = `amqp://${this.mqSettings.UserName}:${this.mqSettings.Password}@${this.mqSettings.Host}:${this.mqSettings.Port}/${this.mqSettings.VirtualHost}`;
      this.connection = await amqp.connect(
        connectionString /*config.msgBrokerURL!*/
      );
      if (!this.connection) {
        this.logger.error("connect -Failed to connect to RabbitMQ!");
        throw new Error("connect - Failed to connect to RabbitMQ!");
      }

      this.logger.log(
        "connect - Rabbit MQ Connection is ready!\nconnectionString: " +
          connectionString
      );

      this.isConnected = true;

      // create channel through the connection
      this.channel = await this.connection.createChannel();
      this.logger.log("connect - Created RabbitMQ Channel successfully!");
    } catch (error) {
      this.logger.error("connect - Not connected to MQ Server, error:", error);
    }
  };

  // attach listeners for desire invoked events
  private attachListeners = () => {
    this.connection.on("error", this.connectionErrorHandler);
    this.connection.on("close", this.connectionClosedHandler);
  };

  // handle close event invoke for rabbitmq instance
  // handle reconnection option
  private connectionClosedHandler = async (res: any) => {
    this.logger.log("event handler - connection to RabbitMQ closed!");
    this.isConnected = false;
    if (!this.stopTryRecovery)
      if (this.mqSettings.AutomaticRecoveryEnabled)
        // Retry establish connection after a delay
        setTimeout(
          async () => await this.start(),
          this.mqSettings.NetworkRecoveryIntervalInMs
        );
  };

  // handle error event invoke for rabbitmq instance
  private connectionErrorHandler = (err: Error) => {
    this.logger.error(err.message);
  };

  // assert queue configuration and define queue prefetch
  private assertQueue = async () => {
    await this.channel.assertQueue(this.requestQueue, { durable: false });
    // config prefetch value
    await this.channel.prefetch(this.mqSettings.PrefetchCount, false);
  };

  // stop action for close rabbitmq channel and connection
  public stop = async () => {
    this.stopTryRecovery = true;
    if (this.isConnected) {
      await this.channel?.cancel(this.consumerTag);
      await this.connection?.close();
    }

    this.logger.log("stop - closed channel and connection to rabbitMQ!");
  };

  public addEntityHandler = async (cb: Function) => {
    this.defaultMessageHandler = cb;
  };
}

export = RabbitMQFeed;
