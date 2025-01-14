import { IHttpServiceConfig, IMapper } from '@api/common';
import { InplaySnapshotApiClientPrefixUrl } from '@api/snapshot-api/enums';
import { InPlaySnapshotApiClient } from '@api/snapshot-api/interfaces';
import { BaseHttpClient } from '@httpClient';
import {
  GetEventsResultElement,
  GetFixtureMarketsResultElement,
  GetFixturesResultElement,
  GetLivescoreResultElement,
} from '@api/common/snapshot/responses';
import {
  GetEventRequest,
  GetFixtureRequest,
  GetInPlayEventRequest,
  GetLivescoreRequest,
  GetMarketRequest,
} from '@api/common/snapshot/requests';
import {
  GetEventRequestDto,
  GetFixtureRequestDto,
  GetInPlayEventRequestDto,
  GetLivescoreRequestDto,
  GetMarketRequestDto,
} from '@api/common/snapshot/dtos';
import { EventBodyStructure } from '@api/common/body-entities/responses/event-body-structure';
import { FixtureEvent, LivescoreEvent, MarketEvent } from '@entities';

const {
  GET_EVENTS_PREFIX_URL,
  GET_FIXTURE_MARKETS_PREFIX_URL,
  GET_FIXTURES_PREFIX_URL,
  GET_SCORES_PREFIX_URL,
} = InplaySnapshotApiClientPrefixUrl;
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
export class InPlaySnapshotApiClientImplementation
  extends BaseHttpClient
  implements InPlaySnapshotApiClient
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
  ): Promise<FixtureEvent[] | undefined> {
    const request = this.mapper.map<GetFixtureRequestDto, GetFixtureRequest>(
      requestDto,
      GetFixtureRequest,
    );

    const fixturesCollection = await this.postRequest<GetFixturesResultElement>({
      route: GET_FIXTURES_PREFIX_URL,
      responseBodyType: GetFixturesResultElement,
      requestBody: request,
    });

    return fixturesCollection?.fixtures;
  }

  /**
   * Sends a request to the snapshot API to get livescores.
   * @param requestDto The request DTO for getting livescores.
   * @returns A promise that resolves to a
   * GetLivescoreResultElement object containing the livescores information.
   */
  public async getLivescores(
    requestDto: GetLivescoreRequestDto,
  ): Promise<LivescoreEvent[] | undefined> {
    const request = this.mapper.map<GetLivescoreRequestDto, GetLivescoreRequest>(
      requestDto,
      GetLivescoreRequest,
    );

    const scoresCollection = await this.postRequest<GetLivescoreResultElement>({
      route: GET_SCORES_PREFIX_URL,
      responseBodyType: GetLivescoreResultElement,
      requestBody: request,
    });
    return scoresCollection?.scores;
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
  ): Promise<MarketEvent[] | undefined> {
    const request = this.mapper.map<GetMarketRequestDto, GetMarketRequest>(
      requestDto,
      GetEventRequest,
    );

    const marketsCollection = await this.postRequest<GetFixtureMarketsResultElement>({
      route: GET_FIXTURE_MARKETS_PREFIX_URL,
      responseBodyType: GetFixtureMarketsResultElement,
      requestBody: request,
    });

    return marketsCollection?.markets;
  }

  /**
   * Sends a request to the snapshot API to get events.
   * @param requestDto The request DTO for getting events.
   * @returns A promise that resolves to a
   * GetEventsResultElement object containing the events information.
   */
  public async getEvents(
    requestDto: GetEventRequestDto,
  ): Promise<EventBodyStructure[] | undefined> {
    const request = this.mapper.map<GetInPlayEventRequestDto, GetInPlayEventRequest>(
      requestDto,
      GetInPlayEventRequest,
    );

    const eventsCollection = await this.postRequest<GetEventsResultElement>({
      route: GET_EVENTS_PREFIX_URL,
      responseBodyType: GetEventsResultElement,
      requestBody: request,
    });

    return eventsCollection?.events;
  }
}
