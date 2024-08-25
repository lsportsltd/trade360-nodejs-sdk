import {
  IEntityHandler,
  HeartbeatUpdate,
  MessageHeader,
} from "trade360-nodejs-sdk";

export class HeartbeatUpdateHandler implements IEntityHandler<HeartbeatUpdate> {
  public processAsync = async (
    header: MessageHeader,
    entity?: HeartbeatUpdate
  ) => {
    console.log("HeartbeatUpdate received!");
    console.log(entity);
    return;
  };
}
