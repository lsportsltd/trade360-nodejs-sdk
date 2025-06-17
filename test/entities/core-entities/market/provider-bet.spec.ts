import { plainToInstance } from 'class-transformer';
import { ProviderBet } from '../../../../src/entities/core-entities/market/provider-bet';
import { BaseBet } from '../../../../src/entities/core-entities/market/base-bet';

describe('ProviderBet Entity', () => {
  it('should deserialize a plain object into a ProviderBet instance', (): void => {
    const plain = {
      Id: 1,
      Name: 'Provider Bet',
    };
    const providerBet = plainToInstance(ProviderBet, plain, { excludeExtraneousValues: true });
    expect(providerBet).toBeInstanceOf(ProviderBet);
    expect(providerBet).toBeInstanceOf(BaseBet);
    expect(providerBet.id).toBe(1n);
    expect(providerBet.name).toBe('Provider Bet');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const providerBet = plainToInstance(ProviderBet, plain, { excludeExtraneousValues: true });
    expect(providerBet.id).toBeUndefined();
    expect(providerBet.name).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 2,
      Name: 'Test ProviderBet',
      Extra: 'ignore me',
    };
    const providerBet = plainToInstance(ProviderBet, plain, { excludeExtraneousValues: true });
    expect((providerBet as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
