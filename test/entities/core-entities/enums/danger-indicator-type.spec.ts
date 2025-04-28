import { DangerIndicatorType } from '../../../../src/entities/core-entities/enums/danger-indicator-type';

describe('DangerIndicatorType Enum', () => {
  it('should map names to values correctly', () => {
    expect(DangerIndicatorType.General).toBe(1);
    expect(DangerIndicatorType.Cards).toBe(2);
    expect(DangerIndicatorType.Corners).toBe(3);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(DangerIndicatorType[1]).toBe('General');
    expect(DangerIndicatorType[2]).toBe('Cards');
    expect(DangerIndicatorType[3]).toBe('Corners');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(DangerIndicatorType).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['General', 'Cards', 'Corners']);
  });
});
