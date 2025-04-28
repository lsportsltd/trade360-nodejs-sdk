import { SubscriptionState } from '../../../../src/entities/core-entities/enums/subscription-state';

describe('SubscriptionState Enum', () => {
  it('should map names to values correctly', () => {
    expect(SubscriptionState.All).toBe(0);
    expect(SubscriptionState.NotSubscribed).toBe(1);
    expect(SubscriptionState.Subscribed).toBe(2);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(SubscriptionState[0]).toBe('All');
    expect(SubscriptionState[1]).toBe('NotSubscribed');
    expect(SubscriptionState[2]).toBe('Subscribed');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(SubscriptionState).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['All', 'NotSubscribed', 'Subscribed']);
  });
});
