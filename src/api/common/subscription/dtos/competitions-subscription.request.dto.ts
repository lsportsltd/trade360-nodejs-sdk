import { Expose, Type } from 'class-transformer';

import { CompetitionsSubscriptionRequestBodyStructure } from '@api/common/body-entities';
import { BaseEntity } from '@entities';

/**
 * CompetitionsSubscriptionRequestDto class for sending
 * request to subscribe to competitions from the API. It
 * contains the properties for the request to subscribe to
 * competitions from the API.
 * @param subscriptions The subscriptions to subscribe to in
 * the request to subscribe to competitions from the API.
 * @returns CompetitionsSubscriptionRequestDto instance that
 * contains the properties for the request to subscribe to
 * competitions from the API.
 */
export class CompetitionsSubscriptionRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose({ name: 'Subscriptions' })
  @Type(() => CompetitionsSubscriptionRequestBodyStructure)
  subscriptions?: CompetitionsSubscriptionRequestBodyStructure[];
}
