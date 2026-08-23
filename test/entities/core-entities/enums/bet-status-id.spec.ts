import { BetStatusId } from '../../../../src/entities/core-entities/enums/bet-status-id';

describe('BetStatusId Enum', () => {
  it('should map names to values 1–4 with no 0', () => {
    expect(BetStatusId.Open).toBe(1);
    expect(BetStatusId.Suspended).toBe(2);
    expect(BetStatusId.Settled).toBe(3);
    expect(BetStatusId.Closed).toBe(4);
    expect(BetStatusId[0]).toBeUndefined();
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(BetStatusId).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['Open', 'Suspended', 'Settled', 'Closed']);
  });
});
