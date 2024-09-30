import { IEntityHandler, IMessageStructure, OutrightFixtureUpdate } from 'trade360-nodejs-sdk';

export class OutrightFixtureUpdateHandler implements IEntityHandler<OutrightFixtureUpdate> {
  public processAsync = async ({ header, entity }: IMessageStructure<OutrightFixtureUpdate>) => {
    console.log('OutrightFixtureUpdate received!');
    console.log(entity);
    return;
  };
}
