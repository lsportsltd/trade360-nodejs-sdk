import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@lsports/entities';
import { FixturesMetadataSubscriptionsBodyStructure } from '@api/common/body-entities';

/**
 * Fixtures Metadata Subscription Collection Response class
 * (used for serialization) - represents the response body
 * of the subscribed fixtures metadata subscription
 * collection endpoint. This class is used to deserialize
 * the response from the fixturesMetadata subscription
 * collection endpoint. It contains an array of
 * fixturesMetadata subscription body structures.
 */
export class FixturesMetadataSubscriptionsCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'SubscribedFixtures' })
  @Type(() => FixturesMetadataSubscriptionsBodyStructure)
  subscribedFixtures: FixturesMetadataSubscriptionsBodyStructure[] = [];
}
