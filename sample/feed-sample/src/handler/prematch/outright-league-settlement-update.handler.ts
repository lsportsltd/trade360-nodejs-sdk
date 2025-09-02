import { IEntityHandler, IMessageStructure, OutrightLeagueSettlementUpdate } from 'trade360-nodejs-sdk';

export class OutrightLeagueSettlementUpdateHandler
  implements IEntityHandler<OutrightLeagueSettlementUpdate>
{
  public processAsync = async ({
    header,
    entity,
    transportHeaders
  }: IMessageStructure<OutrightLeagueSettlementUpdate>) => {
    console.log('OutrightLeagueSettlementUpdate received!');
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
