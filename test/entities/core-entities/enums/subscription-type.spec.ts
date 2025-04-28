import { SubscriptionType } from '../../../../src/entities/core-entities/enums/subscription-type';

describe('SubscriptionType Enum', () => {
  it('should map names to values correctly', () => {
    expect(SubscriptionType.All).toBe(0);
    expect(SubscriptionType.NotSubscribed).toBe(1);
    expect(SubscriptionType.Subscribed).toBe(2);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(SubscriptionType[0]).toBe('All');
    expect(SubscriptionType[1]).toBe('NotSubscribed');
    expect(SubscriptionType[2]).toBe('Subscribed');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(SubscriptionType).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['All', 'NotSubscribed', 'Subscribed']);
  });
});
