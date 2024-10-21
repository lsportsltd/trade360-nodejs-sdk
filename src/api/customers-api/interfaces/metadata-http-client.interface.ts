import { Location, Sport } from '@entities';

/**
 * IPackageDistributionHttpClient interface is responsible
 * for sending requests to the distribution API.
 */
export interface IMetadataHttpClient {
  getLocations(): Promise<Location[]>;
  getSports(): Promise<Sport[]>;
  //   getLeaguesAsync(requestDto: GetLeaguesRequestDto): Promise<League[]>;
  //   getMarketsAsync(requestDto: GetMarketsRequestDto): Promise<Market[]>;
  //   getTranslationsAsync(requestDto: GetTranslationsRequestDto): Promise<TransactionResponse>;
  //   getCompetitionsAsync(
  //     requestDto: GetCompetitionsRequestDto,
  //   ): Promise<CompetitionCollectionResponse>;
  //   getFixtureMetadataAsync(
  //     requestDto: GetFixtureMetadataRequestDto,
  //   ): Promise<GetFixtureMetadataCollectionResponse>;
}
