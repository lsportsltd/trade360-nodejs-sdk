import { plainToInstance } from 'class-transformer';
import { Subscription } from '../../../../src/entities/core-entities/common/subscription';
import { SubscriptionType } from '../../../../src/entities/core-entities/enums/subscription-type';

describe('Subscription', () => {
  it('should deserialize a plain object into a Subscription instance', (): void => {
    const plain = { Type: SubscriptionType.Subscribed, Status: 'Active' };
    const subscription = plainToInstance(Subscription, plain, { excludeExtraneousValues: true });
    expect(subscription).toBeInstanceOf(Subscription);
    expect(subscription.type).toBe(SubscriptionType.Subscribed);
    expect(subscription.status).toBe('Active');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const subscription = plainToInstance(Subscription, plain, { excludeExtraneousValues: true });
    expect(subscription.type).toBeUndefined();
    expect(subscription.status).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { Type: SubscriptionType.NotSubscribed, Extra: 'ignore me' };
    const subscription = plainToInstance(Subscription, plain, { excludeExtraneousValues: true });
    expect((subscription as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
