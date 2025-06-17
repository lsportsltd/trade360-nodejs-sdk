import { Expose, Type, Transform } from 'class-transformer';
import moment, { Moment } from 'moment';
import { BaseEntity } from '@entities';
/**
 * GetSnapshotRequestDto class for sending request
 * to get snapshor from the API.
 * @param timestamp The timestamp of the snapshot in UTC
 * @param fromDate The start date for the snapshot in UTC
 * @param toDate The end date for the snapshot in UTC
 * @param sportIds The sport IDs to filter the market
 * @param locationIds The location IDs to filter the market
 * @param leagueIds The league IDs to filter the market
 * @param tournamentsIds The IDs of the markets
 * @param fixtureIds The fixture IDs to filter the market
 * @param marketIds The IDs of the markets
 * @returns GetSnapshotRequestDto instance that
 * contains the properties for the request to get
 * market from the API.
 */
export class GetSnapshotRequestDto implements BaseEntity {
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

  @Expose({ name: 'Sports' })
  @Type(() => Number)
  sports?: number[];

  @Expose({ name: 'Locations' })
  @Type(() => Number)
  locations?: number[];

  @Expose({ name: 'Leagues' })
  @Type(() => Number)
  leagues?: number[];

  @Expose({ name: 'Fixtures' })
  @Type(() => Number)
  fixtures?: number[];

  @Expose({ name: 'Markets' })
  @Type(() => Number)
  markets?: number[];

  @Expose({ name: 'Tournaments' })
  @Type(() => Number)
  tournaments?: number[];
}
