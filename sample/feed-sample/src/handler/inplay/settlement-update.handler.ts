import { IEntityHandler, IMessageStructure, SettlementUpdate } from 'trade360-nodejs-sdk';

export class SettlementUpdateHandler implements IEntityHandler<SettlementUpdate> {
  public processAsync = async ({ header, entity }: IMessageStructure<SettlementUpdate>) => {
    console.log('SettlementUpdate received!');
    console.log(entity);
    return;
  };
}
