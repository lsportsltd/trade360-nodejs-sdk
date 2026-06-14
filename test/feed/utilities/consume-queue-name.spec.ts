import {
  CONSUME_QUEUE_NAME_MAX_LENGTH,
  resolveConsumeQueueName,
} from '../../../src/feed/utilities/consume-queue-name';

describe('resolveConsumeQueueName', () => {
  it('uses default _{packageId}_ pattern when customQueueName is not set', () => {
    expect(resolveConsumeQueueName({ packageId: 430 })).toBe('_430_');
  });

  it('customQueueName replaces default pattern while packageId remains for distribution', () => {
    expect(
      resolveConsumeQueueName({ packageId: 430, customQueueName: 'my-enterprise-queue' }),
    ).toBe('my-enterprise-queue');
  });

  it('trims whitespace from customQueueName', () => {
    expect(
      resolveConsumeQueueName({ packageId: 430, customQueueName: '  trim-me  ' }),
    ).toBe('trim-me');
  });

  it('exports max queue name length aligned with RabbitMQ limit', () => {
    expect(CONSUME_QUEUE_NAME_MAX_LENGTH).toBe(255);
  });
});
