import { CourtSurface } from '../../../../src/entities/core-entities/enums/court-surface';

describe('CourtSurface Enum', () => {
  it('should map names to values correctly', () => {
    expect(CourtSurface.Grass).toBe(0);
    expect(CourtSurface.Hard).toBe(1);
    expect(CourtSurface.Clay).toBe(2);
    expect(CourtSurface.ArtificialGrass).toBe(3);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(CourtSurface[0]).toBe('Grass');
    expect(CourtSurface[1]).toBe('Hard');
    expect(CourtSurface[2]).toBe('Clay');
    expect(CourtSurface[3]).toBe('ArtificialGrass');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(CourtSurface).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['Grass', 'Hard', 'Clay', 'ArtificialGrass']);
  });

  it('should contain all expected enum values', () => {
    const values = Object.values(CourtSurface).filter((v) => typeof v === 'number');
    expect(values).toEqual([0, 1, 2, 3]);
  });

  it('should have correct number of enum members', () => {
    const keys = Object.keys(CourtSurface).filter((k) => isNaN(Number(k)));
    expect(keys).toHaveLength(4);
  });
});
