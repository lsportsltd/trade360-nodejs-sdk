import { Observable, from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BaseHttpClient } from '@httpClient';
import { ILogger } from '@logger';
import { IHttpServiceConfig, SnapshotRoutesPrefixUrl } from '@api/common';
import { Fixture, LivescoreEvent, MarketEvent } from '@lsports/entities';
import {
  ISnapshotApiClient,
  GetFixturesRequest,
  GetLivescoreRequest,
  GetMarketRequest,
  GetInPlayEventRequest,
  FixturesResponse,
  LivescoreResponse,
  MarketsResponse,
  EventsResponse,
} from './interfaces/snapshot-api-client.interface';

/**
 * Implementation of the Snapshot API client.
 * @param config The HTTP service configuration
 * @returns A new instance of the Snapshot API client
 * @extends BaseHttpClient class for sending requests to the API
 * @implements ISnapshotApiClient interface for snapshot API operations
 */
export class SnapshotApiClient extends BaseHttpClient implements ISnapshotApiClient {
  constructor({ packageCredentials, customersApiBaseUrl, logger }: IHttpServiceConfig) {
    super({ customersApiBaseUrl, packageCredentials, logger });
  }

  /**
   * Gets the fixtures based on the provided request.
   * @param request The request containing the parameters
   * @returns An Observable emitting the fixtures
   */
  public getFixtures(request: GetFixturesRequest): Observable<FixturesResponse> {
    return from(
      this.postRequest<FixturesResponse>({
        route: SnapshotRoutesPrefixUrl.GET_FIXTURES_PREFIX_URL,
        responseBodyType: FixturesResponse,
        requestBody: request,
      }),
    ).pipe(filter((response): response is FixturesResponse => response !== undefined));
  }

  /**
   * Gets the live scores based on the provided request.
   * @param request The request containing the parameters
   * @returns An Observable emitting the live scores
   */
  public getLivescore(request: GetLivescoreRequest): Observable<LivescoreResponse> {
    return from(
      this.postRequest<LivescoreResponse>({
        route: SnapshotRoutesPrefixUrl.GET_SCORES_PREFIX_URL,
        responseBodyType: LivescoreResponse,
        requestBody: request,
      }),
    ).pipe(filter((response): response is LivescoreResponse => response !== undefined));
  }

  /**
   * Gets the fixture markets based on the provided request.
   * @param request The request containing the parameters
   * @returns An Observable emitting the fixture markets
   */
  public getFixtureMarkets(request: GetMarketRequest): Observable<MarketsResponse> {
    return from(
      this.postRequest<MarketsResponse>({
        route: SnapshotRoutesPrefixUrl.GET_FIXTURE_MARKETS_PREFIX_URL,
        responseBodyType: MarketsResponse,
        requestBody: request,
      }),
    ).pipe(filter((response): response is MarketsResponse => response !== undefined));
  }

  /**
   * Gets the events based on the provided request.
   * @param request The request containing the parameters
   * @returns An Observable emitting the events
   */
  public getEvents(request: GetInPlayEventRequest): Observable<EventsResponse> {
    return from(
      this.postRequest<EventsResponse>({
        route: SnapshotRoutesPrefixUrl.GET_EVENTS_PREFIX_URL,
        responseBodyType: EventsResponse,
        requestBody: request,
      }),
    ).pipe(filter((response): response is EventsResponse => response !== undefined));
  }
}
