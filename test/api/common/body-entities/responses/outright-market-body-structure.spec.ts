import { plainToInstance } from 'class-transformer';
import { OutrightMarketBodyStructure } from '../../../../../src/api/common/body-entities/responses/outright-market-body-structure';
import { Bet } from '../../../../../src/entities/core-entities/market/bet';

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
});
