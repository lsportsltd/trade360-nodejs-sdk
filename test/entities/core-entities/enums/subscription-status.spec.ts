import { SubscriptionStatus } from '../../../../src/entities/core-entities/enums/subscription-status';

describe('SubscriptionStatus Enum', () => {
  it('should map names to values correctly', () => {
    expect(SubscriptionStatus.NotSet).toBe(0);
    expect(SubscriptionStatus.Subscribed).toBe(1);
    expect(SubscriptionStatus.Pending).toBe(2);
    expect(SubscriptionStatus.Unsubscribed).toBe(3);
    expect(SubscriptionStatus.Deleted).toBe(4);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(SubscriptionStatus[0]).toBe('NotSet');
    expect(SubscriptionStatus[1]).toBe('Subscribed');
    expect(SubscriptionStatus[2]).toBe('Pending');
    expect(SubscriptionStatus[3]).toBe('Unsubscribed');
    expect(SubscriptionStatus[4]).toBe('Deleted');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(SubscriptionStatus).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['NotSet', 'Subscribed', 'Pending', 'Unsubscribed', 'Deleted']);
  });
});
