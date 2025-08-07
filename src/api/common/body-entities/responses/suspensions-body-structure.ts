import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@lsports/entities';

import { SuspendedMarket } from './suspended-markets';

/**
 * SuspensionsBodyStructure class is responsible for
 * deserializing the response from the subscription API
 * to a suspension body structure.
 */
export class SuspensionsBodyStructure implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Succeeded' })
  succeeded!: boolean;

  @Expose({ name: 'Reason' })
  reason?: string;

  @Expose({ name: 'SportId' })
  sportId?: number;

  @Expose({ name: 'LocationId' })
  locationId?: number;

  @Expose({ name: 'CompetitionId' })
  competitionId?: number;

  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'CreationDate' })
  creationDate!: Date;

  @Expose({ name: 'Markets' })
  @Type(() => SuspendedMarket)
  markets: SuspendedMarket[] = [];
}
