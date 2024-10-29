import { GetLeaguesRequestDto, LeaguesBodyStructure } from '@api/common';
import { Location, Sport } from '@entities';

/**
 * IPackageDistributionHttpClient interface is responsible
 * for sending requests to the distribution API. It contains
 * the methods for sending requests to the distribution API.
 */
export interface IMetadataHttpClient {
  getLocations(): Promise<Location[]>;
  getSports(): Promise<Sport[]>;
  getLeagues(requestDto: GetLeaguesRequestDto): Promise<LeaguesBodyStructure[]>;

  //   getMarketsAsync(requestDto: GetMarketsRequestDto): Promise<Market[]>;
  //   getTranslationsAsync(requestDto: GetTranslationsRequestDto): Promise<TransactionResponse>;
  //   getCompetitionsAsync(
  //     requestDto: GetCompetitionsRequestDto,
  //   ): Promise<CompetitionCollectionResponse>;
  //   getFixtureMetadataAsync(
  //     requestDto: GetFixtureMetadataRequestDto,
  //   ): Promise<GetFixtureMetadataCollectionResponse>;
}
