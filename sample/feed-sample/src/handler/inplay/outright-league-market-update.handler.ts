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
    // Outright entities are wrapped in metadata update classes with competition property
    if (entity?.competition) {
      console.log('Competition:', entity.competition);
      // OutrightLeagueCompetition has competitions array, each with events
      if (entity.competition.competitions) {
        entity.competition.competitions.forEach((comp) => {
          if (comp.events) {
            comp.events.forEach((event) => {
              console.log('Outright League Market Event:', event);
            });
          }
        });
      }
    }
    return;
  };
}
