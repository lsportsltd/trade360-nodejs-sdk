import { IEntityHandler, MarketUpdate, IMessageStructure } from 'trade360-nodejs-sdk';

export class MarketUpdateHandler implements IEntityHandler<MarketUpdate> {
  public processAsync = async ({ header, entity, transportHeaders }: IMessageStructure<MarketUpdate>) => {
    console.log('MarketUpdate received!');
    console.log('Transport Headers:', {
      messageGuid: transportHeaders.messageGuid,
      messageType: transportHeaders.messageType,
      fixtureId: transportHeaders.fixtureId,
      timestampInMs: transportHeaders.timestampInMs,
      messageSequence: transportHeaders.messageSequence,
    });
    // Entities are wrapped in metadata update classes with events[] arrays
    if (entity?.events) {
      entity.events.forEach((event) => {
        console.log('Market Event:', event);
      });
    }
    return;
  };
}
