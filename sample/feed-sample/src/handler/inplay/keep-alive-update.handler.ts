import { IEntityHandler, KeepAliveUpdate, IMessageStructure } from 'trade360-nodejs-sdk';

export class KeepAliveUpdateHandler implements IEntityHandler<KeepAliveUpdate> {
  public processAsync = async ({ header, entity, transportHeaders }: IMessageStructure<KeepAliveUpdate>) => {
    console.log('KeepAliveUpdate received!');
    console.log('Transport Headers:', {
      messageGuid: transportHeaders.messageGuid,
      messageType: transportHeaders.messageType,
      timestampInMs: transportHeaders.timestampInMs
    });
    console.log(entity);
    return;
  };
}
