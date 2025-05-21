import moment from 'moment';
import { Mapper } from '@api/common/mapper';
import {
  GetIncidentsRequestDto,
  IncidentsFilterDto,
} from '@metadata-api/dtos/incidents-request.dto';
import {
  GetIncidentsRequest,
  IncidentsFilter,
} from '@metadata-api/requests/incidents-request';

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
    expect(request.userName).toBe(packageCredentials.username);
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
    expect(request.userName).toBe(packageCredentials.username);
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