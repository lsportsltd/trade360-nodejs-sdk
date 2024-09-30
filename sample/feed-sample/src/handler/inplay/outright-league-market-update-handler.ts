import { IEntityHandler, IMessageStructure, OutrightLeagueMarketUpdate } from 'trade360-nodejs-sdk';

export class OutrightLeagueMarketUpdateHandler
  implements IEntityHandler<OutrightLeagueMarketUpdate>
{
  public processAsync = async ({
    header,
    entity,
  }: IMessageStructure<OutrightLeagueMarketUpdate>) => {
    console.log('OutrightLeagueMarketUpdate received!');
    console.log(entity);
    return;
  };
}
