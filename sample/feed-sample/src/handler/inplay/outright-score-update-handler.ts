import { IEntityHandler, IMessageStructure, OutrightScoreUpdate } from 'trade360-nodejs-sdk';

export class OutrightScoreUpdateHandler implements IEntityHandler<OutrightScoreUpdate> {
  public processAsync = async ({ header, entity }: IMessageStructure<OutrightScoreUpdate>) => {
    console.log('OutrightScoreUpdate received!');
    console.log(entity);
    return;
  };
}
