import moment from 'moment';
import { Mapper } from '@api/common/mapper';
import {
  GetIncidentsRequestDto,
  IncidentsFilterDto,
} from '@metadata-api/dtos/incidents-request.dto';
import {
  GetVenuesRequestDto,
  VenueFilterDto,
} from '@metadata-api/dtos/venues-request.dto';
import {
  GetCitiesRequestDto,
  CityFilterDto,
} from '@metadata-api/dtos/cities-request.dto';
import {
  GetStatesRequestDto,
  StateFilterDto,
} from '@metadata-api/dtos/states-request.dto';
import { GetIncidentsRequest, IncidentsFilter } from '@metadata-api/requests/incidents-request';
import { GetVenuesRequest, VenuesFilter } from '@metadata-api/requests/venues-request';
import { GetCitiesRequest, CitiesFilter } from '@metadata-api/requests/cities-request';
import { GetStatesRequest, StatesFilter } from '@metadata-api/requests/states-request';

describe('Mapper - GetIncidents Flow', () => {
  // Setup
  const packageCredentials = {
    username: 'test-user',
    password: 'test-password',
    packageId: 123,
  };
  let mapper: Mapper;

  beforeEach(() => {
    mapper = new Mapper(packageCredentials);
  });

  // Test Case 2.1: Mapping IncidentsFilterDto to IncidentsFilter - All Fields
  it('should map IncidentsFilterDto to IncidentsFilter with all fields', () => {
    const filterDto = new IncidentsFilterDto({
      ids: [1, 2, 3],
      sports: [6046, 6047],
      searchText: ['Goal', 'Penalty'],
      from: moment('2023-10-01 10:00:00'),
    });

    const filter = mapper.map<IncidentsFilterDto, IncidentsFilter>(filterDto, IncidentsFilter);

    expect(filter).toBeInstanceOf(IncidentsFilter);
    expect(filter.ids).toEqual(filterDto.ids);
    expect(filter.sports).toEqual(filterDto.sports);
    expect(filter.searchText).toEqual(filterDto.searchText);
    expect(filter.from).toBe('2023-10-01 10:00:00');
  });

  // Test Case 2.2: Mapping IncidentsFilterDto to IncidentsFilter - Optional Fields Missing
  it('should map IncidentsFilterDto to IncidentsFilter with optional fields missing', () => {
    const filterDto = new IncidentsFilterDto({
      sports: [6046],
      searchText: ['Goal'],
      // ids and from are missing
    });

    const filter = mapper.map<IncidentsFilterDto, IncidentsFilter>(filterDto, IncidentsFilter);

    expect(filter).toBeInstanceOf(IncidentsFilter);
    expect(filter.sports).toEqual(filterDto.sports);
    expect(filter.searchText).toEqual(filterDto.searchText);
    expect(filter.ids).toBeUndefined();
    expect(filter.from).toBeUndefined();
  });

  // Test Case 2.3: Mapping GetIncidentsRequestDto to GetIncidentsRequest - With Filter
  it('should map GetIncidentsRequestDto to GetIncidentsRequest with filter', () => {
    const filterDto = new IncidentsFilterDto({
      sports: [6046],
      searchText: ['Goal'],
    });
    const requestDto = new GetIncidentsRequestDto({
      filter: filterDto,
    });

    const request = mapper.map<GetIncidentsRequestDto, GetIncidentsRequest>(
      requestDto,
      GetIncidentsRequest,
    );

    expect(request).toBeInstanceOf(GetIncidentsRequest);
    expect(request.filter).toBeInstanceOf(IncidentsFilter);
    expect(request.filter?.sports).toEqual(filterDto.sports);
    expect(request.filter?.searchText).toEqual(filterDto.searchText);
    // Package credentials should be added
    expect(request.username).toBe(packageCredentials.username);
    expect(request.password).toBe(packageCredentials.password);
    expect(request.packageId).toBe(packageCredentials.packageId);
  });

  // Test Case 2.4: Mapping GetIncidentsRequestDto to GetIncidentsRequest - Without Filter
  it('should map GetIncidentsRequestDto to GetIncidentsRequest without filter', () => {
    const requestDto = new GetIncidentsRequestDto();

    const request = mapper.map<GetIncidentsRequestDto, GetIncidentsRequest>(
      requestDto,
      GetIncidentsRequest,
    );

    expect(request).toBeInstanceOf(GetIncidentsRequest);
    expect(request.filter).toBeUndefined();
    // Package credentials should be added
    expect(request.username).toBe(packageCredentials.username);
    expect(request.password).toBe(packageCredentials.password);
    expect(request.packageId).toBe(packageCredentials.packageId);
  });

  // Test Case 2.5: Map with an invalid source type
  it('should return an empty object when mapping with an unregistered mapping', () => {
    // Create an object that doesn't implement BaseEntity and doesn't match expected type
    const invalidSource = { notAFilterProperty: 'test' };
    // Attempt to map to IncidentsFilter with an object that
    // doesn't match any registered mappings
    const result = mapper.map(invalidSource, IncidentsFilter);
    // In this implementation, the mapper returns an empty object for unmapped types
    expect(result).toEqual({});
  });

  // Edge Case 2.6: Timezone edge cases
  it('should format dates consistently regardless of timezone', () => {
    // Create a filterDto with a specific date
    const filterDto = new IncidentsFilterDto({
      from: moment('2023-10-01 10:00:00', 'YYYY-MM-DD HH:mm:ss', true),
    });

    const filter = mapper.map<IncidentsFilterDto, IncidentsFilter>(filterDto, IncidentsFilter);
    // The date should be formatted in the 'YYYY-MM-DD HH:mm:ss' format
    expect(filter.from).toBe('2023-10-01 10:00:00');
  });

  // Edge Case 2.7: Empty arrays
  it('should handle empty arrays in filter fields', () => {
    const filterDto = new IncidentsFilterDto({
      ids: [],
      sports: [],
      searchText: [],
    });

    const filter = mapper.map<IncidentsFilterDto, IncidentsFilter>(filterDto, IncidentsFilter);

    expect(filter.ids).toEqual([]);
    expect(filter.sports).toEqual([]);
    expect(filter.searchText).toEqual([]);
  });
});

describe('Mapper - GetVenues Flow', () => {
  const packageCredentials = {
    username: 'test-user',
    password: 'test-password',
    packageId: 123,
  };
  let mapper: Mapper;

  beforeEach(() => {
    mapper = new Mapper(packageCredentials);
  });

  it('should map VenueFilterDto to VenuesFilter with all fields', () => {
    const filterDto = new VenueFilterDto({
      venueIds: [1, 2, 3],
      countryIds: [100, 200],
      stateIds: [10, 20],
      cityIds: [1000, 2000],
    });

    const filter = mapper.map<VenueFilterDto, VenuesFilter>(filterDto, VenuesFilter);

    expect(filter).toBeInstanceOf(VenuesFilter);
    expect(filter.venueIds).toEqual(filterDto.venueIds);
    expect(filter.countryIds).toEqual(filterDto.countryIds);
    expect(filter.stateIds).toEqual(filterDto.stateIds);
    expect(filter.cityIds).toEqual(filterDto.cityIds);
  });

  it('should map GetVenuesRequestDto to GetVenuesRequest with filter and credentials', () => {
    const filterDto = new VenueFilterDto({
      venueIds: [1, 2],
      countryIds: [100],
    });
    const requestDto = new GetVenuesRequestDto({
      filter: filterDto,
    });

    const request = mapper.map<GetVenuesRequestDto, GetVenuesRequest>(
      requestDto,
      GetVenuesRequest,
    );

    expect(request).toBeInstanceOf(GetVenuesRequest);
    expect(request.filter).toBeInstanceOf(VenuesFilter);
    expect(request.filter?.venueIds).toEqual(filterDto.venueIds);
    expect(request.filter?.countryIds).toEqual(filterDto.countryIds);
    expect(request.username).toBe(packageCredentials.username);
    expect(request.password).toBe(packageCredentials.password);
    expect(request.packageId).toBe(packageCredentials.packageId);
  });

  it('should map GetVenuesRequestDto to GetVenuesRequest without filter', () => {
    const requestDto = new GetVenuesRequestDto();

    const request = mapper.map<GetVenuesRequestDto, GetVenuesRequest>(
      requestDto,
      GetVenuesRequest,
    );

    expect(request).toBeInstanceOf(GetVenuesRequest);
    expect(request.filter).toBeUndefined();
    expect(request.username).toBe(packageCredentials.username);
    expect(request.password).toBe(packageCredentials.password);
    expect(request.packageId).toBe(packageCredentials.packageId);
  });

  it('should handle empty arrays in venue filter fields', () => {
    const filterDto = new VenueFilterDto({
      venueIds: [],
      countryIds: [],
      stateIds: [],
      cityIds: [],
    });

    const filter = mapper.map<VenueFilterDto, VenuesFilter>(filterDto, VenuesFilter);

    expect(filter.venueIds).toEqual([]);
    expect(filter.countryIds).toEqual([]);
    expect(filter.stateIds).toEqual([]);
    expect(filter.cityIds).toEqual([]);
  });
});

describe('Mapper - GetCities Flow', () => {
  const packageCredentials = {
    username: 'test-user',
    password: 'test-password',
    packageId: 123,
  };
  let mapper: Mapper;

  beforeEach(() => {
    mapper = new Mapper(packageCredentials);
  });

  it('should map CityFilterDto to CitiesFilter with all fields', () => {
    const filterDto = new CityFilterDto({
      cityIds: [1, 2, 3],
      countryIds: [100, 200],
      stateIds: [10, 20],
    });

    const filter = mapper.map<CityFilterDto, CitiesFilter>(filterDto, CitiesFilter);

    expect(filter).toBeInstanceOf(CitiesFilter);
    expect(filter.cityIds).toEqual(filterDto.cityIds);
    expect(filter.countryIds).toEqual(filterDto.countryIds);
    expect(filter.stateIds).toEqual(filterDto.stateIds);
  });

  it('should map GetCitiesRequestDto to GetCitiesRequest with filter and credentials', () => {
    const filterDto = new CityFilterDto({
      cityIds: [1, 2],
      countryIds: [100],
    });
    const requestDto = new GetCitiesRequestDto({
      filter: filterDto,
    });

    const request = mapper.map<GetCitiesRequestDto, GetCitiesRequest>(
      requestDto,
      GetCitiesRequest,
    );

    expect(request).toBeInstanceOf(GetCitiesRequest);
    expect(request.filter).toBeInstanceOf(CitiesFilter);
    expect(request.filter?.cityIds).toEqual(filterDto.cityIds);
    expect(request.filter?.countryIds).toEqual(filterDto.countryIds);
    expect(request.username).toBe(packageCredentials.username);
    expect(request.password).toBe(packageCredentials.password);
    expect(request.packageId).toBe(packageCredentials.packageId);
  });

  it('should map GetCitiesRequestDto to GetCitiesRequest without filter', () => {
    const requestDto = new GetCitiesRequestDto();

    const request = mapper.map<GetCitiesRequestDto, GetCitiesRequest>(
      requestDto,
      GetCitiesRequest,
    );

    expect(request).toBeInstanceOf(GetCitiesRequest);
    expect(request.filter).toBeUndefined();
    expect(request.username).toBe(packageCredentials.username);
    expect(request.password).toBe(packageCredentials.password);
    expect(request.packageId).toBe(packageCredentials.packageId);
  });
});

describe('Mapper - GetStates Flow', () => {
  const packageCredentials = {
    username: 'test-user',
    password: 'test-password',
    packageId: 123,
  };
  let mapper: Mapper;

  beforeEach(() => {
    mapper = new Mapper(packageCredentials);
  });

  it('should map StateFilterDto to StatesFilter with all fields', () => {
    const filterDto = new StateFilterDto({
      stateIds: [1, 2, 3],
      countryIds: [100, 200],
    });

    const filter = mapper.map<StateFilterDto, StatesFilter>(filterDto, StatesFilter);

    expect(filter).toBeInstanceOf(StatesFilter);
    expect(filter.stateIds).toEqual(filterDto.stateIds);
    expect(filter.countryIds).toEqual(filterDto.countryIds);
  });

  it('should map GetStatesRequestDto to GetStatesRequest with filter and credentials', () => {
    const filterDto = new StateFilterDto({
      stateIds: [1, 2],
      countryIds: [100],
    });
    const requestDto = new GetStatesRequestDto({
      filter: filterDto,
    });

    const request = mapper.map<GetStatesRequestDto, GetStatesRequest>(
      requestDto,
      GetStatesRequest,
    );

    expect(request).toBeInstanceOf(GetStatesRequest);
    expect(request.filter).toBeInstanceOf(StatesFilter);
    expect(request.filter?.stateIds).toEqual(filterDto.stateIds);
    expect(request.filter?.countryIds).toEqual(filterDto.countryIds);
    expect(request.username).toBe(packageCredentials.username);
    expect(request.password).toBe(packageCredentials.password);
    expect(request.packageId).toBe(packageCredentials.packageId);
  });

  it('should map GetStatesRequestDto to GetStatesRequest without filter', () => {
    const requestDto = new GetStatesRequestDto();

    const request = mapper.map<GetStatesRequestDto, GetStatesRequest>(
      requestDto,
      GetStatesRequest,
    );

    expect(request).toBeInstanceOf(GetStatesRequest);
    expect(request.filter).toBeUndefined();
    expect(request.username).toBe(packageCredentials.username);
    expect(request.password).toBe(packageCredentials.password);
    expect(request.packageId).toBe(packageCredentials.packageId);
  });
});
