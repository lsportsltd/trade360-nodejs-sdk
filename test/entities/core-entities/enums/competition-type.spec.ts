import { CompetitionType } from '../../../../src/entities/core-entities/enums/competition-type';

describe('CompetitionType Enum', () => {
  it('should map names to values correctly', () => {
    expect(CompetitionType.NotSet).toBe(0);
    expect(CompetitionType.Track).toBe(1);
    expect(CompetitionType.League).toBe(3);
    expect(CompetitionType.Season).toBe(4);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(CompetitionType[0]).toBe('NotSet');
    expect(CompetitionType[1]).toBe('Track');
    expect(CompetitionType[3]).toBe('League');
    expect(CompetitionType[4]).toBe('Season');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(CompetitionType).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['NotSet', 'Track', 'League', 'Season']);
  });
});
