import { IEntityHandler, IMessageStructure, SettlementUpdate } from 'trade360-nodejs-sdk';

export class SettlementUpdateHandler implements IEntityHandler<SettlementUpdate> {
  public processAsync = async ({ header, entity, transportHeaders }: IMessageStructure<SettlementUpdate>) => {
    console.log('SettlementUpdate received!');
    console.log('Transport Headers:', {
      messageGuid: transportHeaders.messageGuid,
      messageType: transportHeaders.messageType,
      fixtureId: transportHeaders.fixtureId,
      timestampInMs: transportHeaders.timestampInMs,
      messageSequence: transportHeaders.messageSequence,
    });
    console.log(entity);
    return;
  };
}
