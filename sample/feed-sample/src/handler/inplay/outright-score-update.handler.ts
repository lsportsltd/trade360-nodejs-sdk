import { IEntityHandler, IMessageStructure, OutrightScoreUpdate } from 'trade360-nodejs-sdk';

export class OutrightScoreUpdateHandler implements IEntityHandler<OutrightScoreUpdate> {
  public processAsync = async ({ header, entity, transportHeaders }: IMessageStructure<OutrightScoreUpdate>) => {
    console.log('OutrightScoreUpdate received!');
    console.log('Transport Headers:', {
      messageGuid: transportHeaders.messageGuid,
      messageType: transportHeaders.messageType,
      fixtureId: transportHeaders.fixtureId,
      timestampInMs: transportHeaders.timestampInMs
    });
    console.log(entity);
    return;
  };
}
