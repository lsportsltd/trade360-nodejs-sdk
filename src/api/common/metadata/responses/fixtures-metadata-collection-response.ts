import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@entities';

import { SubscribedFixtureBodyStructure } from '@api/common/body-entities';

/**
 * FixtureMetadataCollectionResponse class for
 * receiving response to get fixture metadata
 * from the API. It contains the properties for
 * the response to get fixture metadata from
 * the API.
 */
export class FixturesMetadataCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'SubscribedFixtures' })
  @Type(() => SubscribedFixtureBodyStructure)
  subscribedFixtures?: SubscribedFixtureBodyStructure[];
}
