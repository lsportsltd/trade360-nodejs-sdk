import {
  GetCitiesRequest,
  CitiesFilter,
} from '../../../../../src/api/common/metadata/requests/cities-request';

describe('CitiesFilter', () => {
  it('should instantiate with default values', () => {
    const filter = new CitiesFilter();

    expect(filter).toBeInstanceOf(CitiesFilter);
    expect(filter.cityIds).toBeUndefined();
    expect(filter.countryIds).toBeUndefined();
    expect(filter.stateIds).toBeUndefined();
  });

  it('should instantiate with data object', () => {
    const data = {
      cityIds: [1, 2, 3],
      countryIds: [100, 200],
      stateIds: [10, 20],
    };
    const filter = new CitiesFilter(data);

    expect(filter.cityIds).toEqual(data.cityIds);
    expect(filter.countryIds).toEqual(data.countryIds);
    expect(filter.stateIds).toEqual(data.stateIds);
  });

  it('should handle partial data', () => {
    const data = {
      cityIds: [1, 2],
      countryIds: [100],
    };
    const filter = new CitiesFilter(data);

    expect(filter.cityIds).toEqual(data.cityIds);
    expect(filter.countryIds).toEqual(data.countryIds);
    expect(filter.stateIds).toBeUndefined();
  });

  it('should handle empty arrays', () => {
    const data = {
      cityIds: [],
      countryIds: [],
      stateIds: [],
    };
    const filter = new CitiesFilter(data);

    expect(filter.cityIds).toEqual([]);
    expect(filter.countryIds).toEqual([]);
    expect(filter.stateIds).toEqual([]);
  });

  it('should handle null/undefined data', () => {
    const filter1 = new CitiesFilter(null);
    const filter2 = new CitiesFilter(undefined);

    expect(filter1).toBeInstanceOf(CitiesFilter);
    expect(filter2).toBeInstanceOf(CitiesFilter);
  });
});

describe('GetCitiesRequest', () => {
  it('should instantiate with default values', () => {
    const request = new GetCitiesRequest();

    expect(request).toBeInstanceOf(GetCitiesRequest);
    expect(request.filter).toBeUndefined();
  });

  it('should instantiate with data object including filter', () => {
    const filterData = {
      cityIds: [1, 2, 3],
      countryIds: [100],
    };
    const data = {
      filter: filterData,
      userName: 'test-user',
      password: 'test-password',
      packageId: 123,
    };
    const request = new GetCitiesRequest(data);

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
    const request = new GetCitiesRequest(data);

    expect(request.filter).toBeUndefined();
    expect(request.userName).toBe('test-user');
    expect(request.password).toBe('test-password');
    expect(request.packageId).toBe(123);
  });

  it('should handle empty data object', () => {
    const request = new GetCitiesRequest({});

    expect(request).toBeInstanceOf(GetCitiesRequest);
    expect(request.filter).toBeUndefined();
  });

  it('should handle null/undefined data', () => {
    const request1 = new GetCitiesRequest(null);
    const request2 = new GetCitiesRequest(undefined);

    expect(request1).toBeInstanceOf(GetCitiesRequest);
    expect(request2).toBeInstanceOf(GetCitiesRequest);
  });
});
