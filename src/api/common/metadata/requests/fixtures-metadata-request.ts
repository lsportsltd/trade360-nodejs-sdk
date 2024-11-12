import { Expose } from 'class-transformer';

import { HttpRequestDto } from '@api/common';

/**
 * GetFixtureMetadataRequest class for sending request to get fixture metadata
 * from the API. It extends the HttpRequestDto class and contains the properties
 * for the request to get fixture metadata from the API.
 * @param fromDate The date from which to get fixture metadata
 * @param toDate The date to which to get fixture metadata
 * @returns GetFixtureMetadataRequest instance that contains the properties
 * for the request to get fixture metadata from the API.
 */
export class GetFixturesMetadataRequest extends HttpRequestDto {
  @Expose()
  fromDate!: string;

  @Expose()
  toDate!: string;
}
