import { IEntityHandler, HeartbeatUpdate, IMessageStructure } from 'trade360-nodejs-sdk';

const DOMAIN_LABELS: Record<number, string> = {
  1: 'Markets',
};

function formatFeedInterruptedState(entity?: HeartbeatUpdate): string {
  const domains = entity?.feedInterrupted;
  if (domains == null) {
    return 'Healthy (feedInterrupted absent)';
  }
  if (domains.length === 0) {
    return 'Healthy (feedInterrupted=[])';
  }

  const mapped = domains.map((domain) => {
    const label = DOMAIN_LABELS[domain];
    return label ? `${domain}=${label}` : String(domain);
  });
  return `Interrupted (domains: [${mapped.join(', ')}])`;
}

export class HeartbeatUpdateHandler implements IEntityHandler<HeartbeatUpdate> {
  constructor(private readonly marketLabel: string = 'unknown') {}

  public processAsync = async ({ header, entity, transportHeaders }: IMessageStructure<HeartbeatUpdate>) => {
    console.log(`[FIH] HeartbeatUpdate ${this.marketLabel}: ${formatFeedInterruptedState(entity)}`);
    console.log('Transport Headers:', {
      messageGuid: transportHeaders.messageGuid,
      messageType: transportHeaders.messageType,
      timestampInMs: transportHeaders.timestampInMs,
      messageSequence: transportHeaders.messageSequence,
    });
    return;
  };
}
