import {
  IEntityHandler,
  LivescoreUpdate,
  MessageHeader,
} from "trade360-nodejs-sdk";

export class LivescoreUpdateHandler implements IEntityHandler<LivescoreUpdate> {
  public processAsync = async (
    header: MessageHeader,
    entity?: LivescoreUpdate
  ) => {
    console.log("LivescoreUpdate received!");
    console.log(entity);
    return;
  };
}
