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
  }: IMessageStructure<OutrightFixtureMarketUpdate>) => {
    console.log('OutrightFixtureMarketUpdate received!');
    console.log(entity);
    return;
  };
}
