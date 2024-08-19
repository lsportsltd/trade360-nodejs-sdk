import { IEntityHandler, KeepAliveUpdate } from "trade360-nodejs-sdk";

export class KeepAliveUpdateHandler implements IEntityHandler<KeepAliveUpdate> {
  public processAsync = async (entity?: KeepAliveUpdate) => {
    console.log("KeepAliveUpdate received!");
    console.log(entity);
    return;
  };
}
