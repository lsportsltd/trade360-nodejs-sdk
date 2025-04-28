import { plainToInstance } from 'class-transformer';
import { ProviderMarket } from '../../../../src/entities/core-entities/market/provider-market';
import { ProviderBet } from '../../../../src/entities/core-entities/market/provider-bet';

describe('ProviderMarket Entity', () => {
  it('should deserialize a plain object into a ProviderMarket instance', (): void => {
    const plain = {
      Id: 1,
      Name: 'Provider1',
      Bets: [
        { Id: 10, Name: 'Bet1' },
        { Id: 11, Name: 'Bet2' },
      ],
      LastUpdate: '2024-06-01T12:00:00Z',
    };
    const providerMarket = plainToInstance(ProviderMarket, plain, {
      excludeExtraneousValues: true,
    });
    expect(providerMarket).toBeInstanceOf(ProviderMarket);
    expect(providerMarket.id).toBe(1);
    expect(providerMarket.name).toBe('Provider1');
    expect(Array.isArray(providerMarket.Bets)).toBe(true);
    expect(providerMarket.Bets?.[0]).toBeInstanceOf(ProviderBet);
    expect(providerMarket.lastUpdate).toBeInstanceOf(Date);
    expect(providerMarket.lastUpdate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const providerMarket = plainToInstance(ProviderMarket, plain, {
      excludeExtraneousValues: true,
    });
    expect(providerMarket.id).toBeUndefined();
    expect(providerMarket.name).toBeUndefined();
    expect(providerMarket.Bets).toBeUndefined();
    expect(providerMarket.lastUpdate).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 2,
      Name: 'Test ProviderMarket',
      Extra: 'ignore me',
    };
    const providerMarket = plainToInstance(ProviderMarket, plain, {
      excludeExtraneousValues: true,
    });
    expect((providerMarket as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
