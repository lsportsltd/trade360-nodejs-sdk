import {
  IEntityHandler,
  MarketUpdate,
  MessageHeader,
} from "trade360-nodejs-sdk";

export class MarketUpdateHandler implements IEntityHandler<MarketUpdate> {
  public processAsync = async (
    header: MessageHeader,
    entity?: MarketUpdate
  ) => {
    console.log("MarketUpdate received!");
    console.log(entity);
    return;
  };
}
