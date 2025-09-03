/* eslint-env jest */
import {
  GetEventRequestDto,
  GetFixtureRequestDto,
  GetLivescoreRequestDto,
  GetMarketRequestDto,
  GetOutrightEventRequestDto,
  GetOutrightFixtureRequestDto,
  GetOutrightLeagueMarketRequestDto,
  GetOutrightLeagueEventsRequestDto,
  GetOutrightLeaguesRequestDto,
  GetOutrightLivescoreRequestDto,
  GetOutrightMarketRequestDto,
} from '@api/common/snapshot/dtos';
import { IMapper } from '@api/common/interfaces/mapper.interface';
import {
  GetEventRequest,
  GetFixtureRequest,
  GetLivescoreRequest,
  GetMarketRequest,
  GetOutrightEventRequest,
  GetOutrightFixtureRequest,
  GetOutrightLeagueMarketRequest,
  GetOutrightLeagueEventsRequest,
  GetOutrightLeaguesRequest,
  GetOutrightLivescoreRequest,
  GetOutrightMarketRequest,
} from '@api/common/snapshot/requests';
import {
  GetEventsResultElement,
  GetFixtureMarketsResultElement,
  GetFixturesResultElement,
  GetLivescoreResultElement,
  GetOutrightEventsResultElement,
  GetOutrightFixtureMarketsResultElement,
  GetOutrightFixtureResultElement,
  GetOutrightLeagueMarketsResultElement,
  GetOutrightLeagueEventsResultElement,
  GetOutrightLeaguesResultElement,
  GetOutrightScoresResultElement,
} from '@api/common/snapshot/responses';
import { HttpResponseError } from '@lsports/errors';
import { PreMatchSnapshotApiClient } from '@api/snapshot-api/interfaces';

// Mock dependencies
class MockMapper implements Partial<IMapper> {
  map = jest.fn();
}

// Since PreMatchSnapshotApiClientImplementation extends BaseHttpClient, we need to mock the base functionality
jest.mock('@httpClient/base-http-client', () => {
  return {
    BaseHttpClient: jest.fn().mockImplementation(() => {
      return {
        postRequest: jest.fn(),
      };
    }),
  };
});

describe('PreMatchSnapshotApiClientImplementation', () => {
  let prematchSnapshotApiClient: PreMatchSnapshotApiClient;
  let mockMapper: MockMapper;
  let mockPostRequest: jest.Mock;

  beforeEach(() => {
    mockMapper = new MockMapper();
    mockPostRequest = jest.fn();
    prematchSnapshotApiClient = {
      getFixtures: jest.fn(async (requestDto: GetFixtureRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetFixtureRequest);
        return mockPostRequest({
          route: '/Prematch/GetFixtures',
          responseBodyType: GetFixturesResultElement,
          requestBody: mappedRequest,
        });
      }),
      getLivescores: jest.fn(async (requestDto: GetLivescoreRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetLivescoreRequest);
        return mockPostRequest({
          route: '/Prematch/GetScores',
          responseBodyType: GetLivescoreResultElement,
          requestBody: mappedRequest,
        });
      }),
      getFixtureMarkets: jest.fn(async (requestDto: GetMarketRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetMarketRequest);
        return mockPostRequest({
          route: '/Prematch/GetFixtureMarkets',
          responseBodyType: GetFixtureMarketsResultElement,
          requestBody: mappedRequest,
        });
      }),
      getEvents: jest.fn(async (requestDto: GetEventRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetEventRequest);
        return mockPostRequest({
          route: '/Prematch/GetEvents',
          responseBodyType: GetEventsResultElement,
          requestBody: mappedRequest,
        });
      }),
      getOutrightEvents: jest.fn(async (requestDto: GetOutrightEventRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetOutrightEventRequest);
        return mockPostRequest({
          route: '/Prematch/GetOutrightEvents',
          responseBodyType: GetOutrightEventsResultElement,
          requestBody: mappedRequest,
        });
      }),
      getOutrightFixtures: jest.fn(async (requestDto: GetOutrightFixtureRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetOutrightFixtureRequest);
        return mockPostRequest({
          route: '/Prematch/GetOutrightFixture',
          responseBodyType: GetOutrightFixtureResultElement,
          requestBody: mappedRequest,
        });
      }),
      getOutrightScores: jest.fn(async (requestDto: GetOutrightLivescoreRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetOutrightLivescoreRequest);
        return mockPostRequest({
          route: '/Prematch/GetOutrightScores',
          responseBodyType: GetOutrightScoresResultElement,
          requestBody: mappedRequest,
        });
      }),
      getOutrightFixtureMarkets: jest.fn(async (requestDto: GetOutrightMarketRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetOutrightMarketRequest);
        return mockPostRequest({
          route: '/Prematch/GetOutrightFixtureMarkets',
          responseBodyType: GetOutrightFixtureMarketsResultElement,
          requestBody: mappedRequest,
        });
      }),
      getOutrightLeagues: jest.fn(async (requestDto: GetOutrightLeaguesRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetOutrightLeaguesRequest);
        return mockPostRequest({
          route: '/Prematch/GetOutrightLeagues',
          responseBodyType: GetOutrightLeaguesResultElement,
          requestBody: mappedRequest,
        });
      }),
      getOutrightLeagueMarkets: jest.fn(async (requestDto: GetOutrightLeagueMarketRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetOutrightLeagueMarketRequest);
        return mockPostRequest({
          route: '/Prematch/GetOutrightLeagueMarkets',
          responseBodyType: GetOutrightLeagueMarketsResultElement,
          requestBody: mappedRequest,
        });
      }),
      getOutrightLeagueEvents: jest.fn(async (requestDto: GetOutrightLeagueEventsRequestDto) => {
        const mappedRequest = mockMapper.map(requestDto, GetOutrightLeagueEventsRequest);
        return mockPostRequest({
          route: '/Prematch/GetOutrightLeagueEvents',
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

      const result = await prematchSnapshotApiClient.getFixtures(requestDto);

      expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetFixtureRequest);
      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Prematch/GetFixtures',
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

      await prematchSnapshotApiClient.getFixtures(requestDto);

      expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetFixtureRequest);
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetFixtureRequestDto();
      const error = new HttpResponseError('API Error');
      mockMapper.map.mockReturnValue(new GetFixtureRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(prematchSnapshotApiClient.getFixtures(requestDto)).rejects.toThrow(error);
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetFixtureRequestDto();
      mockMapper.map.mockReturnValue(new GetFixtureRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await prematchSnapshotApiClient.getFixtures(requestDto);

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

      const result = await prematchSnapshotApiClient.getLivescores(requestDto);

      expect(mockMapper.map).toHaveBeenCalledWith(requestDto, GetLivescoreRequest);
      expect(result).toBe(expectedResponse);
    });

    it('should propagate mapper errors', async () => {
      const requestDto = new GetLivescoreRequestDto();
      const error = new Error('Mapping Error');
      mockMapper.map.mockImplementation(() => {
        throw error;
      });

      await expect(prematchSnapshotApiClient.getLivescores(requestDto)).rejects.toThrow(error);
      expect(mockPostRequest).not.toHaveBeenCalled();
    });

    it('should handle null response', async () => {
      const requestDto = new GetLivescoreRequestDto();
      mockMapper.map.mockReturnValue(new GetLivescoreRequest());
      mockPostRequest.mockResolvedValue(null);

      const result = await prematchSnapshotApiClient.getLivescores(requestDto);

      expect(result).toBeNull();
    });

    it('should use correct route for livescores', async () => {
      const requestDto = new GetLivescoreRequestDto();
      mockMapper.map.mockReturnValue(new GetLivescoreRequest());
      mockPostRequest.mockResolvedValue(new GetLivescoreResultElement());

      await prematchSnapshotApiClient.getLivescores(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Prematch/GetScores',
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

      const result = await prematchSnapshotApiClient.getFixtureMarkets(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should handle empty response data', async () => {
      const requestDto = new GetMarketRequestDto();
      const emptyResponse = new GetFixtureMarketsResultElement();
      emptyResponse.data = [];

      mockMapper.map.mockReturnValue(new GetMarketRequest());
      mockPostRequest.mockResolvedValue(emptyResponse);

      const result = await prematchSnapshotApiClient.getFixtureMarkets(requestDto);

      expect(result?.data).toEqual([]);
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetMarketRequestDto();
      const error = new HttpResponseError('Network Error');
      mockMapper.map.mockReturnValue(new GetMarketRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(prematchSnapshotApiClient.getFixtureMarkets(requestDto)).rejects.toThrow(error);
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetMarketRequestDto();
      mockMapper.map.mockReturnValue(new GetMarketRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await prematchSnapshotApiClient.getFixtureMarkets(requestDto);

      expect(result).toBeUndefined();
    });
  });

  describe('getEvents', () => {
    it('should successfully call getEvents with valid request', async () => {
      const requestDto = new GetEventRequestDto();
      const mappedRequest = new GetEventRequest();
      const expectedResponse = new GetEventsResultElement();

      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(expectedResponse);

      const result = await prematchSnapshotApiClient.getEvents(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should use correct route for events', async () => {
      const requestDto = new GetEventRequestDto();
      mockMapper.map.mockReturnValue(new GetEventRequest());
      mockPostRequest.mockResolvedValue(new GetEventsResultElement());

      await prematchSnapshotApiClient.getEvents(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Prematch/GetEvents',
        responseBodyType: GetEventsResultElement,
        requestBody: expect.any(GetEventRequest),
      });
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetEventRequestDto();
      const error = new HttpResponseError('Server Error');
      mockMapper.map.mockReturnValue(new GetEventRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(prematchSnapshotApiClient.getEvents(requestDto)).rejects.toThrow(error);
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetEventRequestDto();
      mockMapper.map.mockReturnValue(new GetEventRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await prematchSnapshotApiClient.getEvents(requestDto);

      expect(result).toBeUndefined();
    });
  });

  // NEW OUTRIGHT ENDPOINTS TESTS

  describe('getOutrightEvents', () => {
    it('should successfully call getOutrightEvents with valid request', async () => {
      const requestDto = new GetOutrightEventRequestDto();
      const mappedRequest = new GetOutrightEventRequest();
      const expectedResponse = new GetOutrightEventsResultElement();

      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(expectedResponse);

      const result = await prematchSnapshotApiClient.getOutrightEvents(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should use correct route for outright events', async () => {
      const requestDto = new GetOutrightEventRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightEventRequest());
      mockPostRequest.mockResolvedValue(new GetOutrightEventsResultElement());

      await prematchSnapshotApiClient.getOutrightEvents(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Prematch/GetOutrightEvents',
        responseBodyType: GetOutrightEventsResultElement,
        requestBody: expect.any(GetOutrightEventRequest),
      });
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetOutrightEventRequestDto();
      const error = new HttpResponseError('Outright Events Error');
      mockMapper.map.mockReturnValue(new GetOutrightEventRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(prematchSnapshotApiClient.getOutrightEvents(requestDto)).rejects.toThrow(error);
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetOutrightEventRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightEventRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await prematchSnapshotApiClient.getOutrightEvents(requestDto);

      expect(result).toBeUndefined();
    });
  });

  describe('getOutrightFixtures', () => {
    it('should successfully call getOutrightFixtures with valid request', async () => {
      const requestDto = new GetOutrightFixtureRequestDto();
      const mappedRequest = new GetOutrightFixtureRequest();
      const expectedResponse = new GetOutrightFixtureResultElement();

      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(expectedResponse);

      const result = await prematchSnapshotApiClient.getOutrightFixtures(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should use correct route for outright fixtures', async () => {
      const requestDto = new GetOutrightFixtureRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightFixtureRequest());
      mockPostRequest.mockResolvedValue(new GetOutrightFixtureResultElement());

      await prematchSnapshotApiClient.getOutrightFixtures(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Prematch/GetOutrightFixture',
        responseBodyType: GetOutrightFixtureResultElement,
        requestBody: expect.any(GetOutrightFixtureRequest),
      });
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetOutrightFixtureRequestDto();
      const error = new HttpResponseError('Outright Fixtures Error');
      mockMapper.map.mockReturnValue(new GetOutrightFixtureRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(prematchSnapshotApiClient.getOutrightFixtures(requestDto)).rejects.toThrow(
        error,
      );
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetOutrightFixtureRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightFixtureRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await prematchSnapshotApiClient.getOutrightFixtures(requestDto);

      expect(result).toBeUndefined();
    });
  });

  describe('getOutrightScores', () => {
    it('should successfully call getOutrightScores with valid request', async () => {
      const requestDto = new GetOutrightLivescoreRequestDto();
      const mappedRequest = new GetOutrightLivescoreRequest();
      const expectedResponse = new GetOutrightScoresResultElement();

      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(expectedResponse);

      const result = await prematchSnapshotApiClient.getOutrightScores(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should use correct route for outright scores', async () => {
      const requestDto = new GetOutrightLivescoreRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLivescoreRequest());
      mockPostRequest.mockResolvedValue(new GetOutrightScoresResultElement());

      await prematchSnapshotApiClient.getOutrightScores(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Prematch/GetOutrightScores',
        responseBodyType: GetOutrightScoresResultElement,
        requestBody: expect.any(GetOutrightLivescoreRequest),
      });
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetOutrightLivescoreRequestDto();
      const error = new HttpResponseError('Outright Scores Error');
      mockMapper.map.mockReturnValue(new GetOutrightLivescoreRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(prematchSnapshotApiClient.getOutrightScores(requestDto)).rejects.toThrow(error);
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetOutrightLivescoreRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLivescoreRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await prematchSnapshotApiClient.getOutrightScores(requestDto);

      expect(result).toBeUndefined();
    });
  });

  describe('getOutrightFixtureMarkets', () => {
    it('should successfully call getOutrightFixtureMarkets with valid request', async () => {
      const requestDto = new GetOutrightMarketRequestDto();
      const mappedRequest = new GetOutrightMarketRequest();
      const expectedResponse = new GetOutrightFixtureMarketsResultElement();

      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(expectedResponse);

      const result = await prematchSnapshotApiClient.getOutrightFixtureMarkets(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should use correct route for outright fixture markets', async () => {
      const requestDto = new GetOutrightMarketRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightMarketRequest());
      mockPostRequest.mockResolvedValue(new GetOutrightFixtureMarketsResultElement());

      await prematchSnapshotApiClient.getOutrightFixtureMarkets(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Prematch/GetOutrightFixtureMarkets',
        responseBodyType: GetOutrightFixtureMarketsResultElement,
        requestBody: expect.any(GetOutrightMarketRequest),
      });
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetOutrightMarketRequestDto();
      const error = new HttpResponseError('Outright Fixture Markets Error');
      mockMapper.map.mockReturnValue(new GetOutrightMarketRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(prematchSnapshotApiClient.getOutrightFixtureMarkets(requestDto)).rejects.toThrow(
        error,
      );
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetOutrightMarketRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightMarketRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await prematchSnapshotApiClient.getOutrightFixtureMarkets(requestDto);

      expect(result).toBeUndefined();
    });
  });

  describe('getOutrightLeagues', () => {
    it('should successfully call getOutrightLeagues with valid request', async () => {
      const requestDto = new GetOutrightLeaguesRequestDto();
      const mappedRequest = new GetOutrightLeaguesRequest();
      const expectedResponse = new GetOutrightLeaguesResultElement();

      mockMapper.map.mockReturnValue(mappedRequest);
      mockPostRequest.mockResolvedValue(expectedResponse);

      const result = await prematchSnapshotApiClient.getOutrightLeagues(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should use correct route for outright leagues', async () => {
      const requestDto = new GetOutrightLeaguesRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLeaguesRequest());
      mockPostRequest.mockResolvedValue(new GetOutrightLeaguesResultElement());

      await prematchSnapshotApiClient.getOutrightLeagues(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Prematch/GetOutrightLeagues',
        responseBodyType: GetOutrightLeaguesResultElement,
        requestBody: expect.any(GetOutrightLeaguesRequest),
      });
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetOutrightLeaguesRequestDto();
      const error = new HttpResponseError('Outright Leagues Error');
      mockMapper.map.mockReturnValue(new GetOutrightLeaguesRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(prematchSnapshotApiClient.getOutrightLeagues(requestDto)).rejects.toThrow(error);
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetOutrightLeaguesRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLeaguesRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await prematchSnapshotApiClient.getOutrightLeagues(requestDto);

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

      const result = await prematchSnapshotApiClient.getOutrightLeagueMarkets(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should use correct route for outright league markets', async () => {
      const requestDto = new GetOutrightLeagueMarketRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLeagueMarketRequest());
      mockPostRequest.mockResolvedValue(new GetOutrightLeagueMarketsResultElement());

      await prematchSnapshotApiClient.getOutrightLeagueMarkets(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Prematch/GetOutrightLeagueMarkets',
        responseBodyType: GetOutrightLeagueMarketsResultElement,
        requestBody: expect.any(GetOutrightLeagueMarketRequest),
      });
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetOutrightLeagueMarketRequestDto();
      const error = new HttpResponseError('Outright League Markets Error');
      mockMapper.map.mockReturnValue(new GetOutrightLeagueMarketRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(prematchSnapshotApiClient.getOutrightLeagueMarkets(requestDto)).rejects.toThrow(
        error,
      );
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetOutrightLeagueMarketRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLeagueMarketRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await prematchSnapshotApiClient.getOutrightLeagueMarkets(requestDto);

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

      const result = await prematchSnapshotApiClient.getOutrightLeagueEvents(requestDto);

      expect(result).toBe(expectedResponse);
    });

    it('should use correct route for outright league events', async () => {
      const requestDto = new GetOutrightLeagueEventsRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLeagueEventsRequest());
      mockPostRequest.mockResolvedValue(new GetOutrightLeagueEventsResultElement());

      await prematchSnapshotApiClient.getOutrightLeagueEvents(requestDto);

      expect(mockPostRequest).toHaveBeenCalledWith({
        route: '/Prematch/GetOutrightLeagueEvents',
        responseBodyType: GetOutrightLeagueEventsResultElement,
        requestBody: expect.any(GetOutrightLeagueEventsRequest),
      });
    });

    it('should propagate HTTP errors', async () => {
      const requestDto = new GetOutrightLeagueEventsRequestDto();
      const error = new HttpResponseError('Outright League Events Error');
      mockMapper.map.mockReturnValue(new GetOutrightLeagueEventsRequest());
      mockPostRequest.mockRejectedValue(error);

      await expect(prematchSnapshotApiClient.getOutrightLeagueEvents(requestDto)).rejects.toThrow(
        error,
      );
    });

    it('should handle undefined response', async () => {
      const requestDto = new GetOutrightLeagueEventsRequestDto();
      mockMapper.map.mockReturnValue(new GetOutrightLeagueEventsRequest());
      mockPostRequest.mockResolvedValue(undefined);

      const result = await prematchSnapshotApiClient.getOutrightLeagueEvents(requestDto);

      expect(result).toBeUndefined();
    });
  });
});
