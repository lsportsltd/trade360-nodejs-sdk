import { IEntityHandler, KeepAliveUpdate, IMessageStructure } from 'trade360-nodejs-sdk';

export class KeepAliveUpdateHandler implements IEntityHandler<KeepAliveUpdate> {
  public processAsync = async ({ header, entity }: IMessageStructure<KeepAliveUpdate>) => {
    console.log('KeepAliveUpdate received!');
    console.log(entity);
    return;
  };
}
