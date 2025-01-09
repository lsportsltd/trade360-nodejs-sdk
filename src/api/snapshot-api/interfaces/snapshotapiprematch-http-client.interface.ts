import {
  GetEventsResultElement,
  GetFixtureMarketsResultElement,
  GetFixturesResultElement,
  GetLivescoreResultElement,
  GetOutrightEventsResultElement,
  GetOutrightFixtureResultElement,
  GetOutrightScoresResultElement,
  GetOutrightFixtureMarketsResultElement,
  GetOutrightLeagueMarketsResultElement,
  GetOutrightLeaguesResultElement
} from '@api/common/snapshot/responses';
import { GetEventRequestDto,
         GetFixtureRequestDto,
         GetLivescoreRequestDto, 
         GetMarketRequestDto, 
         GetOutrightEventRequestDto, 
         GetOutrightFixtureRequestDto, 
         GetOutrightLeagueMarketRequestDto, 
         GetOutrightLeaguesRequestDto, 
         GetOutrightLivescoreRequestDto, 
         GetOutrightMarketRequestDto } 
from '@api/common/snapshot/dtos';

/**
 * Interface for the In-Play Snapshot API client.
 */
export interface PreMatchSnapshotApiClient {
  getFixtures(
    requestDto: GetFixtureRequestDto,
  ): Promise<GetFixturesResultElement | undefined>;
  getLivescore(
    requestDto: GetLivescoreRequestDto,
  ): Promise<GetLivescoreResultElement | undefined>;
  getFixtureMarkets(
    requestDto: GetMarketRequestDto,
  ): Promise<GetFixtureMarketsResultElement | undefined>;
  getEvents(
    requestDto: GetEventRequestDto,
  ): Promise<GetEventsResultElement | undefined>;
  getOutrightEvents(
    requestDto: GetOutrightEventRequestDto,
  ): Promise<GetOutrightEventsResultElement | undefined>;
  getOutrightFixture(
    requestDto: GetOutrightFixtureRequestDto,
  ): Promise<GetOutrightFixtureResultElement | undefined>;
  getOutrightScores(
    requestDto: GetOutrightLivescoreRequestDto,
  ): Promise<GetOutrightScoresResultElement | undefined>;
  getOutrightFixtureMarkets(
    requestDto: GetOutrightMarketRequestDto,
  ): Promise<GetOutrightFixtureMarketsResultElement | undefined>;
  getOutrightLeagues(
    requestDto: GetOutrightLeaguesRequestDto,
  ): Promise<GetOutrightLeaguesResultElement | undefined>;
  getOutrightLeagueMarkets(
    requestDto: GetOutrightLeagueMarketRequestDto,
  ): Promise<GetOutrightLeagueMarketsResultElement | undefined>;
}