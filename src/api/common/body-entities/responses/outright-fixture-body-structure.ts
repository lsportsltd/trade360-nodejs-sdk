import { Expose, Type } from 'class-transformer';

import { SportsBodyStructure } from './sports-body-structure';
import { LocationsBodyStructure } from './locations-body-structure';
import { ParticipantSchedule } from './participant-schedule';
import { Subscription } from '@lsports/entities/common';
import { FixtureVenue } from '@lsports/entities';

/**
 * Outright Fixture Element class is responsible for
 * deserializing the response from the snapshot API to a
 * outright fixture element structure.
 */
export class OutrightFixtureBodyStructure {
  @Expose({ name: 'Sport' })
  @Type(() => SportsBodyStructure)
  sport!: SportsBodyStructure;

  @Expose({ name: 'Location' })
  @Type(() => LocationsBodyStructure)
  location!: LocationsBodyStructure;

  @Expose({ name: 'StartDate' })
  startDate!: Date;

  @Expose({ name: 'LastUpdate' })
  lastUpdate!: Date;

  @Expose({ name: 'Status' })
  status!: number;

  @Expose({ name: 'Participants' })
  @Type(() => ParticipantSchedule)
  participants: ParticipantSchedule[] = [];

  @Expose({ name: 'Subscription' })
  @Type(() => Subscription)
  subscription!: Subscription;

  @Expose({ name: 'Venue' })
  @Type(() => FixtureVenue)
  public venue?: FixtureVenue;
}
