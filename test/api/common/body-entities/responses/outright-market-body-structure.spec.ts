import { plainToInstance } from 'class-transformer';
import { OutrightMarketBodyStructure } from '../../../../../src/api/common/body-entities/responses/outright-market-body-structure';
import { Bet } from '../../../../../src/entities/core-entities/market/bet';
import { ProviderMarket } from '../../../../../src/entities/core-entities/market/provider-market';

describe('OutrightMarketBodyStructure', () => {
  it('should deserialize a plain object into an OutrightMarketBodyStructure instance', (): void => {
    const plain = {
      Id: 12345,
      Name: 'Outright Winner',
      Bets: [
        { Id: 10, Name: 'Team A' },
        { Id: 11, Name: 'Team B' },
      ],
    };
    const market = plainToInstance(OutrightMarketBodyStructure, plain, {
      excludeExtraneousValues: true,
    });
    expect(market).toBeInstanceOf(OutrightMarketBodyStructure);
    expect(market.id).toBe(12345);
    expect(market.name).toBe('Outright Winner');
    expect(Array.isArray(market.bets)).toBe(true);
    expect(market.bets?.[0]).toBeInstanceOf(Bet);
    expect(market.bets?.[0]?.id).toBe('10');
    expect(market.bets?.[1]?.id).toBe('11');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const market = plainToInstance(OutrightMarketBodyStructure, plain, {
      excludeExtraneousValues: true,
    });
    expect(market.id).toBeUndefined();
    expect(market.name).toBeUndefined();
    expect(market.bets).toBeUndefined();
    expect(market.providerMarkets).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 67890,
      Name: 'Test Market',
      Extra: 'ignore me',
    };
    const market = plainToInstance(OutrightMarketBodyStructure, plain, {
      excludeExtraneousValues: true,
    });
    expect(market.id).toBe(67890);
    expect((market as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });

  it('should correctly deserialize Id field with capital I', (): void => {
    const plain = {
      Id: 274,
      Name: 'Outright Winner Market',
    };
    const market = plainToInstance(OutrightMarketBodyStructure, plain, {
      excludeExtraneousValues: true,
    });
    expect(market.id).toBe(274);
    expect(market.name).toBe('Outright Winner Market');
  });

  it('should deserialize ProviderMarkets field', (): void => {
    const plain = {
      Id: 12345,
      Name: 'Outright Winner',
      ProviderMarkets: [
        {
          Id: 100,
          Name: 'Provider Market 1',
          Bets: [{ Id: 1001, Name: 'Provider Bet 1' }],
          LastUpdate: '2024-01-15T10:30:00.000Z',
        },
        {
          Id: 101,
          Name: 'Provider Market 2',
          Bets: [{ Id: 1002, Name: 'Provider Bet 2' }],
        },
      ],
    };
    const market = plainToInstance(OutrightMarketBodyStructure, plain, {
      excludeExtraneousValues: true,
    });
    expect(market).toBeInstanceOf(OutrightMarketBodyStructure);
    expect(market.id).toBe(12345);
    expect(market.name).toBe('Outright Winner');
    expect(Array.isArray(market.providerMarkets)).toBe(true);
    expect(market.providerMarkets?.length).toBe(2);
    expect(market.providerMarkets?.[0]).toBeInstanceOf(ProviderMarket);
    expect(market.providerMarkets?.[0]?.id).toBe(100);
    expect(market.providerMarkets?.[0]?.name).toBe('Provider Market 1');
    expect(market.providerMarkets?.[1]?.id).toBe(101);
    expect(market.providerMarkets?.[1]?.name).toBe('Provider Market 2');
  });

  it('should handle empty ProviderMarkets array', (): void => {
    const plain = {
      Id: 12345,
      Name: 'Outright Winner',
      ProviderMarkets: [],
    };
    const market = plainToInstance(OutrightMarketBodyStructure, plain, {
      excludeExtraneousValues: true,
    });
    expect(market.providerMarkets).toEqual([]);
  });

  it('should deserialize full market structure with all fields', (): void => {
    const plain = {
      Id: 999,
      Name: 'Full Market',
      Bets: [{ Id: 1, Name: 'Bet 1' }],
      ProviderMarkets: [{ Id: 500, Name: 'Provider 1' }],
    };
    const market = plainToInstance(OutrightMarketBodyStructure, plain, {
      excludeExtraneousValues: true,
    });
    expect(market.id).toBe(999);
    expect(market.name).toBe('Full Market');
    expect(market.bets?.length).toBe(1);
    expect(market.providerMarkets?.length).toBe(1);
    expect(market.providerMarkets?.[0]?.id).toBe(500);
  });
});
