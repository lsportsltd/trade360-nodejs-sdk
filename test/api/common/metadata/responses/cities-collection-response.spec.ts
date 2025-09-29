import { CitiesCollectionResponse } from '../../../../../src/api/common/metadata/responses/cities-collection-response';

describe('CitiesCollectionResponse', () => {
  it('should instantiate with default values', () => {
    const response = new CitiesCollectionResponse();
    
    expect(response).toBeInstanceOf(CitiesCollectionResponse);
    expect(response.data).toBeUndefined();
  });

  it('should instantiate with data object', () => {
    const cityData = {
      cityId: 1,
      name: 'Test City',
      country: { id: 100, name: 'Test Country' },
      state: { id: 10, name: 'Test State' },
    };
    const data = {
      data: [cityData],
    };
    const response = new CitiesCollectionResponse(data);
    
    expect(response.data).toEqual([cityData]);
  });

  it('should handle empty data array', () => {
    const data = {
      data: [],
    };
    const response = new CitiesCollectionResponse(data);
    
    expect(response.data).toEqual([]);
  });

  it('should handle multiple cities in data array', () => {
    const citiesData = [
      {
        cityId: 1,
        name: 'City 1',
        country: { id: 100, name: 'Country 1' },
      },
      {
        cityId: 2,
        name: 'City 2',
        country: { id: 200, name: 'Country 2' },
      },
    ];
    const data = {
      data: citiesData,
    };
    const response = new CitiesCollectionResponse(data);
    
    expect(response.data).toEqual(citiesData);
    expect(response.data).toHaveLength(2);
  });

  it('should handle null/undefined data', () => {
    const response1 = new CitiesCollectionResponse(null);
    const response2 = new CitiesCollectionResponse(undefined);
    
    expect(response1).toBeInstanceOf(CitiesCollectionResponse);
    expect(response2).toBeInstanceOf(CitiesCollectionResponse);
  });

  it('should handle additional properties from data object', () => {
    const data = {
      data: [],
      totalItems: 0,
      customProperty: 'test',
    };
    const response = new CitiesCollectionResponse(data);
    
    expect(response.data).toEqual([]);
    expect(response.totalItems).toBe(0);
    expect(response.customProperty).toBe('test');
  });
});


