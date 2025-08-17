import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@lsports/entities';
import { FixturesSubscriptionBodyStructure } from '@api/common/body-entities';

/**
 * Fixtures Subscription Collection Response class
 * (used for serialization) - represents the response
 * body of the fixtures subscription collection endpoint.
 * This class is used to deserialize the response from the
 * fixtures subscription collection endpoint.
 * It contains an array of fixtures subscription body structures.
 */
export class FixturesSubscriptionCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Fixtures' })
  @Type(() => FixturesSubscriptionBodyStructure)
  fixtures?: FixturesSubscriptionBodyStructure[];
}
