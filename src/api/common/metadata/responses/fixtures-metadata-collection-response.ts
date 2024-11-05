import { Expose, Type } from 'class-transformer';

import { SubscribedFixtureBodyStructure } from '../body-entities';

/**
 * FixtureMetadataCollectionResponse class for receiving response to get fixture metadata
 * from the API. It contains the properties for the response to get fixture metadata
 * from the API.
 */
export class FixturesMetadataCollectionResponse {
  @Expose({ name: 'SubscribedFixtures' })
  @Type(() => SubscribedFixtureBodyStructure)
  subscribedFixtures?: SubscribedFixtureBodyStructure[];
}
