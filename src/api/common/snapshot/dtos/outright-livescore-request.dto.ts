import { Expose, Type, Transform } from 'class-transformer';
import moment, { Moment } from 'moment';
import { BaseEntity } from '@entities';
/**
 * GetOutrightLivescoreRequestDto class for sending request
 * to get outright livescore from the API.
 * @param timestamp The timestamp of the snapshot in UTC
 * @param fromDate The start date for the snapshot in UTC
 * @param toDate The end date for the snapshot in UTC
 * @param sportIds The sport IDs to filter the market
 * @param locationIds The location IDs to filter the market
 * @param tournamentsIds The IDs of the markets
 * @param fixtureIds The fixture IDs to filter the market
 * @returns GetOutrightLivescoreRequestDto instance that
 * contains the properties for the request to get
 * market from the API.
 */

export class GetOutrightLivescoreRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose({ name: 'Timestamp' })
  @Transform((field) => moment(field.value))
  timestamp!: Moment;

  @Expose({ name: 'FromDate' })
  @Transform((field) => moment(field.value))
  fromDate!: Moment;

  @Expose({ name: 'ToDate' })
  @Transform((field) => moment(field.value))
  toDate!: Moment;

  @Expose({ name: 'SportIds' })
  @Type(() => Number)
  sportIds?: number[];

  @Expose({ name: 'LocationIds' })
  @Type(() => Number)
  locationIds?: number[];

  @Expose({ name: 'FixtureIds' })
  @Type(() => Number)
  fixtureIds?: number[];

  @Expose({ name: 'TournamentsIds' })
  @Type(() => Number)
  tournamentsIds?: number[];
}
