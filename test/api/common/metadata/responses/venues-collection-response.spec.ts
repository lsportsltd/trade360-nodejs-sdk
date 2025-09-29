import { VenuesCollectionResponse } from '../../../../../src/api/common/metadata/responses/venues-collection-response';
import { VenueBodyStructure } from '../../../../../src/api/common/body-entities/responses/venue-body-structure';

describe('VenuesCollectionResponse', () => {
  it('should instantiate with default values', () => {
    const response = new VenuesCollectionResponse();
    
    expect(response).toBeInstanceOf(VenuesCollectionResponse);
    expect(response.data).toBeUndefined();
  });

  it('should instantiate with data object', () => {
    const venueData = {
      venueId: 1,
      name: 'Test Venue',
      country: { id: 100, name: 'Test Country' },
      state: { id: 10, name: 'Test State' },
      city: { id: 1000, name: 'Test City' },
    };
    const data = {
      data: [venueData],
    };
    const response = new VenuesCollectionResponse(data);
    
    expect(response.data).toEqual([venueData]);
  });

  it('should handle empty data array', () => {
    const data = {
      data: [],
    };
    const response = new VenuesCollectionResponse(data);
    
    expect(response.data).toEqual([]);
  });

  it('should handle multiple venues in data array', () => {
    const venuesData = [
      {
        venueId: 1,
        name: 'Venue 1',
        country: { id: 100, name: 'Country 1' },
      },
      {
        venueId: 2,
        name: 'Venue 2',
        country: { id: 200, name: 'Country 2' },
      },
    ];
    const data = {
      data: venuesData,
    };
    const response = new VenuesCollectionResponse(data);
    
    expect(response.data).toEqual(venuesData);
    expect(response.data).toHaveLength(2);
  });

  it('should handle null/undefined data', () => {
    const response1 = new VenuesCollectionResponse(null);
    const response2 = new VenuesCollectionResponse(undefined);
    
    expect(response1).toBeInstanceOf(VenuesCollectionResponse);
    expect(response2).toBeInstanceOf(VenuesCollectionResponse);
  });

  it('should handle additional properties from data object', () => {
    const data = {
      data: [],
      totalItems: 0,
      customProperty: 'test',
    };
    const response = new VenuesCollectionResponse(data);
    
    expect(response.data).toEqual([]);
    expect(response.totalItems).toBe(0);
    expect(response.customProperty).toBe('test');
  });
});


