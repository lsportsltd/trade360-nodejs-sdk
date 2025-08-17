import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@lsports/entities';
/**
 * GetSnapshotRequestDto class for sending request
 * to get snapshot from the API.
 * @param timestamp The Unix timestamp of the snapshot (seconds since epoch)
 * @param fromDate The Unix timestamp for the start date of the snapshot (seconds since epoch)
 * @param toDate The Unix timestamp for the end date of the snapshot (seconds since epoch)
 * @param sports The sport IDs to filter the market
 * @param locations The location IDs to filter the market
 * @param leagues The league IDs to filter the market
 * @param tournaments The tournament IDs to filter the market
 * @param fixtures The fixture IDs to filter the market
 * @param markets The IDs of the markets
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
  @Type(() => Number)
  timestamp?: number;

  @Expose({ name: 'FromDate' })
  @Type(() => Number)
  fromDate?: number;

  @Expose({ name: 'ToDate' })
  @Type(() => Number)
  toDate?: number;

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
