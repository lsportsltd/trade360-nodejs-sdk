import { Expose, Type } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';

/**
 * GetInPlayEventRequest class for sending request
 * to get event from the API. It extends the
 * HttpRequestDto class and contains the properties
 * for the request to get event from the API.
 * @param timestamp The timestamp of the snapshot in UTC
 * @param fromDate The start date for the snapshot in UTC
 * @param toDate The end date for the snapshot in UTC
 * @param sportIds The sport IDs to filter the event
 * @param locationIds The location IDs to filter the event
 * @param leagueIds The league IDs to filter the event
 * @param fixtureIds The fixture IDs to filter the event
 * @param marketIds The IDs of the markets
 * @returns GetInPlayEventRequest instance that
 * contains the properties for the request to get
 * event from the API.
 */

export class GetInPlayEventRequest extends HttpRequestDto {
  @Expose({ name: 'Timestamp' })
  @Type(() => Date)
  public timestamp!: Date;

  @Expose({ name: 'FromDate' })
  @Type(() => Date)
  public fromDate?: Date;

  @Expose({ name: 'ToDate' })
  @Type(() => Date)
  public toDate?: Date;

  @Expose()
  @Type(() => Number)
  sports?: number[];

  @Expose()
  @Type(() => Number)
  locations?: number[];

  @Expose()
  @Type(() => Number)
  leagues?: number[];

  @Expose()
  @Type(() => Number)
  fixtures?: number[];

  @Expose()
  @Type(() => Number)
  markets?: number[];
}
