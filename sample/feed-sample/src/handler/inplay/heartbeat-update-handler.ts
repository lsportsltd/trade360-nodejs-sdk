import { IEntityHandler, HeartbeatUpdate, IMessageStructure } from 'trade360-nodejs-sdk';

export class HeartbeatUpdateHandler implements IEntityHandler<HeartbeatUpdate> {
  public processAsync = async ({ header, entity }: IMessageStructure<HeartbeatUpdate>) => {
    console.log('HeartbeatUpdate received!');
    console.log(entity);
    return;
  };
}
