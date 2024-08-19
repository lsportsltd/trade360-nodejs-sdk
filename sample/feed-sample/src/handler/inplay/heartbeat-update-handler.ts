import { IEntityHandler, HeartbeatUpdate } from "trade360-nodejs-sdk";

export class HeartbeatUpdateHandler implements IEntityHandler<HeartbeatUpdate> {
  public processAsync = async (entity?: HeartbeatUpdate) => {
    console.log("HeartbeatUpdate received!");
    console.log(entity);
    return;
  };
}
