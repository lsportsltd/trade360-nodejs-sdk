import { VenueAssignment } from '../../../../src/entities/core-entities/enums/venue-assignment';

describe('VenueAssignment Enum', () => {
  it('should map names to values correctly', () => {
    expect(VenueAssignment.Home).toBe(0);
    expect(VenueAssignment.Away).toBe(1);
    expect(VenueAssignment.Neutral).toBe(2);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(VenueAssignment[0]).toBe('Home');
    expect(VenueAssignment[1]).toBe('Away');
    expect(VenueAssignment[2]).toBe('Neutral');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(VenueAssignment).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual([
      'Home',
      'Away',
      'Neutral',
    ]);
  });

  it('should contain all expected enum values', () => {
    const values = Object.values(VenueAssignment).filter((v) => typeof v === 'number');
    expect(values).toEqual([0, 1, 2]);
  });

  it('should have correct number of enum members', () => {
    const keys = Object.keys(VenueAssignment).filter((k) => isNaN(Number(k)));
    expect(keys).toHaveLength(3);
  });
});


