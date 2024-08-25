import {
  IEntityHandler,
  MessageHeader,
  SettlementUpdate,
} from "trade360-nodejs-sdk";

export class SettlementUpdateHandler
  implements IEntityHandler<SettlementUpdate>
{
  public processAsync = async (
    header: MessageHeader,
    entity?: SettlementUpdate
  ) => {
    console.log("SettlementUpdate received!");
    console.log(entity);
    return;
  };
}
