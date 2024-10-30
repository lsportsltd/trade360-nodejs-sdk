import { Expose, Type } from 'class-transformer';

import { HttpRequestDto } from '@api/common';
import { SubscriptionStatus } from '@entities';

/**
 * GetLeaguesRequestDto class for sending request to get leagues
 * from the API. It extends the HttpRequestDto class and contains
 * the properties for the request to get leagues from the API.
 * @param sportIds The sport IDs to filter the leagues by in the
 * request to get leagues from the API. The sport IDs are used to
 * @param locationIds The location IDs to filter the leagues by in
 * the request to get leagues from the API.
 * @param subscriptionStatus The subscription status to filter the
 * leagues by in the request to get leagues from the API.
 * @returns GetLeaguesRequestDto instance that contains the properties
 * for the request to get leagues from the API.
 */
export class GetLeaguesRequest extends HttpRequestDto {
  @Expose()
  @Type(() => Number)
  sportIds?: number[];

  @Expose()
  @Type(() => Number)
  locationIds?: number[];

  @Expose()
  subscriptionStatus?: SubscriptionStatus;
}
