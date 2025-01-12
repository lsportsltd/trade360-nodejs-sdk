import {
  GetEventsResultElement,
  GetFixtureMarketsResultElement,
  GetFixturesResultElement,
  GetLivescoreResultElement
} from '@api/common/snapshot/responses';
import { GetFixtureRequestDto, 
         GetInPlayEventRequestDto, 
         GetLivescoreRequestDto, 
         GetMarketRequestDto 
} from '@api/common/snapshot/dtos';

/**
 * Interface for the In-Play Snapshot API client.
 */
export interface InPlaySnapshotApiClient {
  getFixtures(
    requestDto: GetFixtureRequestDto,
  ): Promise<GetFixturesResultElement | undefined>;
  getLivescores(
    requestDto: GetLivescoreRequestDto,
  ): Promise<GetLivescoreResultElement | undefined>;
  getFixtureMarkets(
    requestDto: GetMarketRequestDto,
  ): Promise<GetFixtureMarketsResultElement | undefined>;
  getEvents(
    requestDto: GetInPlayEventRequestDto,
  ): Promise<GetEventsResultElement | undefined>;
}