import { StatusDescription } from '../../../../src/entities/core-entities/enums/status-description';

describe('StatusDescription Enum', () => {
  it('should map names to values correctly', () => {
    expect(StatusDescription.None).toBe(0);
    expect(StatusDescription.HT).toBe(1);
    expect(StatusDescription.OTHT).toBe(2);
    expect(StatusDescription.HomeRetired).toBe(3);
    expect(StatusDescription.AwayRetired).toBe(4);
    expect(StatusDescription.LostCoverage).toBe(5);
    expect(StatusDescription.MedicalTimeout).toBe(6);
    expect(StatusDescription.TimeoutHomeTeam).toBe(7);
    expect(StatusDescription.TimeoutAwayTeam).toBe(8);
    expect(StatusDescription.Timeout).toBe(9);
    expect(StatusDescription.HomeWalkover).toBe(10);
    expect(StatusDescription.AwayWalkover).toBe(11);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(StatusDescription[0]).toBe('None');
    expect(StatusDescription[1]).toBe('HT');
    expect(StatusDescription[2]).toBe('OTHT');
    expect(StatusDescription[3]).toBe('HomeRetired');
    expect(StatusDescription[4]).toBe('AwayRetired');
    expect(StatusDescription[5]).toBe('LostCoverage');
    expect(StatusDescription[6]).toBe('MedicalTimeout');
    expect(StatusDescription[7]).toBe('TimeoutHomeTeam');
    expect(StatusDescription[8]).toBe('TimeoutAwayTeam');
    expect(StatusDescription[9]).toBe('Timeout');
    expect(StatusDescription[10]).toBe('HomeWalkover');
    expect(StatusDescription[11]).toBe('AwayWalkover');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(StatusDescription).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual([
      'None',
      'HT',
      'OTHT',
      'HomeRetired',
      'AwayRetired',
      'LostCoverage',
      'MedicalTimeout',
      'TimeoutHomeTeam',
      'TimeoutAwayTeam',
      'Timeout',
      'HomeWalkover',
      'AwayWalkover',
    ]);
  });
});
