import { IEntityHandler, MarketUpdate, IMessageStructure } from 'trade360-nodejs-sdk';

export class MarketUpdateHandler implements IEntityHandler<MarketUpdate> {
  public processAsync = async ({ header, entity }: IMessageStructure<MarketUpdate>) => {
    console.log('MarketUpdate received!');
    console.log(entity);
    console.log(JSON.stringify(entity));
    return;
  };
}
