import { IEntityHandler, IMessageStructure, OutrightLeagueMarketUpdate } from 'trade360-nodejs-sdk';

export class OutrightLeagueMarketUpdateHandler
  implements IEntityHandler<OutrightLeagueMarketUpdate>
{
  public processAsync = async ({
    header,
    entity,
    transportHeaders
  }: IMessageStructure<OutrightLeagueMarketUpdate>) => {
    console.log('OutrightLeagueMarketUpdate received!');
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
