import { Observable } from 'rxjs';
import { BaseEntity } from '@entities';
import { HttpRequestDto } from '@api/common';
import { Fixture, LivescoreEvent, MarketEvent } from '@lsports/entities';

export class GetFixturesRequest extends HttpRequestDto {
  sportIds?: number[];
  locationIds?: number[];
  leagueIds?: number[];
  fixtureIds?: number[];
  fromDate?: Date;
  toDate?: Date;
}

export class GetLivescoreRequest extends HttpRequestDto {
  fixtureIds?: number[];
}

export class GetMarketRequest extends HttpRequestDto {
  fixtureIds?: number[];
  marketIds?: number[];
}

export class GetInPlayEventRequest extends HttpRequestDto {
  fixtureIds?: number[];
  fromEventId?: number;
}

export class FixturesResponse implements BaseEntity {
  fixtures: Fixture[] = [];
  [key: string]: unknown;
}

export class LivescoreResponse implements BaseEntity {
  events: LivescoreEvent[] = [];
  [key: string]: unknown;
}

export class MarketsResponse implements BaseEntity {
  markets: MarketEvent[] = [];
  [key: string]: unknown;
}

export class EventsResponse implements BaseEntity {
  events: MarketEvent[] = [];
  [key: string]: unknown;
}

/**
 * Interface for the In-Play Snapshot API client.
 */
export interface ISnapshotApiClient {
  /**
   * Gets the fixtures based on the provided request.
   * @param request The request containing the parameters
   * @returns An Observable emitting the fixtures
   */
  getFixtures(request: GetFixturesRequest): Observable<FixturesResponse>;

  /**
   * Gets the live scores based on the provided request.
   * @param request The request containing the parameters
   * @returns An Observable emitting the live scores
   */
  getLivescore(request: GetLivescoreRequest): Observable<LivescoreResponse>;

  /**
   * Gets the fixture markets based on the provided request.
   * @param request The request containing the parameters
   * @returns An Observable emitting the fixture markets
   */
  getFixtureMarkets(request: GetMarketRequest): Observable<MarketsResponse>;

  /**
   * Gets the events based on the provided request.
   * @param request The request containing the parameters
   * @returns An Observable emitting the events
   */
  getEvents(request: GetInPlayEventRequest): Observable<EventsResponse>;
}
