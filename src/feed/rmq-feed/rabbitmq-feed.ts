import amqp, { Channel, Connection, Replies } from "amqplib";
import { MQSettings } from "../../";

class RabbitMQFeed {
  private requestQueue = "ReqQueue";
  private connection!: Connection;
  private channel!: Channel;
  private consume!: Replies.Consume;
  private consumerTag!: string;
  private connected: boolean = false;

  private static instance: RabbitMQFeed;
  private defaultMessageHandler!: Function;

  constructor(
    private mqSettings: MQSettings,
    private logger: Console
  ) {
    this.requestQueue = `_${this.mqSettings.PackageId}_`;
  }

  static getInstance(
    mqSettings: MQSettings,
    logger: Console
  ): RabbitMQFeed {
    if (!RabbitMQFeed.instance) {
      RabbitMQFeed.instance = new RabbitMQFeed(
        mqSettings,
        logger
      );
    }
    return RabbitMQFeed.instance;
  }

  setLogger = (logger: Console) => {
    this.logger = logger;
  };
  getLogger = () => {
    return this.logger;
  };

  public start = async () => {
    await this.connect();

    this.attachListeners();

    this.consume = await this.channel.consume(
      this.requestQueue,
      async (msg) => {
        if (msg && msg.content) {
          const messageContent = JSON.parse(msg.content.toString());

          this.connection.close();
          this.connection.emit("close");

          await this.defaultMessageHandler(messageContent);

          // Acknowledge the processed message
          // this.channel.ack(msg);
        }
      },
      {
        noAck: true,
      }
    );

    this.consumerTag = this.consume.consumerTag;
  };

  private connect = async () => {
    if (this.connected && this.channel) return;

    try {
      this.logger.log("Connecting to Rabbit-MQ Server");

      // Establish connection to RabbitMQ server
      const connectionString = `amqp://${this.mqSettings.UserName}:${this.mqSettings.Password}@${this.mqSettings.Host}:${this.mqSettings.Port}/${this.mqSettings.VirtualHost}`;
      this.connection = await amqp.connect(
        connectionString /*config.msgBrokerURL!*/
      );
      if (!this.connection) {
        this.logger.error("Failed to connect to RabbitMQ!");
        throw new Error("Failed to connect to RabbitMQ!");
      }

      this.logger.log(
        "Rabbit MQ Connection is ready!\nconnectionString: " + connectionString
      );

      this.channel = await this.connection.createChannel();
      this.logger.log("Created RabbitMQ Channel successfully!");

      this.connected = true;
    } catch (error) {
      this.logger.error(error);
      this.logger.error(`Not connected to MQ Server`);
    }
  };

  private attachListeners = () => {
    this.connection.on("error", this.connectionErrorHandler);
    this.connection.on("close", this.connectionClosedHandler);
  };

  private connectionClosedHandler = async (res: any) => {
    this.connected = false;
    this.logger.info("connection to RabbitQM closed!");
    if (res) setTimeout(async () => await this.start(), 5000); // Restart the  connection after a delay
  };

  private connectionErrorHandler = (err: Error) => {
    this.logger.info(err.message);
  };

  public stop = async () => {
    await this.channel?.cancel(this.consumerTag);
    await this.connection?.close();
    this.logger.log("closed channel and connection to rabbitMQ!");
  };

  public addEntityHandler = async (cb: Function) => {
    this.defaultMessageHandler = cb;
  };
}

// export = RabbitMQFeed.getInstance;
export = RabbitMQFeed;
