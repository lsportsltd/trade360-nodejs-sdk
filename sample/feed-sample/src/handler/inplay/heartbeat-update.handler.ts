import { IEntityHandler, HeartbeatUpdate, IMessageStructure } from 'trade360-nodejs-sdk';

export class HeartbeatUpdateHandler implements IEntityHandler<HeartbeatUpdate> {
  public processAsync = async ({ header, entity, transportHeaders }: IMessageStructure<HeartbeatUpdate>) => {
    console.log('HeartbeatUpdate received!');
    console.log('Transport Headers:', {
      messageGuid: transportHeaders.messageGuid,
      messageType: transportHeaders.messageType,
      timestampInMs: transportHeaders.timestampInMs,
      messageSequence: transportHeaders.messageSequence,
    });
    console.log(entity);
    return;
  };
}
