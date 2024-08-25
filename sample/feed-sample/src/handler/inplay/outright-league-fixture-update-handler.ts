import {
  IEntityHandler,
  MessageHeader,
  OutrightLeagueFixtureUpdate,
} from "trade360-nodejs-sdk";

export class OutrightLeagueFixtureUpdateHandler
  implements IEntityHandler<OutrightLeagueFixtureUpdate>
{
  public processAsync = async (
    header: MessageHeader,
    entity?: OutrightLeagueFixtureUpdate
  ) => {
    console.log("OutrightLeagueFixtureUpdate received!");
    console.log(entity);
    return;
  };
}
