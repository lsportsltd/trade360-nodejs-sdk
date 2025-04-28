import { FixtureStatus } from '../../../../src/entities/core-entities/enums/fixture-status';

describe('FixtureStatus Enum', () => {
  it('should map names to values correctly', () => {
    expect(FixtureStatus.NotSet).toBe(0);
    expect(FixtureStatus.NSY).toBe(1);
    expect(FixtureStatus.InProgress).toBe(2);
    expect(FixtureStatus.Finished).toBe(3);
    expect(FixtureStatus.Cancelled).toBe(4);
    expect(FixtureStatus.Postponed).toBe(5);
    expect(FixtureStatus.Interrupted).toBe(6);
    expect(FixtureStatus.Abandoned).toBe(7);
    expect(FixtureStatus.LostCoverage).toBe(8);
    expect(FixtureStatus.AboutToStart).toBe(9);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(FixtureStatus[0]).toBe('NotSet');
    expect(FixtureStatus[1]).toBe('NSY');
    expect(FixtureStatus[2]).toBe('InProgress');
    expect(FixtureStatus[3]).toBe('Finished');
    expect(FixtureStatus[4]).toBe('Cancelled');
    expect(FixtureStatus[5]).toBe('Postponed');
    expect(FixtureStatus[6]).toBe('Interrupted');
    expect(FixtureStatus[7]).toBe('Abandoned');
    expect(FixtureStatus[8]).toBe('LostCoverage');
    expect(FixtureStatus[9]).toBe('AboutToStart');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(FixtureStatus).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual([
      'NotSet',
      'NSY',
      'InProgress',
      'Finished',
      'Cancelled',
      'Postponed',
      'Interrupted',
      'Abandoned',
      'LostCoverage',
      'AboutToStart',
    ]);
  });
});
