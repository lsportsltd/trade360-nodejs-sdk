import { IEntityHandler, IMessageStructure, OutrightSettlementsUpdate } from 'trade360-nodejs-sdk';

export class OutrightSettlementsUpdateHandler implements IEntityHandler<OutrightSettlementsUpdate> {
  public processAsync = async ({
    header,
    entity,
    transportHeaders
  }: IMessageStructure<OutrightSettlementsUpdate>) => {
    console.log('OutrightSettlementsUpdate received!');
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
