import { IFeed } from "./entities";
import { MessageConsumerMQ } from "./rmq-feed";
import { MQSettings } from "./types";

export class Feed implements IFeed{
  private consumerMq: any;

  constructor(
    //  private customersApi: string,
    //  private mqHost: string,
    //  private mqPort: number,
    //  private virtualHost: string,
    //  private username: string,  
    //  private password: string,
    //  private packageId: number,  
    //  private packageFormatType: number,
    //  private prefetchCount: number, 
    //  private recoveryTime: number,
    private mqSettings: MQSettings,
    
     private logger: void) {


     this.consumerMq = new MessageConsumerMQ(
      //  mqHost,
      //  mqPort,
      // virtualHost,
      // username,
      // password,
      // packageId,
      // packageFormatType,
      // prefetchCount,
      // recoveryTime,
      mqSettings,
      console
     )
  }

  startAsync = async () => {
    // TODO: add "distribution/start" http request

    this.consumerMq.startAsync()
  };

  stopAsync =  async () => {
    this.consumerMq.stopAsync()

    // TODO: add "distribution/stop" http request
  };

  addEntityHandler = async (cb: Function) => {
      this.consumerMq.addEntityHandler(cb)
  };
  
}