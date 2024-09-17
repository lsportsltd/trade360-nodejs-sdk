import { IEntityHandler, IMessageStructure, OutrightSettlementsUpdate } from 'trade360-nodejs-sdk';

export class OutrightSettlementsUpdateHandler implements IEntityHandler<OutrightSettlementsUpdate> {
  public processAsync = async ({
    header,
    entity,
  }: IMessageStructure<OutrightSettlementsUpdate>) => {
    console.log('OutrightSettlementsUpdate received!');
    console.log(entity);
    return;
  };
}
