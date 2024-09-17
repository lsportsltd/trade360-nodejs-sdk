import { IEntityHandler, LivescoreUpdate, IMessageStructure } from 'trade360-nodejs-sdk';

export class LivescoreUpdateHandler implements IEntityHandler<LivescoreUpdate> {
  public processAsync = async ({ header, entity }: IMessageStructure<LivescoreUpdate>) => {
    console.log('LivescoreUpdate received!');
    console.log(entity);
    return;
  };
}
