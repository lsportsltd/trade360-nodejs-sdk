import { VenueEnvironment } from '../../../../src/entities/core-entities/enums/venue-environment';

describe('VenueEnvironment Enum', () => {
  it('should map names to values correctly', () => {
    expect(VenueEnvironment.Indoors).toBe(0);
    expect(VenueEnvironment.Outdoors).toBe(1);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(VenueEnvironment[0]).toBe('Indoors');
    expect(VenueEnvironment[1]).toBe('Outdoors');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(VenueEnvironment).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['Indoors', 'Outdoors']);
  });

  it('should contain all expected enum values', () => {
    const values = Object.values(VenueEnvironment).filter((v) => typeof v === 'number');
    expect(values).toEqual([0, 1]);
  });

  it('should have correct number of enum members', () => {
    const keys = Object.keys(VenueEnvironment).filter((k) => isNaN(Number(k)));
    expect(keys).toHaveLength(2);
  });
});
