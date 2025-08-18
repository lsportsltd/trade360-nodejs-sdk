import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@entities';
import { CompetitionsSubscriptionBodyStructure } from '@api/common/body-entities';

/**
 * CompetitionsSubscriptionCollectionResponse class
 * (used for serialization) - represents the response
 * body of the competitions subscription endpoint.
 * This class is used to deserialize the response from
 * the competitions subscription endpoint.
 * It contains the subscription property.
 */
export class CompetitionsSubscriptionCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Subscription' })
  @Type(() => CompetitionsSubscriptionBodyStructure)
  subscription: CompetitionsSubscriptionBodyStructure[] = [];
}
