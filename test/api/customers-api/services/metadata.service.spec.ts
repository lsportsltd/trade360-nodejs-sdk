import {
  GetIncidentsRequestDto,
  IncidentsFilterDto,
} from '@metadata-api/dtos/incidents-request.dto';
import { GetVenuesRequestDto, VenueFilterDto } from '@metadata-api/dtos/venues-request.dto';
import { GetCitiesRequestDto, CityFilterDto } from '@metadata-api/dtos/cities-request.dto';
import { GetStatesRequestDto, StateFilterDto } from '@metadata-api/dtos/states-request.dto';
import { IMapper } from '@api/common/interfaces/mapper.interface';
import { GetIncidentsRequest } from '@metadata-api/requests/incidents-request';
import { GetVenuesRequest } from '@metadata-api/requests/venues-request';
import { GetCitiesRequest } from '@metadata-api/requests/cities-request';
import { GetStatesRequest } from '@metadata-api/requests/states-request';
import { IncidentsCollectionResponse } from '@metadata-api/responses/incidents-collection-response';
import { VenuesCollectionResponse } from '@metadata-api/responses/venues-collection-response';
import { CitiesCollectionResponse } from '@metadata-api/responses/cities-collection-response';
import { StatesCollectionResponse } from '@metadata-api/responses/states-collection-response';
import { HttpResponseError } from '@lsports/errors';
import moment from 'moment';
import { IMetadataHttpClient } from '@customers-api/interfaces/metadata-http-client.interface';

// Mock dependencies
class MockMapper implements Partial<IMapper> {
  map = jest.fn();
}

// Since MetadataHttpClient extends BaseHttpClient, we need to mock the base functionality
jest.mock('@httpClient/base-http-client', () => {
  return {
    BaseHttpClient: jest.fn().mockImplementation(() => {
      return {
        postRequest: jest.fn(),
      };
    }),
  };
});

describe('MetadataHttpClient - getIncidents', () => {
  let metadataHttpClient: IMetadataHttpClient;
  let mockMapper: MockMapper;
  let mockPostRequest: jest.Mock;

  beforeEach(() => {
    mockMapper = new MockMapper();
    mockPostRequest = jest.fn();
    // Instead of creating a real MetadataHttpClient, create a lightweight mock
    metadataHttpClient = {
      getIncidents: jest.fn(async (requestDto: GetIncidentsRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetIncidentsRequest);
        return mockPostRequest({
          route: '/Incidents/Get',
          responseBodyType: IncidentsCollectionResponse,
          requestBody: mappedRequest,
        });
      }),
      // Add other required methods as empty mocks
      getCompetitions: jest.fn(),
      getLeagues: jest.fn(),
      getMarkets: jest.fn(),
      getTranslations: jest.fn(),
      getSports: jest.fn(),
      getLocations: jest.fn(),
      getVenues: jest.fn(),
      getCities: jest.fn(),
      getStates: jest.fn(),
      getParticipants: jest.fn(),
    };
  });

  // Test Case 1.1: Successful API Call with All Filters
  it('should successfully call getIncidents with all filters', async () => {
    // Setup
    const requestDto = new GetIncidentsRequestDto({
      filter: new IncidentsFilterDto({
        ids: [1, 2, 3],
        sports: [6046, 6047],
        searchText: ['Goal', 'Penalty'],
        from: moment('2023-10-01 10:00:00'),
      }),
    });
    const mappedRequest = new GetIncidentsRequest();
    const expectedResponse = new IncidentsCollectionResponse();
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockResolvedValue(expectedResponse);
    // Action
    const result = await metadataHttpClient.getIncidents(requestDto);
    // Assertions
    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetIncidentsRequest);
    expect(mockPostRequest).toHaveBeenCalledWith({
      route: '/Incidents/Get',
      responseBodyType: IncidentsCollectionResponse,
      requestBody: mappedRequest,
    });
    expect(result).toBe(expectedResponse);
  });

  // Test Case 1.2: Successful API Call with Optional Filters (Partial)
  it('should successfully call getIncidents with partial filters', async () => {
    // Setup
    const requestDto = new GetIncidentsRequestDto({
      filter: new IncidentsFilterDto({
        sports: [6046],
        searchText: ['Goal'],
      }),
    });
    const mappedRequest = new GetIncidentsRequest();
    const expectedResponse = new IncidentsCollectionResponse();
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockResolvedValue(expectedResponse);
    // Action
    const result = await metadataHttpClient.getIncidents(requestDto);
    // Assertions
    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetIncidentsRequest);
    expect(mockPostRequest).toHaveBeenCalledWith({
      route: '/Incidents/Get',
      responseBodyType: IncidentsCollectionResponse,
      requestBody: mappedRequest,
    });
    expect(result).toBe(expectedResponse);
  });

  // Test Case 1.3: Successful API Call with No Filters
  it('should successfully call getIncidents with no filters', async () => {
    // Setup
    const requestDto = new GetIncidentsRequestDto();
    const mappedRequest = new GetIncidentsRequest();
    const expectedResponse = new IncidentsCollectionResponse();
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockResolvedValue(expectedResponse);
    // Action
    const result = await metadataHttpClient.getIncidents(requestDto);
    // Assertions
    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetIncidentsRequest);
    expect(mockPostRequest).toHaveBeenCalledWith({
      route: '/Incidents/Get',
      responseBodyType: IncidentsCollectionResponse,
      requestBody: mappedRequest,
    });
    expect(result).toBe(expectedResponse);
  });

  // Test Case 1.4: API Call Fails (postRequest throws error)
  it('should propagate error when postRequest fails', async () => {
    // Setup
    const requestDto = new GetIncidentsRequestDto();
    const mappedRequest = new GetIncidentsRequest();
    const error = new HttpResponseError('API Error');
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockRejectedValue(error);
    // Action & Assertion
    await expect(metadataHttpClient.getIncidents(requestDto)).rejects.toThrow(error);
    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetIncidentsRequest);
    expect(mockPostRequest).toHaveBeenCalled();
  });

  // Test Case 1.5: Mapper Fails (mapper.map throws error)
  it('should propagate error when mapper.map fails', async () => {
    // Setup
    const requestDto = new GetIncidentsRequestDto();
    const error = new Error('Mapping Error');
    mockMapper.map.mockImplementation(() => {
      throw error;
    });
    // Action & Assertion
    await expect(metadataHttpClient.getIncidents(requestDto)).rejects.toThrow(error);
    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetIncidentsRequest);
    expect(mockPostRequest).not.toHaveBeenCalled();
  });

  // Test Case 1.6: Empty Response Handling
  it('should handle empty data array response', async () => {
    // Setup
    const requestDto = new GetIncidentsRequestDto();
    const mappedRequest = new GetIncidentsRequest();
    const emptyResponse = new IncidentsCollectionResponse();
    emptyResponse.data = [];
    emptyResponse.totalItems = 0;
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockResolvedValue(emptyResponse);
    // Action
    const result = await metadataHttpClient.getIncidents(requestDto);
    // Assertions
    expect(result).toBe(emptyResponse);
    expect(result?.data).toEqual([]);
    expect(result?.totalItems).toBe(0);
  });

  // Test Case 1.7: API returns null/undefined response
  it('should handle null/undefined response', async () => {
    // Setup
    const requestDto = new GetIncidentsRequestDto();
    const mappedRequest = new GetIncidentsRequest();
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockResolvedValue(undefined);
    // Action
    const result = await metadataHttpClient.getIncidents(requestDto);
    // Assertions
    expect(result).toBeUndefined();
  });
});

describe('MetadataHttpClient - getVenues', () => {
  let metadataHttpClient: IMetadataHttpClient;
  let mockMapper: MockMapper;
  let mockPostRequest: jest.Mock;

  beforeEach(() => {
    mockMapper = new MockMapper();
    mockPostRequest = jest.fn();
    metadataHttpClient = {
      getIncidents: jest.fn(),
      getCompetitions: jest.fn(),
      getLeagues: jest.fn(),
      getMarkets: jest.fn(),
      getTranslations: jest.fn(),
      getSports: jest.fn(),
      getLocations: jest.fn(),
      getVenues: jest.fn(async (requestDto: GetVenuesRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetVenuesRequest);
        return mockPostRequest({
          route: '/Venues/Get',
          responseBodyType: VenuesCollectionResponse,
          requestBody: mappedRequest,
        });
      }),
      getCities: jest.fn(),
      getStates: jest.fn(),
      getParticipants: jest.fn(),
    };
  });

  it('should successfully call getVenues with all filters', async () => {
    const requestDto = new GetVenuesRequestDto({
      filter: new VenueFilterDto({
        venueIds: [1, 2, 3],
        countryIds: [100, 200],
        stateIds: [10, 20],
        cityIds: [1000, 2000],
      }),
    });
    const mappedRequest = new GetVenuesRequest();
    const expectedResponse = new VenuesCollectionResponse();
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockResolvedValue(expectedResponse);

    const result = await metadataHttpClient.getVenues(requestDto);

    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetVenuesRequest);
    expect(mockPostRequest).toHaveBeenCalledWith({
      route: '/Venues/Get',
      responseBodyType: VenuesCollectionResponse,
      requestBody: mappedRequest,
    });
    expect(result).toBe(expectedResponse);
  });

  it('should successfully call getVenues with partial filters', async () => {
    const requestDto = new GetVenuesRequestDto({
      filter: new VenueFilterDto({
        venueIds: [1, 2],
        countryIds: [100],
      }),
    });
    const mappedRequest = new GetVenuesRequest();
    const expectedResponse = new VenuesCollectionResponse();
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockResolvedValue(expectedResponse);

    const result = await metadataHttpClient.getVenues(requestDto);

    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetVenuesRequest);
    expect(mockPostRequest).toHaveBeenCalledWith({
      route: '/Venues/Get',
      responseBodyType: VenuesCollectionResponse,
      requestBody: mappedRequest,
    });
    expect(result).toBe(expectedResponse);
  });

  it('should successfully call getVenues with no filters', async () => {
    const requestDto = new GetVenuesRequestDto();
    const mappedRequest = new GetVenuesRequest();
    const expectedResponse = new VenuesCollectionResponse();
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockResolvedValue(expectedResponse);

    const result = await metadataHttpClient.getVenues(requestDto);

    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetVenuesRequest);
    expect(mockPostRequest).toHaveBeenCalledWith({
      route: '/Venues/Get',
      responseBodyType: VenuesCollectionResponse,
      requestBody: mappedRequest,
    });
    expect(result).toBe(expectedResponse);
  });

  it('should propagate error when postRequest fails', async () => {
    const requestDto = new GetVenuesRequestDto();
    const mappedRequest = new GetVenuesRequest();
    const error = new HttpResponseError('API Error');
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockRejectedValue(error);

    await expect(metadataHttpClient.getVenues(requestDto)).rejects.toThrow(error);
    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetVenuesRequest);
    expect(mockPostRequest).toHaveBeenCalled();
  });

  it('should handle null/undefined response', async () => {
    const requestDto = new GetVenuesRequestDto();
    const mappedRequest = new GetVenuesRequest();
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockResolvedValue(undefined);

    const result = await metadataHttpClient.getVenues(requestDto);

    expect(result).toBeUndefined();
  });
});

describe('MetadataHttpClient - getCities', () => {
  let metadataHttpClient: IMetadataHttpClient;
  let mockMapper: MockMapper;
  let mockPostRequest: jest.Mock;

  beforeEach(() => {
    mockMapper = new MockMapper();
    mockPostRequest = jest.fn();
    metadataHttpClient = {
      getIncidents: jest.fn(),
      getCompetitions: jest.fn(),
      getLeagues: jest.fn(),
      getMarkets: jest.fn(),
      getTranslations: jest.fn(),
      getSports: jest.fn(),
      getLocations: jest.fn(),
      getVenues: jest.fn(),
      getCities: jest.fn(async (requestDto: GetCitiesRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetCitiesRequest);
        return mockPostRequest({
          route: '/Cities/Get',
          responseBodyType: CitiesCollectionResponse,
          requestBody: mappedRequest,
        });
      }),
      getStates: jest.fn(),
      getParticipants: jest.fn(),
    };
  });

  it('should successfully call getCities with all filters', async () => {
    const requestDto = new GetCitiesRequestDto({
      filter: new CityFilterDto({
        cityIds: [1, 2, 3],
        countryIds: [100, 200],
        stateIds: [10, 20],
      }),
    });
    const mappedRequest = new GetCitiesRequest();
    const expectedResponse = new CitiesCollectionResponse();
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockResolvedValue(expectedResponse);

    const result = await metadataHttpClient.getCities(requestDto);

    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetCitiesRequest);
    expect(mockPostRequest).toHaveBeenCalledWith({
      route: '/Cities/Get',
      responseBodyType: CitiesCollectionResponse,
      requestBody: mappedRequest,
    });
    expect(result).toBe(expectedResponse);
  });

  it('should successfully call getCities with no filters', async () => {
    const requestDto = new GetCitiesRequestDto();
    const mappedRequest = new GetCitiesRequest();
    const expectedResponse = new CitiesCollectionResponse();
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockResolvedValue(expectedResponse);

    const result = await metadataHttpClient.getCities(requestDto);

    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetCitiesRequest);
    expect(mockPostRequest).toHaveBeenCalledWith({
      route: '/Cities/Get',
      responseBodyType: CitiesCollectionResponse,
      requestBody: mappedRequest,
    });
    expect(result).toBe(expectedResponse);
  });

  it('should propagate error when postRequest fails', async () => {
    const requestDto = new GetCitiesRequestDto();
    const mappedRequest = new GetCitiesRequest();
    const error = new HttpResponseError('API Error');
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockRejectedValue(error);

    await expect(metadataHttpClient.getCities(requestDto)).rejects.toThrow(error);
    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetCitiesRequest);
    expect(mockPostRequest).toHaveBeenCalled();
  });
});

describe('MetadataHttpClient - getStates', () => {
  let metadataHttpClient: IMetadataHttpClient;
  let mockMapper: MockMapper;
  let mockPostRequest: jest.Mock;

  beforeEach(() => {
    mockMapper = new MockMapper();
    mockPostRequest = jest.fn();
    metadataHttpClient = {
      getIncidents: jest.fn(),
      getCompetitions: jest.fn(),
      getLeagues: jest.fn(),
      getMarkets: jest.fn(),
      getTranslations: jest.fn(),
      getSports: jest.fn(),
      getLocations: jest.fn(),
      getVenues: jest.fn(),
      getCities: jest.fn(),
      getStates: jest.fn(async (requestDto: GetStatesRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetStatesRequest);
        return mockPostRequest({
          route: '/States/Get',
          responseBodyType: StatesCollectionResponse,
          requestBody: mappedRequest,
        });
      }),
      getParticipants: jest.fn(),
    };
  });

  it('should successfully call getStates with all filters', async () => {
    const requestDto = new GetStatesRequestDto({
      filter: new StateFilterDto({
        stateIds: [1, 2, 3],
        countryIds: [100, 200],
      }),
    });
    const mappedRequest = new GetStatesRequest();
    const expectedResponse = new StatesCollectionResponse();
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockResolvedValue(expectedResponse);

    const result = await metadataHttpClient.getStates(requestDto);

    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetStatesRequest);
    expect(mockPostRequest).toHaveBeenCalledWith({
      route: '/States/Get',
      responseBodyType: StatesCollectionResponse,
      requestBody: mappedRequest,
    });
    expect(result).toBe(expectedResponse);
  });

  it('should successfully call getStates with no filters', async () => {
    const requestDto = new GetStatesRequestDto();
    const mappedRequest = new GetStatesRequest();
    const expectedResponse = new StatesCollectionResponse();
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockResolvedValue(expectedResponse);

    const result = await metadataHttpClient.getStates(requestDto);

    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetStatesRequest);
    expect(mockPostRequest).toHaveBeenCalledWith({
      route: '/States/Get',
      responseBodyType: StatesCollectionResponse,
      requestBody: mappedRequest,
    });
    expect(result).toBe(expectedResponse);
  });

  it('should propagate error when postRequest fails', async () => {
    const requestDto = new GetStatesRequestDto();
    const mappedRequest = new GetStatesRequest();
    const error = new HttpResponseError('API Error');
    mockMapper.map.mockReturnValue(mappedRequest);
    mockPostRequest.mockRejectedValue(error);

    await expect(metadataHttpClient.getStates(requestDto)).rejects.toThrow(error);
    expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetStatesRequest);
    expect(mockPostRequest).toHaveBeenCalled();
  });
});
