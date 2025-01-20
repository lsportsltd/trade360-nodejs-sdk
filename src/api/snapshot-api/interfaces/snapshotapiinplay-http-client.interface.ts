import {
  GetFixtureRequestDto,
  GetInPlayEventRequestDto,
  GetLivescoreRequestDto,
  GetMarketRequestDto,
} from '@api/common/snapshot/dtos';
import { 
  GetEventsResultElement, 
  GetFixtureMarketsResultElement, 
  GetFixturesResultElement, 
  GetLivescoreResultElement 
} from '@api/common/snapshot';

/**
 * Interface for the In-Play Snapshot API client.
 */
/* eslint-disable no-unused-vars */
export interface InPlaySnapshotApiClient {
  getFixtures(_requestDto: GetFixtureRequestDto): Promise<GetFixturesResultElement | undefined>;
  getLivescores(_requestDto: GetLivescoreRequestDto): Promise<GetLivescoreResultElement | undefined>;
  getFixtureMarkets(_requestDto: GetMarketRequestDto): Promise<GetFixtureMarketsResultElement | undefined>;
  getEvents(_requestDto: GetInPlayEventRequestDto): Promise<GetEventsResultElement | undefined>;
}
