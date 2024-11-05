import { Expose, Type } from 'class-transformer';

import { SubscriptionState } from '@lsports/entities';

/**
 * Base interface for all entities that can be mapped
 */
interface BaseEntity {
  [key: string]: unknown;
}

/**
 * GetCompetitionsRequestDto class for sending request to get competitions
 * from the API. It contains the properties for the request to get competitions
 * from the API.
 * @param sportIds The sport IDs to filter the competitions by in the request
 * to get competitions from the API.
 * @param locationIds The location IDs to filter the competitions by in the
 * request to get competitions from the API.
 * @param subscriptionStatus The subscription status to filter the competitions
 * by in the request to get competitions from the API. Empty field returns
 * all competitions regardless of subscription status.
 * @returns GetCompetitionsRequestDto instance that contains the properties
 * for the request to get competitions from the API.
 */
export class GetCompetitionsRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: GetCompetitionsRequestDto) {
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
