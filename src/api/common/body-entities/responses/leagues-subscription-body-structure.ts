import { Expose } from 'class-transformer';

import { BaseEntity } from '@lsports/entities';

/**
 * LeaguesSubscriptionBodyStructure class is responsible
 * for deserializing the response from the metadata API
 * to a league subscription.
 */
export class LeaguesSubscriptionBodyStructure implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'LeagueId' })
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
