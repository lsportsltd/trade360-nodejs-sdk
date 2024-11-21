import { Expose, Type } from 'class-transformer';

import { SubscriptionState } from '@lsports/entities';
import { BaseEntity } from '@entities';

/**
 * GetLeaguesRequestDto class for sending request
 * to get leagues from the API. It extends the
 * BaseEntity class and contains the properties
 * for the request to get leagues from the API.
 * @param sportIds The sport IDs to filter the
 * leagues by in the request to get leagues from
 * the API.
 * @param locationIds The location IDs to filter
 * the leagues by in the request to get leagues
 * from the API.
 * @param subscriptionStatus The subscription
 * status to filter the * leagues by in the request
 * to get leagues from the API. Empty field returns
 * all leagues regardless of the subscription status.
 * @returns GetLeaguesRequestDto instance that contains
 *  the properties for the request to get leagues from
 *  the API.
 */
export class GetLeaguesRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose({ name: 'SportIds' })
  @Type(() => Number)
  sportIds?: number[];

  @Expose({ name: 'LocationIds' })
  @Type(() => Number)
  locationIds?: number[];

  @Expose({ name: 'SubscriptionStatus' })
  subscriptionStatus?: SubscriptionState = SubscriptionState.All;
}
