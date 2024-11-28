import { Expose, Type } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';
import { SubscriptionState } from '@lsports/entities';

/**
 * GetCompetitionsRequest class for sending request
 * to get competitions from the API. It extends the
 * HttpRequestDto class and contains the properties
 * for the request to get competitions from the API.
 * @param sportIds The sport IDs to filter the
 * competitions by in the request to get
 * competitions from the API.
 * @param locationIds The location IDs to filter
 * the competitions by in the request to get
 * competitions from the API.
 * @param subscriptionStatus The subscription status
 *  to filter the competitions by in the request to
 * get competitions from the API. Empty field returns
 * all competitions regardless of subscription status.
 * @returns GetCompetitionsRequest instance that
 * contains the properties for the request to get
 * competitions from the API.
 */
export class GetCompetitionsRequest extends HttpRequestDto {
  @Expose()
  @Type(() => Number)
  sportIds?: number[];

  @Expose()
  @Type(() => Number)
  locationIds?: number[];

  @Expose({ name: 'SubscriptionStatus' })
  subscriptionStatus?: SubscriptionState = SubscriptionState.All;
}
