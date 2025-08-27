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
    console.log(entity);
    return;
  };
}
