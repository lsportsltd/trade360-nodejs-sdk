import { Expose, Type } from 'class-transformer';

import { SubscriptionStatus } from '@lsports/entities';

/**
 * Base interface for all entities that can be mapped
 */
interface BaseEntity {
  [key: string]: unknown;
}

/**
 * GetLeaguesRequestDto class for sending request to get leagues
 * from the API. It extends the BaseEntity class and contains
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
export class GetLeaguesRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: GetLeaguesRequestDto) {
    Object.assign(this, data);
  }

  @Expose({ name: 'SportIds' })
  @Type(() => Number)
  sportIds?: number[];

  @Expose({ name: 'LocationIds' })
  @Type(() => Number)
  locationIds?: number[];

  @Expose({ name: 'SubscriptionStatus' })
  subscriptionStatus?: SubscriptionStatus;
}
