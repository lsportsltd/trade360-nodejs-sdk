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
  getLocations(): Promise<LocationsBodyStructure[]>;
  getSports(): Promise<SportsBodyStructure[]>;
  getLeagues(requestDto: GetLeaguesRequestDto): Promise<LeaguesBodyStructure[]>;
  getMarkets(requestDto: GetMarketsRequestDto): Promise<MarketBodyStructure[]>;
  getTranslations(requestDto: GetTranslationsRequestDto): Promise<TranslationsCollectionResponse>;
  getCompetitions(requestDto: GetCompetitionsRequestDto): Promise<CompetitionCollectionResponse>;
  getFixturesMetadata(
    requestDto: GetFixturesMetadataRequestDto,
  ): Promise<FixturesMetadataCollectionResponse>;
}
