import { DangerIndicatorStatus } from '../../../../src/entities/core-entities/enums/danger-indicator-status';

describe('DangerIndicatorStatus Enum', () => {
  it('should map names to values correctly', () => {
    expect(DangerIndicatorStatus.Safe).toBe(1);
    expect(DangerIndicatorStatus.Danger).toBe(2);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(DangerIndicatorStatus[1]).toBe('Safe');
    expect(DangerIndicatorStatus[2]).toBe('Danger');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(DangerIndicatorStatus).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['Safe', 'Danger']);
  });
});
