import { StatesCollectionResponse } from '../../../../../src/api/common/metadata/responses/states-collection-response';

describe('StatesCollectionResponse', () => {
  it('should instantiate with default values', () => {
    const response = new StatesCollectionResponse();
    
    expect(response).toBeInstanceOf(StatesCollectionResponse);
    expect(response.data).toBeUndefined();
  });

  it('should instantiate with data object', () => {
    const stateData = {
      stateId: 1,
      name: 'Test State',
      country: { id: 100, name: 'Test Country' },
    };
    const data = {
      data: [stateData],
    };
    const response = new StatesCollectionResponse(data);
    
    expect(response.data).toEqual([stateData]);
  });

  it('should handle empty data array', () => {
    const data = {
      data: [],
    };
    const response = new StatesCollectionResponse(data);
    
    expect(response.data).toEqual([]);
  });

  it('should handle multiple states in data array', () => {
    const statesData = [
      {
        stateId: 1,
        name: 'State 1',
        country: { id: 100, name: 'Country 1' },
      },
      {
        stateId: 2,
        name: 'State 2',
        country: { id: 200, name: 'Country 2' },
      },
    ];
    const data = {
      data: statesData,
    };
    const response = new StatesCollectionResponse(data);
    
    expect(response.data).toEqual(statesData);
    expect(response.data).toHaveLength(2);
  });

  it('should handle null/undefined data', () => {
    const response1 = new StatesCollectionResponse(null);
    const response2 = new StatesCollectionResponse(undefined);
    
    expect(response1).toBeInstanceOf(StatesCollectionResponse);
    expect(response2).toBeInstanceOf(StatesCollectionResponse);
  });

  it('should handle additional properties from data object', () => {
    const data = {
      data: [],
      totalItems: 0,
      customProperty: 'test',
    };
    const response = new StatesCollectionResponse(data);
    
    expect(response.data).toEqual([]);
    expect(response.totalItems).toBe(0);
    expect(response.customProperty).toBe('test');
  });
});


