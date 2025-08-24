import {
  IEntityHandler,
  IMessageStructure,
  OutrightFixtureMarketUpdate,
} from 'trade360-nodejs-sdk';

export class OutrightFixtureMarketUpdateHandler
  implements IEntityHandler<OutrightFixtureMarketUpdate>
{
  public processAsync = async ({
    header,
    entity,
    transportHeaders
  }: IMessageStructure<OutrightFixtureMarketUpdate>) => {
    console.log('OutrightFixtureMarketUpdate received!');
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
