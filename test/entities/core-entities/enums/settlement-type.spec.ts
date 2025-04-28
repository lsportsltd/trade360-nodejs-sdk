import { SettlementType } from '../../../../src/entities/core-entities/enums/settlement-type';

describe('SettlementType Enum', () => {
  it('should map names to values correctly', () => {
    expect(SettlementType.Cancelled).toBe(-1);
    expect(SettlementType.NotSettled).toBe(0);
    expect(SettlementType.Loser).toBe(1);
    expect(SettlementType.Winner).toBe(2);
    expect(SettlementType.Refund).toBe(3);
    expect(SettlementType.HalfLost).toBe(4);
    expect(SettlementType.HalfWon).toBe(5);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(SettlementType[-1]).toBe('Cancelled');
    expect(SettlementType[0]).toBe('NotSettled');
    expect(SettlementType[1]).toBe('Loser');
    expect(SettlementType[2]).toBe('Winner');
    expect(SettlementType[3]).toBe('Refund');
    expect(SettlementType[4]).toBe('HalfLost');
    expect(SettlementType[5]).toBe('HalfWon');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(SettlementType).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual([
      'Cancelled',
      'NotSettled',
      'Loser',
      'Winner',
      'Refund',
      'HalfLost',
      'HalfWon',
    ]);
  });
});
