import { Expose, Type } from 'class-transformer';

import { LeaguesSubscriptionBodyStructure } from '@api/common/body-entities';
import { BaseEntity } from '@lsports/entities';

/**
 * Leagues Subscription Collection Response class
 * (used for serialization) - represents the response
 * body of the leagues subscription collection endpoint.
 * This class is used to deserialize the response from the
 * leagues subscription collection endpoint.
 * It contains the subscription.
 */
export class LeaguesSubscriptionCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Subscription' })
  @Type(() => LeaguesSubscriptionBodyStructure)
  subscription: LeaguesSubscriptionBodyStructure[] = [];
}
