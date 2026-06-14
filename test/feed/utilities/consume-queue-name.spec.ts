import {
  CONSUME_QUEUE_NAME_MAX_LENGTH,
  resolveConsumeQueueName,
} from '../../../src/feed/utilities/consume-queue-name';

describe('resolveConsumeQueueName', () => {
  it('uses default _{packageId}_ pattern when customQueueName is not set', () => {
    expect(resolveConsumeQueueName({ packageId: 430 })).toBe('_430_');
  });

  it('uses customQueueName when packageId is zero', () => {
    expect(
      resolveConsumeQueueName({ packageId: 0, customQueueName: 'fixed-queue' }),
    ).toBe('fixed-queue');
  });

  it('customQueueName replaces default pattern', () => {
    expect(
      resolveConsumeQueueName({ packageId: 430, customQueueName: 'my-enterprise-queue' }),
    ).toBe('my-enterprise-queue');
  });

  it('trims whitespace from customQueueName', () => {
    expect(
      resolveConsumeQueueName({ packageId: 430, customQueueName: '  trim-me  ' }),
    ).toBe('trim-me');
  });

  it('returns empty string when packageId is zero and customQueueName is unset', () => {
    expect(resolveConsumeQueueName({ packageId: 0 })).toBe('');
  });

  it('exports max queue name length aligned with RabbitMQ limit', () => {
    expect(CONSUME_QUEUE_NAME_MAX_LENGTH).toBe(255);
  });
});
