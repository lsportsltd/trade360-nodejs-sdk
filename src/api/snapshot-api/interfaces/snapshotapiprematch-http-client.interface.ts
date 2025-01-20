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
import {
  GetEventsResultElement,
  GetFixtureMarketsResultElement,
  GetFixturesResultElement,
  GetLivescoreResultElement,
  GetOutrightEventsResultElement,
  GetOutrightFixtureMarketsResultElement,
  GetOutrightFixtureResultElement,
  GetOutrightLeagueMarketsResultElement,
  GetOutrightLeaguesResultElement,
  GetOutrightScoresResultElement,
} from '@api/common/snapshot';

/**
 * Interface for the In-Play Snapshot API client.
 */
/* eslint-disable no-unused-vars */
export interface PreMatchSnapshotApiClient {
  getFixtures(_requestDto: GetFixtureRequestDto): Promise<GetFixturesResultElement | undefined>;
  getLivescores(
    _requestDto: GetLivescoreRequestDto,
  ): Promise<GetLivescoreResultElement | undefined>;
  getFixtureMarkets(
    _requestDto: GetMarketRequestDto,
  ): Promise<GetFixtureMarketsResultElement | undefined>;
  getEvents(_requestDto: GetEventRequestDto): Promise<GetEventsResultElement | undefined>;
  getOutrightEvents(
    _requestDto: GetOutrightEventRequestDto,
  ): Promise<GetOutrightEventsResultElement | undefined>;
  getOutrightFixtures(
    _requestDto: GetOutrightFixtureRequestDto,
  ): Promise<GetOutrightFixtureResultElement | undefined>;
  getOutrightScores(
    _requestDto: GetOutrightLivescoreRequestDto,
  ): Promise<GetOutrightScoresResultElement | undefined>;
  getOutrightFixtureMarkets(
    _requestDto: GetOutrightMarketRequestDto,
  ): Promise<GetOutrightFixtureMarketsResultElement | undefined>;
  getOutrightLeagues(
    _requestDto: GetOutrightLeaguesRequestDto,
  ): Promise<GetOutrightLeaguesResultElement | undefined>;
  getOutrightLeagueMarkets(
    _requestDto: GetOutrightLeagueMarketRequestDto,
  ): Promise<GetOutrightLeagueMarketsResultElement | undefined>;
}
