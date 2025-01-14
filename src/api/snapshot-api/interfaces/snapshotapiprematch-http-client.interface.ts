import {
  GetEventRequestDto,
  GetFixtureRequestDto,
  GetLivescoreRequestDto,
  GetMarketRequestDto,
  GetOutrightEventRequestDto,
  GetOutrightFixtureRequestDto,
  GetOutrightLeagueMarketRequestDto,
  GetOutrightLeaguesRequestDto,
  GetOutrightLivescoreRequestDto,
  GetOutrightMarketRequestDto,
} from '@api/common/snapshot/dtos';
import { FixtureEvent, LivescoreEvent, MarketEvent } from '@entities';
import { EventBodyStructure } from '@api/common/body-entities/responses/event-body-structure';
import { OutrightEventBodyStructure } from '@api/common/body-entities/responses/outright-event-body-structure';
import { OutrightFixtureBodyStructure } from '@api/common/body-entities/responses/outright-fixture-body-structure';
import { OutrightScoreBodyStructure } from '@api/common/body-entities/responses/outright-score-body-structure';
import { OutrightFixtureMarketBodyStructure } from '@api/common/body-entities/responses/outright-fixture-market-body-structure';
import { OutrightLeagueBodyStructure } from '@api/common/body-entities/responses/outright-league-body-structure';
import { OutrightLeagueMarketBodyStructure } from '@api/common/body-entities/responses/outright-league-market-body-structure';


/**
 * Interface for the In-Play Snapshot API client.
 */
export interface PreMatchSnapshotApiClient {
  getFixtures(requestDto: GetFixtureRequestDto): Promise<FixtureEvent[] | undefined>;
  getLivescores(requestDto: GetLivescoreRequestDto): Promise<LivescoreEvent[] | undefined>;
  getFixtureMarkets(requestDto: GetMarketRequestDto,): Promise<MarketEvent[] | undefined>;
  getEvents(requestDto: GetEventRequestDto): Promise<EventBodyStructure[] | undefined>;
  getOutrightEvents(
    requestDto: GetOutrightEventRequestDto,
  ): Promise<OutrightEventBodyStructure[] | undefined>;
  getOutrightFixtures(
    requestDto: GetOutrightFixtureRequestDto,
  ): Promise<OutrightFixtureBodyStructure[] | undefined>;
  getOutrightScores(
    requestDto: GetOutrightLivescoreRequestDto,
  ): Promise<OutrightScoreBodyStructure[] | undefined>;
  getOutrightFixtureMarkets(
    requestDto: GetOutrightMarketRequestDto,
  ): Promise<OutrightFixtureMarketBodyStructure[] | undefined>;
  getOutrightLeagues(
    requestDto: GetOutrightLeaguesRequestDto,
  ): Promise<OutrightLeagueBodyStructure[] | undefined>;
  getOutrightLeagueMarkets(
    requestDto: GetOutrightLeagueMarketRequestDto,
  ): Promise<OutrightLeagueMarketBodyStructure[] | undefined>;
}
