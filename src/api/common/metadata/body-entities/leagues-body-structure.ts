import { Expose } from 'class-transformer';

/**
 * LeaguesBodyStructure class is responsible for deserializing the response
 * from the metadata API to a league.
 */
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
