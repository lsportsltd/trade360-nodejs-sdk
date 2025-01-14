import { Expose, Type } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';

/**
 * GetEventRequest class for sending request
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
 * @returns GetEventRequest instance that
 * contains the properties for the request to get
 * event from the API.
 */

export class GetEventRequest extends HttpRequestDto {
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
