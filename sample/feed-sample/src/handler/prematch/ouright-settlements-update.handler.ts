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
    // Outright entities are wrapped in metadata update classes with competition property
    if (entity?.competition) {
      console.log('Competition:', entity.competition);
      // Access events within the competition if available
      if (entity.competition.events) {
        entity.competition.events.forEach((event) => {
          console.log('Outright Settlement Event:', event);
        });
      }
    }
    return;
  };
}
