import {
  GetEventsResultElement,
  GetFixtureMarketsResultElement,
  GetFixturesResultElement,
  GetLivescoreResultElement
} from '@api/snapshot-api/responses';
import {
  GetFixtureRequest,
  GetInPlayEventRequest,
  GetLivescoreRequest,
  GetMarketRequest
} from '@api/snapshot-api/requests';

/**
 * Interface for the In-Play Snapshot API client.
 */
export interface InPlaySnapshotApiClient {
  getFixtures(requestDto: GetFixtureRequest): Promise<GetLivescoreResultElement[] | undefined>;
  getLivescore(requestDto:GetLivescoreRequest): Promise<GetFixturesResultElement[] | undefined>;
  getFixtureMarkets(requestDto: GetMarketRequest): Promise<GetFixtureMarketsResultElement[] | undefined> { return Promise.resolve([]); }
  getEvents(requestDto: GetInPlayEventRequest): Promise<GetEventsResultElement[] | undefined>;
}