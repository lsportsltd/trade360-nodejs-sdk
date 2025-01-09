import { Expose, Type, Transform } from 'class-transformer';
import moment, { Moment } from 'moment';
import { BaseEntity } from '@entities';
/**
 * GetInPlayEventRequestDto class for sending request
 * to get event from the API. 
 * @param timestamp The timestamp of the snapshot in UTC
 * @param fromDate The start date for the snapshot in UTC
 * @param toDate The end date for the snapshot in UTC
 * @param sportIds The sport IDs to filter the event
 * @param locationIds The location IDs to filter the event
 * @param leagueIds The league IDs to filter the event
 * @param fixtureIds The fixture IDs to filter the event
 * @param marketIds The IDs of the markets
 * @returns GetInPlayEventRequestDto instance that
 * contains the properties for the request to get
 * event from the API.
 */

export class GetInPlayEventRequestDto implements BaseEntity {
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

  @Expose({ name: 'LeagueIds' })
  @Type(() => Number)
  leagueIds?: number[];

  @Expose({ name: 'FixtureIds' })
  @Type(() => Number)
  fixtureIds?: number[];

  @Expose({ name: 'MarketIds' })
  @Type(() => Number)
  marketIds?: number[];
}
