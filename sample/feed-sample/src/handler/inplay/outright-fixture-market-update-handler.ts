import {
  IEntityHandler,
  MessageHeader,
  OutrightFixtureMarketUpdate,
} from "trade360-nodejs-sdk";

export class OutrightFixtureMarketUpdateHandler
  implements IEntityHandler<OutrightFixtureMarketUpdate>
{
  public processAsync = async (
    header: MessageHeader,
    entity?: OutrightFixtureMarketUpdate
  ) => {
    console.log("OutrightFixtureMarketUpdate received!");
    console.log(entity);
    return;
  };
}
