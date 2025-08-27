import { IEntityHandler, IMessageStructure, OutrightFixtureUpdate } from 'trade360-nodejs-sdk';

export class OutrightFixtureUpdateHandler implements IEntityHandler<OutrightFixtureUpdate> {
  public processAsync = async ({ header, entity, transportHeaders }: IMessageStructure<OutrightFixtureUpdate>) => {
    console.log('OutrightFixtureUpdate received!');
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
