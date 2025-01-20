import { IHttpServiceConfig, IMapper } from '@api/common';
import { PrematchSnapshotApiClientPrefixUrl } from '@api/snapshot-api/enums';
import { PreMatchSnapshotApiClient } from '@api/snapshot-api/interfaces';
import { BaseHttpClient } from '@httpClient';
import {
  GetEventsResultElement,
  GetFixtureMarketsResultElement,
  GetFixturesResultElement,
  GetLivescoreResultElement,
  GetOutrightEventsResultElement,
  GetOutrightFixtureMarketsResultElement,
  GetOutrightFixtureResultElement,
  GetOutrightLeagueMarketsResultElement,
  GetOutrightLeaguesResultElement,
  GetOutrightScoresResultElement,
} from '@api/common/snapshot/responses';
import {
  GetFixtureRequest,
  GetEventRequest,
  GetLivescoreRequest,
  GetMarketRequest,
  GetOutrightEventRequest,
  GetOutrightFixtureRequest,
  GetOutrightLeagueMarketRequest,
  GetOutrightLeaguesRequest,
  GetOutrightLivescoreRequest,
  GetOutrightMarketRequest,
} from '@api/common/snapshot/requests';
import {
  GetFixtureRequestDto,
  GetEventRequestDto,
  GetLivescoreRequestDto,
  GetMarketRequestDto,
  GetOutrightEventRequestDto,
  GetOutrightFixtureRequestDto,
  GetOutrightLeagueMarketRequestDto,
  GetOutrightLeaguesRequestDto,
  GetOutrightLivescoreRequestDto,
  GetOutrightMarketRequestDto,
} from '@api/common/snapshot/dtos';

const {
  GET_EVENTS_PREFIX_URL,
  GET_FIXTURE_MARKETS_PREFIX_URL,
  GET_FIXTURES_PREFIX_URL,
  GET_SCORES_PREFIX_URL,
  GET_OUTRGIHT_EVENT_PREFIX_URL,
  GET_OUTRIGHT_FIXTURE_MARKETS_PREFIX_URL,
  GET_OUTRIGHT_FIXTURE_PREFIX_URL,
  GET_OUTRIGHT_LEAGUES_MARKETS_PREFIX_URL,
  GET_OUTRIGHT_LEAGUES_PREFIX_URL,
  GET_OUTRIGHT_SCORES_PREFIX_URL,
} = PrematchSnapshotApiClientPrefixUrl;
/**
 * MetadataHttpClient class is responsible for sending requests
 * to the metadata API. It extends the BaseHttpClient class and
 * contains the logic for sending requests to the metadata API.
 * @param packageCredentials The package credentials for the API
 * @param snapshotApiBaseUrl The base URL of the snapshot API
 * @param logger The logger instance
 * @param mapper The mapper instance
 * @returns MetadataHttpClient instance that is responsible for
 * sending requests to the metadata API.
 * @extends BaseHttpClient class for sending requests to the
 * customers API.
 * @implements IMetadataHttpClient interface for sending
 * requests to the metadata API.
 * @see BaseHttpClient class for sending requests to the
 * customers API.
 * @see IMetadataHttpClient interface for sending requests to
 * the metadata API.
 * @see IHttpServiceConfig interface for the configuration of
 * the HTTP service.
 */
export class PreMatchSnapshotApiClientImplementation
  extends BaseHttpClient
  implements PreMatchSnapshotApiClient
{
  private readonly mapper: IMapper;

  constructor({ packageCredentials, restApiBaseUrl, logger }: IHttpServiceConfig, mapper: IMapper) {
    super({ restApiBaseUrl, packageCredentials, logger });
    this.mapper = mapper;
  }

  /**
   * Sends a request to the snapshot API to get fixtures.
   * @param requestDto The request DTO for getting fixtures.
   * @returns A promise that resolves to a
   * GetFixturesResultElement object containing the fixtures information.
   */
  public async getFixtures(
    requestDto: GetFixtureRequestDto,
  ): Promise<GetFixturesResultElement | undefined> {
    const request = this.mapper.map<GetFixtureRequestDto, GetFixtureRequest>(
      requestDto,
      GetFixtureRequest,
    );

    const fixturesCollection = await this.postRequest<GetFixturesResultElement>({
      route: GET_FIXTURES_PREFIX_URL,
      responseBodyType: GetFixturesResultElement,
      requestBody: request,
    });

    return fixturesCollection;
  }

  /**
   * Sends a request to the snapshot API to get livescores.
   * @param requestDto The request DTO for getting livescores.
   * @returns A promise that resolves to a
   * GetLivescoreResultElement object containing the livescores information.
   */
  public async getLivescores(
    requestDto: GetLivescoreRequestDto,
  ): Promise<GetLivescoreResultElement | undefined> {
    const request = this.mapper.map<GetLivescoreRequestDto, GetLivescoreRequest>(
      requestDto,
      GetLivescoreRequest,
    );

    const scoresCollection = await this.postRequest<GetLivescoreResultElement>({
      route: GET_SCORES_PREFIX_URL,
      responseBodyType: GetLivescoreResultElement,
      requestBody: request,
    });
    return scoresCollection;
  }

  /**
   * Sends a request to the snapshot API to get fixtures markets.
   * @param requestDto The request DTO for getting fixtures markets.
   * @returns A promise that resolves to a
   * GetFixtureMarketsResultElement object containing the fixtures
   * markets information.
   */
  public async getFixtureMarkets(
    requestDto: GetMarketRequestDto,
  ): Promise<GetFixtureMarketsResultElement | undefined> {
    const request = this.mapper.map<GetMarketRequestDto, GetMarketRequest>(
      requestDto,
      GetMarketRequest,
    );

    const marketsCollection = await this.postRequest<GetFixtureMarketsResultElement>({
      route: GET_FIXTURE_MARKETS_PREFIX_URL,
      responseBodyType: GetFixtureMarketsResultElement,
      requestBody: request,
    });
    return marketsCollection;
  }

  /**
   * Sends a request to the snapshot API to get events.
   * @param requestDto The request DTO for getting events.
   * @returns A promise that resolves to a
   * GetEventsResultElement object containing the events information.
   */
  public async getEvents(
    requestDto: GetEventRequestDto,
  ): Promise<GetEventsResultElement | undefined> {
    const request = this.mapper.map<GetEventRequestDto, GetEventRequest>(
      requestDto,
      GetEventRequest,
    );

    const eventsCollection = await this.postRequest<GetEventsResultElement>({
      route: GET_EVENTS_PREFIX_URL,
      responseBodyType: GetEventsResultElement,
      requestBody: request,
    });
    return eventsCollection;
  }

  /**
   * Sends a request to the snapshot API to get outright events.
   * @param requestDto The request DTO for getting outright events.
   * @returns A promise that resolves to a
   * GetOutrightEventsResultElement object containing the outright events information.
   */
  public async getOutrightEvents(
    requestDto: GetOutrightEventRequestDto,
  ): Promise<GetOutrightEventsResultElement | undefined> {
    const request = this.mapper.map<GetOutrightEventRequestDto, GetOutrightEventRequest>(
      requestDto,
      GetOutrightEventRequest,
    );

    const eventsCollection = await this.postRequest<GetOutrightEventsResultElement>({
      route: GET_OUTRGIHT_EVENT_PREFIX_URL,
      responseBodyType: GetOutrightEventsResultElement,
      requestBody: request,
    });
    return eventsCollection;
  }

  /**
   * Sends a request to the snapshot API to get outright fixtures.
   * @param requestDto The request DTO for getting outright fixtures.
   * @returns A promise that resolves to a
   * GetOutrightFixtureResultElement object containing the outright fixtures information.
   */
  public async getOutrightFixtures(
    requestDto: GetOutrightFixtureRequestDto,
  ): Promise<GetOutrightFixtureResultElement | undefined> {
    const request = this.mapper.map<GetOutrightFixtureRequestDto, GetOutrightFixtureRequest>(
      requestDto,
      GetOutrightFixtureRequest,
    );

    const fixturesCollection = await this.postRequest<GetOutrightFixtureResultElement>({
      route: GET_OUTRIGHT_FIXTURE_PREFIX_URL,
      responseBodyType: GetOutrightFixtureResultElement,
      requestBody: request,
    });
    return fixturesCollection;
  }

  /**
   * Sends a request to the snapshot API to get outright scores.
   * @param requestDto The request DTO for getting outright scores.
   * @returns A promise that resolves to a
   * GetOutrightScoresResultElement object containing the outright scores information.
   */
  public async getOutrightScores(
    requestDto: GetOutrightLivescoreRequestDto,
  ): Promise<GetOutrightScoresResultElement | undefined> {
    const request = this.mapper.map<GetOutrightLivescoreRequestDto, GetOutrightLivescoreRequest>(
      requestDto,
      GetOutrightLivescoreRequest,
    );

    const scoresCollection = await this.postRequest<GetOutrightScoresResultElement>({
      route: GET_OUTRIGHT_SCORES_PREFIX_URL,
      responseBodyType: GetOutrightScoresResultElement,
      requestBody: request,
    });
    return scoresCollection;
  }

  /**
   * Sends a request to the snapshot API to get outright fixture markets.
   * @param requestDto The request DTO for getting outright fixture markets.
   * @returns A promise that resolves to a
   * GetOutrightFixtureMarketsResultElement object containing the outright fixture markets information.
   */
  public async getOutrightFixtureMarkets(
    requestDto: GetOutrightMarketRequestDto,
  ): Promise<GetOutrightFixtureMarketsResultElement | undefined> {
    const request = this.mapper.map<GetOutrightMarketRequestDto, GetOutrightMarketRequest>(
      requestDto,
      GetOutrightMarketRequest,
    );

    const marketsCollection = await this.postRequest<GetOutrightFixtureMarketsResultElement>({
      route: GET_OUTRIGHT_FIXTURE_MARKETS_PREFIX_URL,
      responseBodyType: GetOutrightFixtureMarketsResultElement,
      requestBody: request,
    });
    return marketsCollection;
  }

  /**
   * Sends a request to the snapshot API to get outright leagues.
   * @param requestDto The request DTO for getting outright leagues.
   * @returns A promise that resolves to a
   * GetOutrightLeaguesResultElement object containing the outright leagues information.
   */
  public async getOutrightLeagues(
    requestDto: GetOutrightLeaguesRequestDto,
  ): Promise<GetOutrightLeaguesResultElement | undefined> {
    const request = this.mapper.map<GetOutrightLeaguesRequestDto, GetOutrightLeaguesRequest>(
      requestDto,
      GetOutrightLeaguesRequest,
    );

    const leaguesCollection = await this.postRequest<GetOutrightLeaguesResultElement>({
      route: GET_OUTRIGHT_LEAGUES_PREFIX_URL,
      responseBodyType: GetOutrightLeaguesResultElement,
      requestBody: request,
    });
    return leaguesCollection;
  }

  /**
   * Sends a request to the snapshot API to get outright league markets.
   * @param requestDto The request DTO for getting outright leagues markets.
   * @returns A promise that resolves to a
   * GetOutrightLeagueMarketsResultElement object containing the outright leagues markets information.
   */
  public async getOutrightLeagueMarkets(
    requestDto: GetOutrightLeagueMarketRequestDto,
  ): Promise<GetOutrightLeagueMarketsResultElement | undefined> {
    const request = this.mapper.map<
      GetOutrightLeagueMarketRequestDto,
      GetOutrightLeagueMarketRequest
    >(requestDto, GetOutrightLeagueMarketRequest);

    const leagueMarketsCollection = await this.postRequest<GetOutrightLeagueMarketsResultElement>({
      route: GET_OUTRIGHT_LEAGUES_MARKETS_PREFIX_URL,
      responseBodyType: GetOutrightLeagueMarketsResultElement,
      requestBody: request,
    });
    return leagueMarketsCollection;
  }
}
