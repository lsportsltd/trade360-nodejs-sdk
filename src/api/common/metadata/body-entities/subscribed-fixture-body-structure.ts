import { Expose, Type } from 'class-transformer';
import { Participant } from './participant';

export class SubscribedFixtureBodyStructure {
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
  fixtureStatus?: number;

  @Expose({ name: 'Participansts' })
  @Type(() => Participant)
  participants?: Participant[];
}
