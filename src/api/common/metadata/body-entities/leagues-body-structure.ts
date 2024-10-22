import { Expose } from 'class-transformer';

export class LeaguesBodyStructure {
  @Expose({ name: 'Id' })
  id!: number;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'Season' })
  season?: string;

  @Expose({ name: 'SportId' })
  sportId!: number;

  @Expose({ name: 'LocationId' })
  locationId!: number;
}
