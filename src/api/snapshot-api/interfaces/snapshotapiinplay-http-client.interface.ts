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
/* eslint-disable no-unused-vars */
export interface InPlaySnapshotApiClient {
  getFixtures(_requestDto: GetFixtureRequestDto): Promise<FixtureEvent[] | undefined>;
  getLivescores(_requestDto: GetLivescoreRequestDto): Promise<LivescoreEvent[] | undefined>;
  getFixtureMarkets(_requestDto: GetMarketRequestDto): Promise<MarketEvent[] | undefined>;
  getEvents(_requestDto: GetInPlayEventRequestDto): Promise<EventBodyStructure[] | undefined>;
}
