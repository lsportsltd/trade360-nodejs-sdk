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
} from '@api/snapshot-api/responses';
import {
  GetFixtureRequest,
  GetLiveScoreRequest,
  GetMarketRequest,
  GetEventRequest,
  GetOutrightEventRequest,
  GetOutrightLivescoreRequest,
  GetOutrightMarketRequest,

} from '@api/snapshot-api/requests';

/**
 * Interface for the In-Play Snapshot API client.
 */
export interface PreMatchSnapshotApiClient {
  getFixtures(requestDto:GetFixtureRequest): Promise<GetLivescoreResultElement[] | undefined>;
  getLivescore(requestDto:GetLivescoreRequest): Promise<GetFixturesResultElement[] | undefined>;
  getFixtureMarkets(requestDto: GetMarketRequest): Promise<GetFixtureMarketsResultElement[] | undefined>;
  getEvents(requestDto: GetEventRequest): Promise<GetEventsResultElement[] | undefined>;
  getOutrightEvents(requestDto: GetOutrightEventRequest): Promise<GetOutrightEventsResultElement[] | undefined>;
  getOutrightFixture(requestDto: GetOutrightFixtureRequest): Promise<GetOutrightFixtureResultElement[] | undefined>;
  getOutrightScores(requestDto: GetOutrightLivescoreRequest): Promise<GetOutrightScoresResultElement[] | undefined>;
  getOutrightFixtureMarkets(requestDto: GetOutrightMarketRequest): Promise<GetOutrightFixtureMarketsResultElement[] | undefined>;
  getOutrightLeagues(requestDto: GetOutrightLeaguesRequest): Promise<GetOutrightLeaguesResultElement[] | undefined>;
  getOutrightLeagueMarkets(requestDto: GetOutrightLeagueMarketRequest): Promise<GetOutrightLeagueMarketsResultElement[] | undefined>;
}