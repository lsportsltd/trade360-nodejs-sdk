import {
  IEntityHandler,
  IMessageStructure,
  OutrightLeagueFixtureUpdate,
} from 'trade360-nodejs-sdk';

export class OutrightLeagueFixtureUpdateHandler
  implements IEntityHandler<OutrightLeagueFixtureUpdate>
{
  public processAsync = async ({
    header,
    entity,
    transportHeaders
  }: IMessageStructure<OutrightLeagueFixtureUpdate>) => {
    console.log('OutrightLeagueFixtureUpdate received!');
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
