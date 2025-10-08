import {
  GetVenuesRequest,
  VenuesFilter,
} from '../../../../../src/api/common/metadata/requests/venues-request';

describe('VenuesFilter', () => {
  it('should instantiate with default values', () => {
    const filter = new VenuesFilter();

    expect(filter).toBeInstanceOf(VenuesFilter);
    expect(filter.venueIds).toBeUndefined();
    expect(filter.countryIds).toBeUndefined();
    expect(filter.stateIds).toBeUndefined();
    expect(filter.cityIds).toBeUndefined();
  });

  it('should instantiate with data object', () => {
    const data = {
      venueIds: [1, 2, 3],
      countryIds: [100, 200],
      stateIds: [10, 20],
      cityIds: [1000, 2000],
    };
    const filter = new VenuesFilter(data);

    expect(filter.venueIds).toEqual(data.venueIds);
    expect(filter.countryIds).toEqual(data.countryIds);
    expect(filter.stateIds).toEqual(data.stateIds);
    expect(filter.cityIds).toEqual(data.cityIds);
  });

  it('should handle partial data', () => {
    const data = {
      venueIds: [1, 2],
      countryIds: [100],
    };
    const filter = new VenuesFilter(data);

    expect(filter.venueIds).toEqual(data.venueIds);
    expect(filter.countryIds).toEqual(data.countryIds);
    expect(filter.stateIds).toBeUndefined();
    expect(filter.cityIds).toBeUndefined();
  });

  it('should handle empty arrays', () => {
    const data = {
      venueIds: [],
      countryIds: [],
      stateIds: [],
      cityIds: [],
    };
    const filter = new VenuesFilter(data);

    expect(filter.venueIds).toEqual([]);
    expect(filter.countryIds).toEqual([]);
    expect(filter.stateIds).toEqual([]);
    expect(filter.cityIds).toEqual([]);
  });

  it('should handle null/undefined data', () => {
    const filter1 = new VenuesFilter(null);
    const filter2 = new VenuesFilter(undefined);

    expect(filter1).toBeInstanceOf(VenuesFilter);
    expect(filter2).toBeInstanceOf(VenuesFilter);
  });
});

describe('GetVenuesRequest', () => {
  it('should instantiate with default values', () => {
    const request = new GetVenuesRequest();

    expect(request).toBeInstanceOf(GetVenuesRequest);
    expect(request.filter).toBeUndefined();
  });

  it('should instantiate with data object including filter', () => {
    const filterData = {
      venueIds: [1, 2, 3],
      countryIds: [100],
    };
    const data = {
      filter: filterData,
      userName: 'test-user',
      password: 'test-password',
      packageId: 123,
    };
    const request = new GetVenuesRequest(data);

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
    const request = new GetVenuesRequest(data);

    expect(request.filter).toBeUndefined();
    expect(request.userName).toBe('test-user');
    expect(request.password).toBe('test-password');
    expect(request.packageId).toBe(123);
  });

  it('should handle empty data object', () => {
    const request = new GetVenuesRequest({});

    expect(request).toBeInstanceOf(GetVenuesRequest);
    expect(request.filter).toBeUndefined();
  });

  it('should handle null/undefined data', () => {
    const request1 = new GetVenuesRequest(null);
    const request2 = new GetVenuesRequest(undefined);

    expect(request1).toBeInstanceOf(GetVenuesRequest);
    expect(request2).toBeInstanceOf(GetVenuesRequest);
  });
});
