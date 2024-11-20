import { Expose, Transform } from 'class-transformer';
import moment, { Moment } from 'moment';

import { BaseEntity } from '@entities';

/**
 * FixturesMetadataSubscriptionsRequestDto class
 * for sending request to get subscribed fixtures
 * metadata from the API. It contains the properties
 * for the request to get subscribed fixtures
 * metadata from the API.
 * @param fromDate The date from which to get
 * subscribed fixtures metadata
 * @param toDate The date to which to get fixtures
 *  metadata
 * @returns GetFixturesMetadataSubscriptionsRequestDto
 *  instance that contains the properties for the
 * request to get subscribed fixtures metadata from
 * the API.
 */
export class FixturesMetadataSubscriptionsRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose({ name: 'FromDate' })
  @Transform((field) => moment(field.value))
  fromDate!: Moment;

  @Expose({ name: 'ToDate' })
  @Transform((field) => moment(field.value))
  toDate!: Moment;
}
