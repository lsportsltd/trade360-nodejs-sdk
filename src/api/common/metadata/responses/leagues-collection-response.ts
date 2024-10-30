import { Expose, Type } from 'class-transformer';

import { LeaguesBodyStructure } from '../body-entities';

/**
 * LeaguesCollectionResponse class is responsible for deserializing the response
 * from the metadata API to a collection of leagues.
 */
export class LeaguesCollectionResponse {
  @Expose({ name: 'Leagues' })
  @Type(() => LeaguesBodyStructure)
  leagues?: LeaguesBodyStructure[];
}
