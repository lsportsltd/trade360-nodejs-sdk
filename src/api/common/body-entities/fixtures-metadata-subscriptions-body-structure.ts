import { Expose, Type } from 'class-transformer';

import { BaseEntity, FixtureStatus } from '@entities';
import { Participant } from './participant';

/**
 * FixturesMetadataSubscriptionBodyStructure class for
 * the body of the subscribed fixtures metadata subscription
 * endpoint. It contains the properties for the body of
 * the subscribed fixtures metadata subscription endpoint.
 */
export class FixturesMetadataSubscriptionsBodyStructure implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'FixtureName' })
  fixtureName?: string;

  @Expose({ name: 'StartDate' })
  startDate!: Date;

  @Expose({ name: 'LastUpdate' })
  lastUpdate!: Date;

  @Expose({ name: 'SportId' })
  sportId!: number;

  @Expose({ name: 'LocationId' })
  locationId!: number;

  @Expose({ name: 'LeagueId' })
  leagueId!: number;

  @Expose({ name: 'FixtureStatus' })
  fixtureStatus!: FixtureStatus;

  @Expose({ name: 'Participants' })
  @Type(() => Participant)
  participants: Participant[] = [];
}
