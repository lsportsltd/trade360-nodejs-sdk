import { Expose } from 'class-transformer';

import { BaseEntity } from '@lsports/entities';

/**
 * CompetitionsSubscriptionBodyStructure class is a body
 * entity class that represents the structure of the body
 * of the response of the competitions subscription.
 */
export class CompetitionsSubscriptionBodyStructure implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'leagueId' })
  leagueId?: number;

  @Expose({ name: 'SportId' })
  sportId?: number;

  @Expose({ name: 'LocationId' })
  locationId?: number;

  @Expose({ name: 'Success' })
  success!: boolean;

  @Expose({ name: 'Message' })
  message?: string;
}
