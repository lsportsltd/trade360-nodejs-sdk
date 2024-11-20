import { Expose } from 'class-transformer';

import { BaseEntity } from '@entities';

/**
 * Get Subscriptions Collection Response class
 * (used for serialization) - represents the response
 * body of the get fixtures subscriptions endpoint.
 * This class is used to deserialize the response
 * from the get fixtures subscriptions endpoint.
 * It contains the fixtures.
 */
export class SubscriptionsCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Fixtures' })
  fixtures?: number[];
}
