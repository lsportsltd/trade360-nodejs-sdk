import { Expose } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';

/**
 * GetSubscriptionsRequest class is responsible for sending
 * a request to the subscription API to get fixtures
 * subscriptions. It contains the properties for sending a
 * request to the subscription API to get fixtures
 * subscriptions.
 * @param sportIds The sport IDs to get subscriptions for
 * @param locationIds The location IDs to get subscriptions for
 * @param leagueIds The league IDs to get subscriptions for
 * @returns A new instance of the GetSubscriptionsRequest class
 * with the provided sport IDs, location IDs, and league IDs.
 */
export class GetSubscriptionsRequest extends HttpRequestDto {
  @Expose()
  sportIds?: number[];

  @Expose()
  locationIds?: number[];

  @Expose()
  leagueIds?: number[];
}
