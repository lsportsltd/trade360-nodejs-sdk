import { plainToInstance } from 'class-transformer';
import { Provider } from '../../../../src/entities/core-entities/market/provider';
import { Bet } from '../../../../src/entities/core-entities/market/bet';

describe('Provider Entity', () => {
  it('should deserialize a plain object into a Provider instance', (): void => {
    const plain = {
      id: 1,
      name: 'ProviderX',
      lastUpdate: '2024-06-01T12:00:00Z',
      providerFixtureId: 'F123',
      providerLeagueId: 'L456',
      providerMarketId: 'M789',
      bets: [
        { Id: 10, Name: 'Bet1' },
        { Id: 11, Name: 'Bet2' },
      ],
    };
    const provider = plainToInstance(Provider, plain, { excludeExtraneousValues: true });
    expect(provider).toBeInstanceOf(Provider);
    expect(provider.Id).toBe(1);
    expect(provider.Name).toBe('ProviderX');
    expect(provider.LastUpdate).toBeInstanceOf(Date);
    expect(provider.LastUpdate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
    expect(provider.ProviderFixtureId).toBe('F123');
    expect(provider.ProviderLeagueId).toBe('L456');
    expect(provider.ProviderMarketId).toBe('M789');
    expect(Array.isArray(provider.Bets)).toBe(true);
    expect(provider.Bets?.[0]).toBeInstanceOf(Bet);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const provider = plainToInstance(Provider, plain, { excludeExtraneousValues: true });
    expect(provider.Id).toBeUndefined();
    expect(provider.Name).toBeUndefined();
    expect(provider.LastUpdate).toBeUndefined();
    expect(provider.ProviderFixtureId).toBeUndefined();
    expect(provider.ProviderLeagueId).toBeUndefined();
    expect(provider.ProviderMarketId).toBeUndefined();
    expect(provider.Bets).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      id: 2,
      name: 'Test Provider',
      Extra: 'ignore me',
    };
    const provider = plainToInstance(Provider, plain, { excludeExtraneousValues: true });
    expect((provider as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
