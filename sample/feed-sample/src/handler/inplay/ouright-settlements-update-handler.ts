import {
  IEntityHandler,
  MessageHeader,
  OutrightSettlementsUpdate,
} from "trade360-nodejs-sdk";

export class OutrightSettlementsUpdateHandler
  implements IEntityHandler<OutrightSettlementsUpdate>
{
  public processAsync = async (
    header: MessageHeader,
    entity?: OutrightSettlementsUpdate
  ) => {
    console.log("OutrightSettlementsUpdate received!");
    console.log(entity);
    return;
  };
}
