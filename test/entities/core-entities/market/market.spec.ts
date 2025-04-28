import { plainToInstance } from 'class-transformer';
import { Market } from '../../../../src/entities/core-entities/market/market';
import { Bet } from '../../../../src/entities/core-entities/market/bet';
import { ProviderMarket } from '../../../../src/entities/core-entities/market/provider-market';

describe('Market Entity', () => {
  it('should deserialize a plain object into a Market instance', (): void => {
    const plain = {
      Id: 1,
      Name: 'Match Winner',
      Bets: [
        { Id: 10, Name: 'Home' },
        { Id: 11, Name: 'Away' },
      ],
      ProviderMarkets: [{ Id: 100, Name: 'Provider1' }],
      MainLine: '1.5',
    };
    const market = plainToInstance(Market, plain, { excludeExtraneousValues: true });
    expect(market).toBeInstanceOf(Market);
    expect(market.id).toBe(1);
    expect(market.name).toBe('Match Winner');
    expect(Array.isArray(market.bets)).toBe(true);
    expect(market.bets?.[0]).toBeInstanceOf(Bet);
    expect(Array.isArray(market.providerMarkets)).toBe(true);
    expect(market.providerMarkets?.[0]).toBeInstanceOf(ProviderMarket);
    expect(market.mainLine).toBe('1.5');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const market = plainToInstance(Market, plain, { excludeExtraneousValues: true });
    expect(market.id).toBeUndefined();
    expect(market.name).toBeUndefined();
    expect(market.bets).toBeUndefined();
    expect(market.providerMarkets).toBeUndefined();
    expect(market.mainLine).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 2,
      Name: 'Test Market',
      Extra: 'ignore me',
    };
    const market = plainToInstance(Market, plain, { excludeExtraneousValues: true });
    expect((market as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
