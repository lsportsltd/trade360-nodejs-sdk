import { IEntityHandler, HeartbeatUpdate, IMessageStructure } from 'trade360-nodejs-sdk';

export class HeartbeatUpdateHandler implements IEntityHandler<HeartbeatUpdate> {
  constructor(private readonly marketLabel: string = 'unknown') {}

  public processAsync = async ({ header, entity, transportHeaders }: IMessageStructure<HeartbeatUpdate>) => {
    console.log(
      `[FIH] HeartbeatUpdate ${this.marketLabel}: feedInterrupted=${entity?.feedInterrupted ?? 'undefined/absent'} (absent/0=normal, non-zero=interrupted)`,
    );
    console.log('Transport Headers:', {
      messageGuid: transportHeaders.messageGuid,
      messageType: transportHeaders.messageType,
      timestampInMs: transportHeaders.timestampInMs,
      messageSequence: transportHeaders.messageSequence,
    });
    return;
  };
}
