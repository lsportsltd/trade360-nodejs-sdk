import {
  CompetitionCollectionResponse,
  GetCompetitionsRequestDto,
  GetLeaguesRequestDto,
  GetMarketsRequestDto,
  GetTranslationsRequestDto,
  LeaguesBodyStructure,
  MarketBodyStructure,
  TranslationsCollectionResponse,
} from '@api/common';
import { Location, Sport } from '@lsports/entities';

/**
 * IPackageDistributionHttpClient interface is responsible
 * for sending requests to the distribution API. It contains
 * the methods for sending requests to the distribution API.
 */
export interface IMetadataHttpClient {
  getLocations(): Promise<Location[]>;
  getSports(): Promise<Sport[]>;
  getLeagues(requestDto: GetLeaguesRequestDto): Promise<LeaguesBodyStructure[]>;
  getMarkets(requestDto: GetMarketsRequestDto): Promise<MarketBodyStructure[]>;
  getTranslations(requestDto: GetTranslationsRequestDto): Promise<TranslationsCollectionResponse>;
  getCompetitions(requestDto: GetCompetitionsRequestDto): Promise<CompetitionCollectionResponse>;

  //   getFixtureMetadataAsync(
  //     requestDto: GetFixtureMetadataRequestDto,
  //   ): Promise<GetFixtureMetadataCollectionResponse>;
}
