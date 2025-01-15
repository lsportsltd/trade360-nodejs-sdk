import {
  GetFixtureRequestDto,
  GetInPlayEventRequestDto,
  GetLivescoreRequestDto,
  GetMarketRequestDto,
} from '@api/common/snapshot/dtos';
import { EventBodyStructure } from '@api/common/body-entities/responses/event-body-structure';
import { FixtureEvent, LivescoreEvent, MarketEvent } from '@entities';

/**
 * Interface for the In-Play Snapshot API client.
 */
export interface InPlaySnapshotApiClient {
  getFixtures(requestDto: GetFixtureRequestDto): Promise<FixtureEvent[] | undefined>;
  getLivescores(requestDto: GetLivescoreRequestDto): Promise<LivescoreEvent[] | undefined>;
  getFixtureMarkets(requestDto: GetMarketRequestDto): Promise<MarketEvent[] | undefined>;
  getEvents(requestDto: GetInPlayEventRequestDto): Promise<EventBodyStructure[] | undefined>;
}
