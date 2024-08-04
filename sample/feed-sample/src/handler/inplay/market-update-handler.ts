import { IEntityHandler, MarketUpdate } from "trade360-nodejs-sdk";

export class MarketUpdateHandler implements IEntityHandler<MarketUpdate> {
  public processAsync = async (entity?: MarketUpdate) => {
    console.log("MarketUpdate received!");
    console.log(entity);
    return;
  };
}
