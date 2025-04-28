import { BetStatus } from '../../../../src/entities/core-entities/enums/bet-status';

describe('BetStatus Enum', () => {
  it('should map names to values correctly', () => {
    expect(BetStatus.NotSet).toBe(0);
    expect(BetStatus.Open).toBe(1);
    expect(BetStatus.Suspended).toBe(2);
    expect(BetStatus.Settled).toBe(3);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(BetStatus[0]).toBe('NotSet');
    expect(BetStatus[1]).toBe('Open');
    expect(BetStatus[2]).toBe('Suspended');
    expect(BetStatus[3]).toBe('Settled');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(BetStatus).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['NotSet', 'Open', 'Suspended', 'Settled']);
  });
});
