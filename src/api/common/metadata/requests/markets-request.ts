import { Expose, Type } from 'class-transformer';

import { HttpRequestDto } from '@api/common';
import { MarketType } from '@lsports/entities';

/**
 * GetMarketsRequest class for sending request to get markets
 * from the API. It extends the HttpRequestDto class and contains
 * the properties for the request to get markets from the API.
 * @param sportIds The sport IDs to filter the markets by in the
 * request to get markets from the API. The sport IDs are used to
 * @param locationIds The location IDs to filter the markets by in
 * the request to get markets from the API.
 * @param leagueIds The league IDs to filter the markets by in the
 * request to get markets from the API.
 * @param marketIds The market IDs to filter the markets by in the
 * request to get markets from the API.
 * @param isSettleable The flag to filter the markets by in the
 * request to get markets from the API. The filter meaning is
 * whether settlements is supported for this market and will be
 * provided for this market by LSports.
 * @param marketType The market type to filter the markets by in
 * the request to get markets from the API. Empty field returns
 * all leagues regardless of the market type.
 * @param languageId The language ID to filter the markets by in
 * the request to get markets from the API.
 * @returns GetMarketsRequest instance that contains the properties
 * for the request to get markets from the API.
 */
export class GetMarketsRequest extends HttpRequestDto {
  @Expose()
  @Type(() => Number)
  sportIds?: number[];

  @Expose()
  @Type(() => Number)
  locationIds?: number[];

  @Expose()
  @Type(() => Number)
  leagueIds?: number[];

  @Expose()
  @Type(() => Number)
  marketIds?: number[];

  @Expose()
  isSettleable?: boolean;

  @Expose()
  marketType?: MarketType;

  @Expose()
  languageId?: number;
}
