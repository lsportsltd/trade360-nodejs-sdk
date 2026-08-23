import { BetStatusId } from '../../../../src/entities/core-entities/enums/bet-status-id';

describe('BetStatusId Enum', () => {
  it('should map names to values correctly', () => {
    expect(BetStatusId.Open).toBe(1);
    expect(BetStatusId.Suspended).toBe(2);
    expect(BetStatusId.Settled).toBe(3);
    expect(BetStatusId.Closed).toBe(4);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(BetStatusId[1]).toBe('Open');
    expect(BetStatusId[2]).toBe('Suspended');
    expect(BetStatusId[3]).toBe('Settled');
    expect(BetStatusId[4]).toBe('Closed');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(BetStatusId).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['Open', 'Suspended', 'Settled', 'Closed']);
  });
});
