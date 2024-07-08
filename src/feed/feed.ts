import { MessageConsumerMQ } from "./rmq-feed";
import { MQSettings } from "./types";
import { IFeed } from "./entities";

export class Feed implements IFeed {
  private consumerMq: IFeed;
//   private requestApi: ITrade360Request;

  constructor(private mqSettings: MQSettings, private logger: Console) {
    this.consumerMq = new MessageConsumerMQ(mqSettings, logger);
    // this.requestApi = new Trade360Request(mqSettings as unknown as ITrade360RequestBody, logger);
  }

  start = async () => {
    // TODO: add "distribution/status" http request
    // TODO: add "distribution/start" http request

    // const distributionStatus = await this.requestApi.getDistributionStatus();
    // if(distributionStatus)
    //     await this.requestApi.startDistribution();

    await this.consumerMq.start();
  };

  stop = async () => {
    await this.consumerMq.stop();

    // TODO: add "distribution/stop" http request
    // await this.requestApi.stopDistribution();
  };

  addEntityHandler = async (cb: Function) => {
    await this.consumerMq.addEntityHandler(cb);
  };
}
