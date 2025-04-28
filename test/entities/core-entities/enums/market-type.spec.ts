import { MarketType } from '../../../../src/entities/core-entities/enums/market-type';

describe('MarketType Enum', () => {
  it('should map names to values correctly', () => {
    expect(MarketType.All).toBe(0);
    expect(MarketType.Standard).toBe(1);
    expect(MarketType.Outright).toBe(2);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(MarketType[0]).toBe('All');
    expect(MarketType[1]).toBe('Standard');
    expect(MarketType[2]).toBe('Outright');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(MarketType).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['All', 'Standard', 'Outright']);
  });
});
