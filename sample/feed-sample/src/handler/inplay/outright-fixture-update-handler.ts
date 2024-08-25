import {
  IEntityHandler,
  MessageHeader,
  OutrightFixtureUpdate,
} from "trade360-nodejs-sdk";

export class OutrightFixtureUpdateHandler
  implements IEntityHandler<OutrightFixtureUpdate>
{
  public processAsync = async (
    header: MessageHeader,
    entity?: OutrightFixtureUpdate
  ) => {
    console.log("OutrightFixtureUpdate received!");
    console.log(entity);
    return;
  };
}
