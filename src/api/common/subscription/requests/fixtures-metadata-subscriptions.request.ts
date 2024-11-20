import { Expose } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';

/**
 * FixturesMetadataSubscriptionsRequest class for
 * sending request to get subscribed fixtures
 * metadata from the API. It extends the
 * HttpRequestDto class and contains the properties
 * for the request to get subscribed fixtures
 * metadata from the API.
 * @param fromDate The date from which to get
 * subscribed fixture metadata
 * @param toDate The date to which to get
 * subscribed fixture metadata
 * @returns FixturesMetadataSubscriptionRequest
 * instance that contains the properties for
 * the request to get subscribed fixture metadata
 * from the API.
 */
export class FixturesMetadataSubscriptionsRequest extends HttpRequestDto {
  @Expose()
  fromDate!: string;

  @Expose()
  toDate!: string;
}
