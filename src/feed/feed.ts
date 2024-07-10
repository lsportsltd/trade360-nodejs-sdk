// import _ from "lodash";

import { MessageConsumerMQ } from "./rmq-feed";
import { MQSettings } from "./types";
import { IFeed } from "./entities";

/**
 * Class that represents all Feed requests
 */
export class Feed implements IFeed {
  private consumerMq: IFeed;

  constructor(private mqSettings: MQSettings, private logger: Console) {
    this.consumerMq = new MessageConsumerMQ(this.mqSettings, this.logger);
  }

  /**
   * start consuming messages from mq and handle them with
   * all the configured desire handlers for messages types
   */
  public start = async () => {
    await this.consumerMq.start();
  };

  /**
   * stop consuming messages from mq and handle them with
   * all the configured desire handlers for entities types
   */
  stop = async () => {
    await this.consumerMq.stop();
  };

  /**
   * Add new configured entity handler
   * @param cb call-back function represents the desire handle procedure
   */
  addEntityHandler = async (cb: Function) => {
    await this.consumerMq.addEntityHandler(cb);
  };
}
