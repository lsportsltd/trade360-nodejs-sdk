import { IEntityHandler, LivescoreUpdate, IMessageStructure } from 'trade360-nodejs-sdk';

export class LivescoreUpdateHandler implements IEntityHandler<LivescoreUpdate> {
  public processAsync = async ({ header, entity, transportHeaders }: IMessageStructure<LivescoreUpdate>) => {
    console.log('LivescoreUpdate received!');
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
