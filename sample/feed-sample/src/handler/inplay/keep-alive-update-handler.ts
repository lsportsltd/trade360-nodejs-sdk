import {
  IEntityHandler,
  KeepAliveUpdate,
  MessageHeader,
} from "trade360-nodejs-sdk";

export class KeepAliveUpdateHandler implements IEntityHandler<KeepAliveUpdate> {
  public processAsync = async (
    header: MessageHeader,
    entity?: KeepAliveUpdate
  ) => {
    console.log("KeepAliveUpdate received!");
    console.log(entity);
    return;
  };
}
