import { Expose, Type } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';

/**
 * GetOutrightLivescoreRequest class for sending request
 * to get outright livescore from the API. It extends the
 * HttpRequestDto class and contains the properties
 * for the request to get outright livescore from the API.
 * @param timestamp The Unix timestamp of the snapshot (seconds since epoch)
 * @param fromDate The Unix timestamp for the start date of the snapshot (seconds since epoch)
 * @param toDate The Unix timestamp for the end date of the snapshot (seconds since epoch)
 * @param sports The sport IDs to filter the outright livescore
 * @param locations The location IDs to filter the outright livescore
 * @param fixtures The fixture IDs to filter the outright livescore
 * @param tournaments The tournament IDs to filter the outright livescore
 * @returns GetOutrightLivescoreRequest instance that
 * contains the properties for the request to get
 * outright livescore from the API.
 */

export class GetOutrightLivescoreRequest extends HttpRequestDto {
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
  tournaments?: number[];

  @Expose()
  @Type(() => Number)
  fixtures?: number[];
}
