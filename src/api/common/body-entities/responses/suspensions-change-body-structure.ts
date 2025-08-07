import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@lsports/entities';
import { SuspendedMarket } from './suspended-markets';

/**
 * SuspensionsChangeBodyStructure class is responsible
 * for deserializing the response from the subscription
 * API to a suspension change body structure.
 */
export class SuspensionsChangeBodyStructure implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Succeeded' })
  succeeded!: boolean;

  @Expose({ name: 'Reason' })
  reason?: string;

  @Expose({ name: 'CreationDate' })
  creationDate!: Date;

  @Expose({ name: 'FixtureId' })
  fixtureId?: number;

  @Expose({ name: 'SportId' })
  sportId?: number;

  @Expose({ name: 'LocationId' })
  locationId?: number;

  @Expose({ name: 'CompetitionId' })
  competitionId?: number;

  @Expose({ name: 'Markets' })
  @Type(() => SuspendedMarket)
  markets: SuspendedMarket[] = [];
}
