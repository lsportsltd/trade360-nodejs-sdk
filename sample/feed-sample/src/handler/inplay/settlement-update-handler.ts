import { IEntityHandler, SettlementUpdate } from "trade360-nodejs-sdk";

export class SettlementUpdateHandler
  implements IEntityHandler<SettlementUpdate>
{
  public processAsync = async (entity?: SettlementUpdate) => {
    console.log("SettlementUpdate received!");
    console.log(entity);
    return;
  };
}
