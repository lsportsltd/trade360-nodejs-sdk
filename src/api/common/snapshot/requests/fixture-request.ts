import { Expose, Type } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';

/**
 * GetFixtureRequest class for sending request
 * to get fixture from the API. It extends the
 * HttpRequestDto class and contains the properties
 * for the request to get fixture from the API.
 * @param timestamp The timestamp of the snapshot in UTC
 * @param fromDate The start date for the snapshot in UTC
 * @param toDate The end date for the snapshot in UTC
 * @param sportIds The sport IDs to filter the fixture
 * @param locationIds The location IDs to filter the fixture
 * @param leagueIds The league IDs to filter the fixture
 * @param fixtureIds The fixture IDs to filter the fixture
 * @returns GetFixtureRequest instance that
 * contains the properties for the request to get
 * fixture from the API.
 */

export class GetFixtureRequest extends HttpRequestDto {
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
}
