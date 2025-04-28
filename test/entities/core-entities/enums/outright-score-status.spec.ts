import { OutrightScoreStatus } from '../../../../src/entities/core-entities/enums/outright-score-status';

describe('OutrightScoreStatus Enum', () => {
  it('should map names to values correctly', () => {
    expect(OutrightScoreStatus.Unknown).toBe(0);
    expect(OutrightScoreStatus.Pending).toBe(1);
    expect(OutrightScoreStatus.InProgress).toBe(2);
    expect(OutrightScoreStatus.Completed).toBe(3);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(OutrightScoreStatus[0]).toBe('Unknown');
    expect(OutrightScoreStatus[1]).toBe('Pending');
    expect(OutrightScoreStatus[2]).toBe('InProgress');
    expect(OutrightScoreStatus[3]).toBe('Completed');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(OutrightScoreStatus).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['Unknown', 'Pending', 'InProgress', 'Completed']);
  });
});
