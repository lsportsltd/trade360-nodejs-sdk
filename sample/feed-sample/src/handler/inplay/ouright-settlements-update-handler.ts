import { IEntityHandler, OutrightSettlementsUpdate } from "trade360-nodejs-sdk";

export class OutrightSettlementsUpdateHandler
  implements IEntityHandler<OutrightSettlementsUpdate>
{
  public processAsync = async (entity?: OutrightSettlementsUpdate) => {
    console.log("OutrightSettlementsUpdate received!");
    console.log(entity);
    return;
  };
}
