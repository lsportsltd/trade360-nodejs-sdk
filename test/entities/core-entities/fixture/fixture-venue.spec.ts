import { FixtureVenue } from '../../../../src/entities/core-entities/fixture/fixture-venue';
import {
  CourtSurface,
  VenueAssignment,
  VenueEnvironment,
} from '../../../../src/entities/core-entities/enums';
import { IdNNameRecord } from '../../../../src/entities/core-entities/common/id-and-name-record';

describe('FixtureVenue', () => {
  it('should instantiate with default values', () => {
    const venue = new FixtureVenue();

    expect(venue).toBeInstanceOf(FixtureVenue);
    expect(venue.id).toBeUndefined();
    expect(venue.name).toBeUndefined();
    expect(venue.capacity).toBeUndefined();
    expect(venue.attendance).toBeUndefined();
    expect(venue.courtSurfaceType).toBeUndefined();
    expect(venue.environment).toBeUndefined();
    expect(venue.assignment).toBeUndefined();
    expect(venue.country).toBeUndefined();
    expect(venue.state).toBeUndefined();
    expect(venue.city).toBeUndefined();
  });

  it('should allow setting basic properties', () => {
    const venue = new FixtureVenue();
    venue.id = 1;
    venue.name = 'Test Venue';
    venue.capacity = 50000;
    venue.attendance = 45000;

    expect(venue.id).toBe(1);
    expect(venue.name).toBe('Test Venue');
    expect(venue.capacity).toBe(50000);
    expect(venue.attendance).toBe(45000);
  });

  it('should allow setting enum properties', () => {
    const venue = new FixtureVenue();
    venue.courtSurfaceType = CourtSurface.Grass;
    venue.environment = VenueEnvironment.Indoors;
    venue.assignment = VenueAssignment.Home;

    expect(venue.courtSurfaceType).toBe(CourtSurface.Grass);
    expect(venue.environment).toBe(VenueEnvironment.Indoors);
    expect(venue.assignment).toBe(VenueAssignment.Home);
  });

  it('should allow setting nested IdNNameRecord properties', () => {
    const venue = new FixtureVenue();
    const country = new IdNNameRecord();
    country.id = 100;
    country.name = 'Test Country';

    const state = new IdNNameRecord();
    state.id = 10;
    state.name = 'Test State';

    const city = new IdNNameRecord();
    city.id = 1000;
    city.name = 'Test City';

    venue.country = country;
    venue.state = state;
    venue.city = city;

    expect(venue.country).toBe(country);
    expect(venue.country?.id).toBe(100);
    expect(venue.country?.name).toBe('Test Country');
    expect(venue.state).toBe(state);
    expect(venue.state?.id).toBe(10);
    expect(venue.state?.name).toBe('Test State');
    expect(venue.city).toBe(city);
    expect(venue.city?.id).toBe(1000);
    expect(venue.city?.name).toBe('Test City');
  });

  it('should handle all enum values for court surface type', () => {
    const venue = new FixtureVenue();

    venue.courtSurfaceType = CourtSurface.Grass;
    expect(venue.courtSurfaceType).toBe(CourtSurface.Grass);

    venue.courtSurfaceType = CourtSurface.Hard;
    expect(venue.courtSurfaceType).toBe(CourtSurface.Hard);

    venue.courtSurfaceType = CourtSurface.Clay;
    expect(venue.courtSurfaceType).toBe(CourtSurface.Clay);

    venue.courtSurfaceType = CourtSurface.ArtificialGrass;
    expect(venue.courtSurfaceType).toBe(CourtSurface.ArtificialGrass);
  });

  it('should handle edge cases for numeric properties', () => {
    const venue = new FixtureVenue();

    // Zero values
    venue.id = 0;
    venue.capacity = 0;
    venue.attendance = 0;

    expect(venue.id).toBe(0);
    expect(venue.capacity).toBe(0);
    expect(venue.attendance).toBe(0);

    // Large values
    venue.id = 999999;
    venue.capacity = 100000;
    venue.attendance = 99999;

    expect(venue.id).toBe(999999);
    expect(venue.capacity).toBe(100000);
    expect(venue.attendance).toBe(99999);
  });

  it('should handle empty string for name property', () => {
    const venue = new FixtureVenue();
    venue.name = '';

    expect(venue.name).toBe('');
  });

  it('should handle undefined assignments for optional properties', () => {
    const venue = new FixtureVenue();
    venue.country = undefined;
    venue.state = undefined;
    venue.city = undefined;

    expect(venue.country).toBeUndefined();
    expect(venue.state).toBeUndefined();
    expect(venue.city).toBeUndefined();
  });
});
