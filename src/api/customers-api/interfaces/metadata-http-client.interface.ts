import {
  CompetitionCollectionResponse,
  FixturesMetadataCollectionResponse,
  GetCompetitionsRequestDto,
  GetFixturesMetadataRequestDto,
  GetLeaguesRequestDto,
  GetMarketsRequestDto,
  GetTranslationsRequestDto,
  LeaguesBodyStructure,
  LocationsBodyStructure,
  MarketBodyStructure,
  SportsBodyStructure,
  TranslationsCollectionResponse,
} from '@api/common';

/**
 * IPackageDistributionHttpClient interface is responsible
 * for sending requests to the distribution API. It contains
 * the methods for sending requests to the distribution API.
 */
export interface IMetadataHttpClient {
  getLocations(): Promise<LocationsBodyStructure[] | undefined>;
  getSports(): Promise<SportsBodyStructure[] | undefined>;
  getLeagues(requestDto: GetLeaguesRequestDto): Promise<LeaguesBodyStructure[] | undefined>;
  getMarkets(requestDto: GetMarketsRequestDto): Promise<MarketBodyStructure[] | undefined>;
  getTranslations(
    requestDto: GetTranslationsRequestDto,
  ): Promise<TranslationsCollectionResponse | undefined>;
  getCompetitions(
    requestDto: GetCompetitionsRequestDto,
  ): Promise<CompetitionCollectionResponse | undefined>;
  getFixturesMetadata(
    requestDto: GetFixturesMetadataRequestDto,
  ): Promise<FixturesMetadataCollectionResponse | undefined>;
}
