import { Expose } from 'class-transformer';

import { BaseEntity } from '@entities';

/**
 * CompetitionsSubscriptionBodyStructure class is a body
 * entity class that represents the structure of the body
 * of the response of the competitions subscription.
 */
export class CompetitionsSubscriptionBodyStructure implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'CompetitionId' })
  competitionId?: number;

  @Expose({ name: 'SportId' })
  sportId?: number;

  @Expose({ name: 'LocationId' })
  locationId?: number;

  @Expose({ name: 'Success' })
  success?: boolean;
}
