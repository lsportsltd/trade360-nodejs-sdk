import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@entities';
import { LeaguesSubscriptionRequestBodyStructure } from '@api/common/body-entities';

/**
 * LeaguesSubscriptionRequestDto class is responsible for
 * sending requests to the subscription API to subscribe to
 * leagues. It contains the structure of the request body for
 * subscribing to leagues.
 * @param subscriptions The subscriptions to be made to the
 * leagues in the subscription API.
 */
export class LeaguesSubscriptionRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose({ name: 'Subscriptions' })
  @Type(() => LeaguesSubscriptionRequestBodyStructure)
  subscriptions!: LeaguesSubscriptionRequestBodyStructure[];
}
