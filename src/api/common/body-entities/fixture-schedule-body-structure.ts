import { Expose, Type } from 'class-transformer';

import { SportsBodyStructure } from './sports-body-structure';
import { LocationsBodyStructure } from './locations-body-structure';
import { LeaguesBodyStructure } from './leagues-body-structure';
import { ParticipantSchedule } from './participant-schedule';

/**
 * Fixture Schedule Body Structure class is responsible for
 * deserializing the response from the subscription API to a
 * fixture schedule body structure.
 */
export class FixtureScheduleBodyStructure {
  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'Sport' })
  @Type(() => SportsBodyStructure)
  sport?: SportsBodyStructure;

  @Expose({ name: 'Location' })
  @Type(() => LocationsBodyStructure)
  location?: LocationsBodyStructure;

  @Expose({ name: 'League' })
  @Type(() => LeaguesBodyStructure)
  league?: LeaguesBodyStructure;

  @Expose({ name: 'StartDate' })
  startDate?: Date;

  @Expose({ name: 'LastUpdate' })
  lastUpdate?: Date;

  @Expose({ name: 'Status' })
  status?: number;

  @Expose({ name: 'Participants' })
  @Type(() => ParticipantSchedule)
  participants?: ParticipantSchedule[];
}
