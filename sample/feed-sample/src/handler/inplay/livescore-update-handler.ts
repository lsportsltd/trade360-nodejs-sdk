import { IEntityHandler, LivescoreUpdate } from "trade360-nodejs-sdk";

export class LivescoreUpdateHandler
  implements IEntityHandler<LivescoreUpdate>
{
  public processAsync = async (entity?: LivescoreUpdate) => {
    console.log("LivescoreUpdate received!");
    console.log(entity);
    return;
  };
}
