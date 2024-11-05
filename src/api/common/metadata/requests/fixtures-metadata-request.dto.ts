import { Expose, Transform } from 'class-transformer';
import moment, { Moment } from 'moment';

/**
 * Base interface for all entities that can be mapped
 */
interface BaseEntity {
  [key: string]: unknown;
}

/**
 * GetFixturesMetadataRequestDto class for sending request to get fixtures metadata
 * from the API. It contains the properties for the request to get fixtures metadata
 * from the API.
 * @param fromDate The date from which to get fixtures metadata
 * @param toDate The date to which to get fixtures metadata
 * @returns GetFixturesMetadataRequestDto instance that contains the properties
 * for the request to get fixtures metadata from the API.
 */
export class GetFixturesMetadataRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: GetFixturesMetadataRequestDto) {
    Object.assign(this, data);
  }

  @Expose({ name: 'FromDate' })
  @Transform((field) => moment(field.value))
  fromDate!: Moment;

  @Expose({ name: 'ToDate' })
  @Transform((field) => moment(field.value))
  toDate!: Moment;
}
