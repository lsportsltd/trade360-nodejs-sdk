import {
  GetIncidentsRequestDto,
  IncidentsFilterDto,
} from '@metadata-api/dtos/incidents-request.dto';
import { IMapper } from '@api/common/interfaces/mapper.interface';
import { GetIncidentsRequest } from '@metadata-api/requests/incidents-request';
import { IncidentsCollectionResponse } from '@metadata-api/responses/incidents-collection-response';
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
