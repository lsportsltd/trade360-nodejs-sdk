import { Expose, Type } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';

/**
 * GetInPlayEventRequest class for sending request
 * to get inplay event from the API. It extends the
 * HttpRequestDto class and contains the properties
 * for the request to get inplay event from the API.
 * @param timestamp The Unix timestamp of the snapshot (seconds since epoch)
 * @param fromDate The Unix timestamp for the start date of the snapshot (seconds since epoch)
 * @param toDate The Unix timestamp for the end date of the snapshot (seconds since epoch)
 * @param sports The sport IDs to filter the inplay event
 * @param locations The location IDs to filter the inplay event
 * @param leagues The league IDs to filter the inplay event
 * @param fixtures The fixture IDs to filter the inplay event
 * @param markets The IDs of the markets
 * @returns GetInPlayEventRequest instance that
 * contains the properties for the request to get
 * inplay event from the API.
 */

export class GetInPlayEventRequest extends HttpRequestDto {
  @Expose({ name: 'Timestamp' })
  @Type(() => Number)
  public timestamp!: number;

  @Expose({ name: 'FromDate' })
  @Type(() => Number)
  public fromDate?: number;

  @Expose({ name: 'ToDate' })
  @Type(() => Number)
  public toDate?: number;

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
