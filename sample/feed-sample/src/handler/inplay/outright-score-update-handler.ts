import { IEntityHandler, OutrightScoreUpdate } from "trade360-nodejs-sdk";

export class OutrightScoreUpdateHandler
  implements IEntityHandler<OutrightScoreUpdate>
{
  public processAsync = async (entity?: OutrightScoreUpdate) => {
    console.log("OutrightScoreUpdate received!");
    console.log(entity);
    return;
  };
}
