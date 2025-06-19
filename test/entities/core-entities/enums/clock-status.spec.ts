import { ClockStatus } from '../../../../src/entities/core-entities/enums/clock-status';

describe('ClockStatus Enum', () => {
  it('should map names to values correctly', () => {
    expect(ClockStatus.Stopped).toBe(0);
    expect(ClockStatus.Running).toBe(1);
    expect(ClockStatus.Paused).toBe(2);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(ClockStatus[0]).toBe('Stopped');
    expect(ClockStatus[1]).toBe('Running');
    expect(ClockStatus[2]).toBe('Paused');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(ClockStatus).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['Stopped', 'Running', 'Paused']);
  });
});