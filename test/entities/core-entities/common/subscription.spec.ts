import { plainToInstance } from 'class-transformer';
import { Subscription } from '../../../../src/entities/core-entities/common/subscription';

describe('Subscription', () => {
  it('should deserialize a plain object into a Subscription instance', (): void => {
    const plain = { Type: 2, Status: 'Active' }; // 2 = Prematch
    const subscription = plainToInstance(Subscription, plain, { excludeExtraneousValues: true });
    expect(subscription).toBeInstanceOf(Subscription);
    expect(subscription.type).toBe(2);
    expect(subscription.status).toBe('Active');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const subscription = plainToInstance(Subscription, plain, { excludeExtraneousValues: true });
    expect(subscription.type).toBeUndefined();
    expect(subscription.status).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { Type: 1, Extra: 'ignore me' }; // 1 = NotSubscribed
    const subscription = plainToInstance(Subscription, plain, { excludeExtraneousValues: true });
    expect((subscription as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
