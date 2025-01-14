import { Expose, Type } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';

/**
 * GetMarketRequest class for sending request
 * to get market from the API. It extends the
 * HttpRequestDto class and contains the properties
 * for the request to get market from the API.
 * @param timestamp The timestamp of the snapshot in UTC
 * @param fromDate The start date for the snapshot in UTC
 * @param toDate The end date for the snapshot in UTC
 * @param sportIds The sport IDs to filter the market
 * @param locationIds The location IDs to filter the market
 * @param leagueIds The league IDs to filter the market
 * @param fixtureIds The fixture IDs to filter the market
 * @returns GetMarketRequest instance that
 * contains the properties for the request to get
 * market from the API.
 */

export class GetMarketRequest extends HttpRequestDto {
  @Expose({ name: 'timestamp' })
  @Type(() => Date)
  public timestamp!: Date;

  @Expose({ name: 'fromDate' })
  @Type(() => Date)
  public fromDate?: Date;

  @Expose({ name: 'toDate' })
  @Type(() => Date)
  public toDate?: Date;

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
  fixtureIds?: number[];
}
