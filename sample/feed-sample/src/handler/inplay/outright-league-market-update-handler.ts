import {
  IEntityHandler,
  MessageHeader,
  OutrightLeagueMarketUpdate,
} from "trade360-nodejs-sdk";

export class OutrightLeagueMarketUpdateHandler
  implements IEntityHandler<OutrightLeagueMarketUpdate>
{
  public processAsync = async (
    header: MessageHeader,
    entity?: OutrightLeagueMarketUpdate
  ) => {
    console.log("OutrightLeagueMarketUpdate received!");
    console.log(entity);
    return;
  };
}
