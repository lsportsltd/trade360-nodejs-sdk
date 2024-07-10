// import _ from "lodash";

import { MessageConsumerMQ } from "./rmq-feed";
import { MQSettings } from "./types";
import { IFeed } from "./entities";

// import {
//   ITrade360Request,
//   IRequestBody,
//   Trade360Request,
//   IStatusResponseBody,
//   IStartResponseBody,
//   IResponsePayload,
// } from "../common";

/**
 * Class that represents all Feed requests
 */
export class Feed implements IFeed {
  private consumerMq: IFeed;
  // private requestApi: ITrade360Request;

  constructor(private mqSettings: MQSettings, private logger: Console) {
    this.consumerMq = new MessageConsumerMQ(this.mqSettings, logger);
    // this.requestApi = new Trade360Request(mqSettings as IRequestBody, logger);
  }

  /**
   * start consuming messages from mq and handle them with 
   * all the configured desire handlers for messages types
   */
  public start = async () => {
    // const distributionStatus:
    //   | IResponsePayload<IStatusResponseBody>
    //   | undefined =
    //   await this.requestApi.getDistributionStatus<IStatusResponseBody>();

    // if (!_.isNil(distributionStatus) && !_.isNil(distributionStatus.Body)) {
    //   const {
    //     Header: { HttpStatusCode: httpStatusCode },
    //     Body: { IsDistributionOn: isDistributionOn },
    //   } = distributionStatus;

    //   if (httpStatusCode >= 200 && httpStatusCode < 300 && !isDistributionOn) {
    //     const startRequest: IResponsePayload<IStartResponseBody> | undefined =
    //       await this.requestApi.startDistribution<IStartResponseBody>();

    //     if (!_.isNil(startRequest) && !_.isNil(startRequest.Body))
    //       this.logger.log(startRequest.Body.Message);
    //   }

      await this.consumerMq.start();
    // }
  };

    /**
   * stop consuming messages from mq and handle them with 
   * all the configured desire handlers for entities types
   */
  stop = async () => {
    await this.consumerMq.stop();

    // TODO: add "distribution/stop" http request
    // return await this.requestApi.stopDistribution();
  };

  /**
   * Add new configured entity handler
   * @param cb call-back function represents the desire handle procedure 
   */
  addEntityHandler = async (cb: Function) => {
    await this.consumerMq.addEntityHandler(cb);
  };
}
