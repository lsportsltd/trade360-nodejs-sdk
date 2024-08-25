import { IEntityHandler, OutrightLeagueFixtureUpdate } from "trade360-nodejs-sdk";

export class OutrightLeagueFixtureUpdateHandler
  implements IEntityHandler<OutrightLeagueFixtureUpdate>
{
  public processAsync = async (entity?: OutrightLeagueFixtureUpdate) => {
    console.log("OutrightLeagueFixtureUpdate received!");
    console.log(entity);
    return;
  };
}
