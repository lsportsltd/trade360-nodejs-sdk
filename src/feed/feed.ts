import { BaseEntity } from "../entities";
import { IEntityHandler } from "./IEntityHandler";
import { IFeed } from "./IFeed";
import { MessageConsumerMQ } from "./mq-feed";
import { MQSettings } from "./types";
import { MqConnectionSettingsValidator } from "./vaildators";

/**
 * Class that represesnts all Feed requests
 */
export class Feed implements IFeed {
  private consumerMq: IFeed;

  constructor(private mqSettings: MQSettings, private logger: Console) {
    MqConnectionSettingsValidator.validate(this.mqSettings);

    this.consumerMq = new MessageConsumerMQ(this.mqSettings, this.logger);
  }

  public start = async () => {
    await this.consumerMq.start();
  };

  public stop = async () => {
    await this.consumerMq.stop();
  };

  // public addEntityHandler = async <TEntity extends BaseEntityClass>(
  public addEntityHandler = async <TEntity extends BaseEntity>(
    entityHandler: IEntityHandler<TEntity>,
    entityConstructor: new () => TEntity
  ) => {
    await this.consumerMq.addEntityHandler(entityHandler, entityConstructor);
  };
}
