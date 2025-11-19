/* eslint-env jest */
import {
  GetFixtureRequestDto,
  GetInPlayEventRequestDto,
  GetLivescoreRequestDto,
  GetMarketRequestDto,
  GetOutrightLeaguesRequestDto,
  GetOutrightLeagueMarketRequestDto,
  GetOutrightLeagueEventsRequestDto,
} from '@api/common/snapshot/dtos';
import { IMapper } from '@api/common/interfaces/mapper.interface';
import {
  GetFixtureRequest,
  GetInPlayEventRequest,
  GetLivescoreRequest,
  GetMarketRequest,
  GetOutrightLeaguesRequest,
  GetOutrightLeagueMarketRequest,
  GetOutrightLeagueEventsRequest,
} from '@api/common/snapshot/requests';
import {
  GetEventsResultElement,
  GetFixtureMarketsResultElement,
  GetFixturesResultElement,
  GetLivescoreResultElement,
  GetOutrightLeaguesResultElement,
  GetOutrightLeagueMarketsResultElement,
  GetOutrightLeagueEventsResultElement,
} from '@api/common/snapshot/responses';
import { HttpResponseError } from '@lsports/errors';
import { InPlaySnapshotApiClient } from '@api/snapshot-api/interfaces';

// Mock dependencies
class MockMapper implements Partial<IMapper> {
  map = jest.fn();
}

// Since InPlaySnapshotApiClientImplementation extends BaseHttpClient, we need to mock the base functionality
jest.mock('@httpClient/base-http-client', () => {
  return {
    BaseHttpClient: jest.fn().mockImplementation(() => {
      return {
        postRequest: jest.fn(),
      };
    }),
  };
});

describe('InPlaySnapshotApiClientImplementation', () => {
  let inplaySnapshotApiClient: InPlaySnapshotApiClient;
  let mockMapper: MockMapper;
  let mockPostRequest: jest.Mock;

  beforeEach(() => {
    mockMapper = new MockMapper();
    mockPostRequest = jest.fn();
    inplaySnapshotApiClient = {
      getFixtures: jest.fn(async (requestDto: GetFixtureRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetFixtureRequest);
        return mockPostRequest({
          route: '/Inplay/GetFixtures',
          responseBodyType: GetFixturesResultElement,
          requestBody: mappedRequest,
        });
      }),
      getLivescores: jest.fn(async (requestDto: GetLivescoreRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetLivescoreRequest);
        return mockPostRequest({
          route: '/Inplay/GetScores',
          responseBodyType: GetLivescoreResultElement,
          requestBody: mappedRequest,
        });
      }),
      getFixtureMarkets: jest.fn(async (requestDto: GetMarketRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetMarketRequest);
        return mockPostRequest({
          route: '/Inplay/GetFixtureMarkets',
          responseBodyType: GetFixtureMarketsResultElement,
          requestBody: mappedRequest,
        });
      }),
      getEvents: jest.fn(async (requestDto: GetInPlayEventRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetInPlayEventRequest);
        return mockPostRequest({
          route: '/Inplay/GetEvents',
          responseBodyType: GetEventsResultElement,
          requestBody: mappedRequest,
        });
      }),
      getOutrightLeagues: jest.fn(async (requestDto: GetOutrightLeaguesRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetOutrightLeaguesRequest);
        return mockPostRequest({
          route: '/Inplay/GetOutrightLeagues',
          responseBodyType: GetOutrightLeaguesResultElement,
          requestBody: mappedRequest,
        });
      }),
      getOutrightLeagueMarkets: jest.fn(async (requestDto: GetOutrightLeagueMarketRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetOutrightLeagueMarketRequest);
        return mockPostRequest({
          route: '/Inplay/GetOutrightLeagueMarkets',
          responseBodyType: GetOutrightLeagueMarketsResultElement,
          requestBody: mappedRequest,
        });
      }),
      getOutrightLeagueEvents: jest.fn(async (requestDto: GetOutrightLeagueEventsRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetOutrightLeagueEventsRequest);
        return mockPostRequest({
          route: '/Inplay/GetOutrightLeagueEvents',
          responseBodyType: GetOutrightLeagueEventsResultElement,
          requestBody: mappedRequest,
        });
      }),
    };
  });

  describe('getFixtures', () => {
    it('should successfully call getFixtures with valid request', async () => {
      const requestDto = new GetFixtureRequestDto();
      const mappedRequest = new GetFixtureRequest();
      const expectedResponse = new GetFixturesResultElement();

      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(expectedResponse);

      const result = await inplaySnapshotApiClient.getFixtures(requestDto);

      expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetFixtureRequest);
      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Inplay/GetFixtures',
        responseBodyType: GetFixturesResultElement,
        requestBody: mappedRequest,
      });
      expect(result).toBe(expectedResponse);
    });

    it('should handle mapper transformation correctly', async () => {
      const requestDto = new GetFixtureRequestDto();
      const mappedRequest = new GetFixtureRequest();
      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(new GetFixturesResultElement());

      await inplaySnapshotApiClient.getFixtures(requestDto);

      expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetFixtureRequest);
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetFixtureRequestDto();
      const error = new HttpResponseError('API Error');
      mockMapper.map.mockReturnValue(new GetFixtureRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(inplaySnapshotApiClient.getFixtures(requestDto)).rejects.toThrow(error);
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetFixtureRequestDto();
      mockMapper.map.mockReturnValue(new GetFixtureRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await inplaySnapshotApiClient.getFixtures(requestDto);

      expect(result).toBeUndefined();
    });
  });

  describe('getLivescores', () => {
    it('should successfully call getLivescores with valid request', async () => {
      const requestDto = new GetLivescoreRequestDto();
      const mappedRequest = new GetLivescoreRequest();
      const expectedResponse = new GetLivescoreResultElement();

      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(expectedResponse);

      const result = await inplaySnapshotApiClient.getLivescores(requestDto);

      expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetLivescoreRequest);
      expect(result).toBe(expectedResponse);
    });

    it('should propagate mapper errors', async () => {
      const requestDto = new GetLivescoreRequestDto();
      const error = new Error('Mapping Error');
      mockMapper.map.mockImplementation(() => {
        throw error;
      });

      await expect(inplaySnapshotApiClient.getLivescores(requestDto)).rejects.toThrow(error);
      expect(mockPostRequest).not.toHaveBeenCalled();
    });

    it('should handle null response', async () => {
      const requestDto = new GetLivescoreRequestDto();
      mockMapper.map.mockReturnValue(new GetLivescoreRequest());
      mockPostRequest.mockResolvedValue(null);

      const result = await inplaySnapshotApiClient.getLivescores(requestDto);

      expect(result).toBeNull();
    });

    it('should use correct route for livescores', async () => {
      const requestDto = new GetLivescoreRequestDto();
      mockMapper.map.mockReturnValue(new GetLivescoreRequest());
      mockPostRequest.mockResolvedValue(new GetLivescoreResultElement());

      await inplaySnapshotApiClient.getLivescores(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Inplay/GetScores',
        responseBodyType: GetLivescoreResultElement,
        requestBody: expect.any(GetLivescoreRequest),
      });
    });
  });

  describe('getFixtureMarkets', () => {
    it('should successfully call getFixtureMarkets with valid request', async () => {
      const requestDto = new GetMarketRequestDto();
      const mappedRequest = new GetMarketRequest();
      const expectedResponse = new GetFixtureMarketsResultElement();

      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(expectedResponse);

      const result = await inplaySnapshotApiClient.getFixtureMarkets(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should handle empty response data', async () => {
      const requestDto = new GetMarketRequestDto();
      const emptyResponse = new GetFixtureMarketsResultElement();
      emptyResponse.data = [];

      mockMapper.map.mockReturnValue(new GetMarketRequest());
      mockPostRequest.mockResolvedValue(emptyResponse);

      const result = await inplaySnapshotApiClient.getFixtureMarkets(requestDto);

      expect(result?.data).toEqual([]);
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetMarketRequestDto();
      const error = new HttpResponseError('Network Error');
      mockMapper.map.mockReturnValue(new GetMarketRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(inplaySnapshotApiClient.getFixtureMarkets(requestDto)).rejects.toThrow(error);
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetMarketRequestDto();
      mockMapper.map.mockReturnValue(new GetMarketRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await inplaySnapshotApiClient.getFixtureMarkets(requestDto);

      expect(result).toBeUndefined();
    });
  });

  describe('getEvents', () => {
    it('should successfully call getEvents with valid request', async () => {
      const requestDto = new GetInPlayEventRequestDto();
      const mappedRequest = new GetInPlayEventRequest();
      const expectedResponse = new GetEventsResultElement();

      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(expectedResponse);

      const result = await inplaySnapshotApiClient.getEvents(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should use correct route for events', async () => {
      const requestDto = new GetInPlayEventRequestDto();
      mockMapper.map.mockReturnValue(new GetInPlayEventRequest());
      mockPostRequest.mockResolvedValue(new GetEventsResultElement());

      await inplaySnapshotApiClient.getEvents(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Inplay/GetEvents',
        responseBodyType: GetEventsResultElement,
        requestBody: expect.any(GetInPlayEventRequest),
      });
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetInPlayEventRequestDto();
      const error = new HttpResponseError('Server Error');
      mockMapper.map.mockReturnValue(new GetInPlayEventRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(inplaySnapshotApiClient.getEvents(requestDto)).rejects.toThrow(error);
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetInPlayEventRequestDto();
      mockMapper.map.mockReturnValue(new GetInPlayEventRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await inplaySnapshotApiClient.getEvents(requestDto);

      expect(result).toBeUndefined();
    });
  });

  // NEW OUTRIGHT ENDPOINTS TESTS

  describe('getOutrightLeagues', () => {
    it('should successfully call getOutrightLeagues with valid request', async () => {
      const requestDto = new GetOutrightLeaguesRequestDto();
      const mappedRequest = new GetOutrightLeaguesRequest();
      const expectedResponse = new GetOutrightLeaguesResultElement();

      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(expectedResponse);

      const result = await inplaySnapshotApiClient.getOutrightLeagues(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should use correct route for outright leagues', async () => {
      const requestDto = new GetOutrightLeaguesRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLeaguesRequest());
      mockPostRequest.mockResolvedValue(new GetOutrightLeaguesResultElement());

      await inplaySnapshotApiClient.getOutrightLeagues(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Inplay/GetOutrightLeagues',
        responseBodyType: GetOutrightLeaguesResultElement,
        requestBody: expect.any(GetOutrightLeaguesRequest),
      });
    });

    it('should handle mapper transformation correctly', async () => {
      const requestDto = new GetOutrightLeaguesRequestDto();
      const mappedRequest = new GetOutrightLeaguesRequest();
      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(new GetOutrightLeaguesResultElement());

      await inplaySnapshotApiClient.getOutrightLeagues(requestDto);

      expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetOutrightLeaguesRequest);
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetOutrightLeaguesRequestDto();
      const error = new HttpResponseError('Outright Leagues Error');
      mockMapper.map.mockReturnValue(new GetOutrightLeaguesRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(inplaySnapshotApiClient.getOutrightLeagues(requestDto)).rejects.toThrow(error);
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetOutrightLeaguesRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLeaguesRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await inplaySnapshotApiClient.getOutrightLeagues(requestDto);

      expect(result).toBeUndefined();
    });
  });

  describe('getOutrightLeagueMarkets', () => {
    it('should successfully call getOutrightLeagueMarkets with valid request', async () => {
      const requestDto = new GetOutrightLeagueMarketRequestDto();
      const mappedRequest = new GetOutrightLeagueMarketRequest();
      const expectedResponse = new GetOutrightLeagueMarketsResultElement();

      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(expectedResponse);

      const result = await inplaySnapshotApiClient.getOutrightLeagueMarkets(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should use correct route for outright league markets', async () => {
      const requestDto = new GetOutrightLeagueMarketRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLeagueMarketRequest());
      mockPostRequest.mockResolvedValue(new GetOutrightLeagueMarketsResultElement());

      await inplaySnapshotApiClient.getOutrightLeagueMarkets(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Inplay/GetOutrightLeagueMarkets',
        responseBodyType: GetOutrightLeagueMarketsResultElement,
        requestBody: expect.any(GetOutrightLeagueMarketRequest),
      });
    });

    it('should handle mapper transformation correctly', async () => {
      const requestDto = new GetOutrightLeagueMarketRequestDto();
      const mappedRequest = new GetOutrightLeagueMarketRequest();
      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(new GetOutrightLeagueMarketsResultElement());

      await inplaySnapshotApiClient.getOutrightLeagueMarkets(requestDto);

      expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetOutrightLeagueMarketRequest);
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetOutrightLeagueMarketRequestDto();
      const error = new HttpResponseError('Outright League Markets Error');
      mockMapper.map.mockReturnValue(new GetOutrightLeagueMarketRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(inplaySnapshotApiClient.getOutrightLeagueMarkets(requestDto)).rejects.toThrow(
        error,
      );
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetOutrightLeagueMarketRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLeagueMarketRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await inplaySnapshotApiClient.getOutrightLeagueMarkets(requestDto);

      expect(result).toBeUndefined();
    });
  });

  describe('getOutrightLeagueEvents', () => {
    it('should successfully call getOutrightLeagueEvents with valid request', async () => {
      const requestDto = new GetOutrightLeagueEventsRequestDto();
      const mappedRequest = new GetOutrightLeagueEventsRequest();
      const expectedResponse = new GetOutrightLeagueEventsResultElement();

      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(expectedResponse);

      const result = await inplaySnapshotApiClient.getOutrightLeagueEvents(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should use correct route for outright league events', async () => {
      const requestDto = new GetOutrightLeagueEventsRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLeagueEventsRequest());
      mockPostRequest.mockResolvedValue(new GetOutrightLeagueEventsResultElement());

      await inplaySnapshotApiClient.getOutrightLeagueEvents(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Inplay/GetOutrightLeagueEvents',
        responseBodyType: GetOutrightLeagueEventsResultElement,
        requestBody: expect.any(GetOutrightLeagueEventsRequest),
      });
    });

    it('should handle mapper transformation correctly', async () => {
      const requestDto = new GetOutrightLeagueEventsRequestDto();
      const mappedRequest = new GetOutrightLeagueEventsRequest();
      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(new GetOutrightLeagueEventsResultElement());

      await inplaySnapshotApiClient.getOutrightLeagueEvents(requestDto);

      expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetOutrightLeagueEventsRequest);
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetOutrightLeagueEventsRequestDto();
      const error = new HttpResponseError('Outright League Events Error');
      mockMapper.map.mockReturnValue(new GetOutrightLeagueEventsRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(inplaySnapshotApiClient.getOutrightLeagueEvents(requestDto)).rejects.toThrow(
        error,
      );
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetOutrightLeagueEventsRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLeagueEventsRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await inplaySnapshotApiClient.getOutrightLeagueEvents(requestDto);

      expect(result).toBeUndefined();
    });
  });
});

