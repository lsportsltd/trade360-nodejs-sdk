import { Expose } from 'class-transformer';

import { BaseEntity } from '@entities';

/**
 * FixturesSubscriptionBodyStructure class for the body
 * of the fixtures subscription endpoint.
 * It contains the properties for the body of the fixtures
 * subscription endpoint.
 */
export class FixturesSubscriptionBodyStructure implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'FixtureId' })
  fixtureId?: number;

  @Expose({ name: 'Success' })
  success?: boolean;
}
