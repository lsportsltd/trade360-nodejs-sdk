import {
  IEntityHandler,
  IMessageStructure,
  OutrightLeagueFixtureUpdate,
} from 'trade360-nodejs-sdk';

export class OutrightLeagueFixtureUpdateHandler
  implements IEntityHandler<OutrightLeagueFixtureUpdate>
{
  public processAsync = async ({
    header,
    entity,
  }: IMessageStructure<OutrightLeagueFixtureUpdate>) => {
    console.log('OutrightLeagueFixtureUpdate received!');
    console.log(entity);
    return;
  };
}
