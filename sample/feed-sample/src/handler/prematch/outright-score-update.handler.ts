import { IEntityHandler, IMessageStructure, OutrightScoreUpdate } from 'trade360-nodejs-sdk';

export class OutrightScoreUpdateHandler implements IEntityHandler<OutrightScoreUpdate> {
  public processAsync = async ({ header, entity, transportHeaders }: IMessageStructure<OutrightScoreUpdate>) => {
    console.log('OutrightScoreUpdate received!');
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
          console.log('Outright Score Event:', event);
        });
      }
    }
    return;
  };
}
