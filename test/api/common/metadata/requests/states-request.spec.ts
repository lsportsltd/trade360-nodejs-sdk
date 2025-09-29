import {
  GetStatesRequest,
  StatesFilter,
} from '../../../../../src/api/common/metadata/requests/states-request';

describe('StatesFilter', () => {
  it('should instantiate with default values', () => {
    const filter = new StatesFilter();
    
    expect(filter).toBeInstanceOf(StatesFilter);
    expect(filter.stateIds).toBeUndefined();
    expect(filter.countryIds).toBeUndefined();
  });

  it('should instantiate with data object', () => {
    const data = {
      stateIds: [1, 2, 3],
      countryIds: [100, 200],
    };
    const filter = new StatesFilter(data);
    
    expect(filter.stateIds).toEqual(data.stateIds);
    expect(filter.countryIds).toEqual(data.countryIds);
  });

  it('should handle partial data', () => {
    const data = {
      stateIds: [1, 2],
    };
    const filter = new StatesFilter(data);
    
    expect(filter.stateIds).toEqual(data.stateIds);
    expect(filter.countryIds).toBeUndefined();
  });

  it('should handle empty arrays', () => {
    const data = {
      stateIds: [],
      countryIds: [],
    };
    const filter = new StatesFilter(data);
    
    expect(filter.stateIds).toEqual([]);
    expect(filter.countryIds).toEqual([]);
  });

  it('should handle null/undefined data', () => {
    const filter1 = new StatesFilter(null);
    const filter2 = new StatesFilter(undefined);
    
    expect(filter1).toBeInstanceOf(StatesFilter);
    expect(filter2).toBeInstanceOf(StatesFilter);
  });
});

describe('GetStatesRequest', () => {
  it('should instantiate with default values', () => {
    const request = new GetStatesRequest();
    
    expect(request).toBeInstanceOf(GetStatesRequest);
    expect(request.filter).toBeUndefined();
  });

  it('should instantiate with data object including filter', () => {
    const filterData = {
      stateIds: [1, 2, 3],
      countryIds: [100],
    };
    const data = {
      filter: filterData,
      userName: 'test-user',
      password: 'test-password',
      packageId: 123,
    };
    const request = new GetStatesRequest(data);
    
    expect(request.filter).toEqual(filterData);
    expect(request.userName).toBe('test-user');
    expect(request.password).toBe('test-password');
    expect(request.packageId).toBe(123);
  });

  it('should handle data without filter', () => {
    const data = {
      userName: 'test-user',
      password: 'test-password',
      packageId: 123,
    };
    const request = new GetStatesRequest(data);
    
    expect(request.filter).toBeUndefined();
    expect(request.userName).toBe('test-user');
    expect(request.password).toBe('test-password');
    expect(request.packageId).toBe(123);
  });

  it('should handle empty data object', () => {
    const request = new GetStatesRequest({});
    
    expect(request).toBeInstanceOf(GetStatesRequest);
    expect(request.filter).toBeUndefined();
  });

  it('should handle null/undefined data', () => {
    const request1 = new GetStatesRequest(null);
    const request2 = new GetStatesRequest(undefined);
    
    expect(request1).toBeInstanceOf(GetStatesRequest);
    expect(request2).toBeInstanceOf(GetStatesRequest);
  });
});


