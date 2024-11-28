import { Expose } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';

/**
 * FixturesSubscriptionRequest class for sending
 * request to subscribe by fixtures to the API.
 * It extends the HttpRequestDto class and contains
 * the properties for the request to subscribe by
 * fixtures to the API.
 * @param fixtures The fixture IDs to subscribe by
 * in the request to subscribe by fixtures to the API.
 * @returns FixturesSubscriptionRequest instance that
 */
export class FixturesSubscriptionRequest extends HttpRequestDto {
  @Expose()
  fixtures!: number[];
}
