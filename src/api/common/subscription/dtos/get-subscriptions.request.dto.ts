import { Expose } from 'class-transformer';

import { BaseEntity } from '@entities';

/**
 * GetSubscriptionsRequestDto class is responsible for sending
 * a request to the subscription API to get fixtures
 * subscriptions. It contains the properties for sending a
 * request to the subscription API to get fixtures subscriptions.
 * @param sportIds The sport IDs to get subscriptions for
 * @param locationIds The location IDs to get subscriptions for
 * @param leagueIds The league IDs to get subscriptions for
 * @returns A new instance of the GetSubscriptionsRequestDto class
 * with the provided sport IDs, location IDs, and league IDs.
 */
export class GetSubscriptionsRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose({ name: 'SportIds' })
  sportIds?: number[];

  @Expose({ name: 'LocationIds' })
  locationIds?: number[];

  @Expose({ name: 'LeagueIds' })
  leagueIds?: number[];
}
