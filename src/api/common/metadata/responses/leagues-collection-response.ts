import { Expose, Type } from 'class-transformer';

import { LeaguesBodyStructure } from '../body-entities';

export class LeaguesCollectionResponse {
  @Expose({ name: 'Leagues' })
  @Type(() => LeaguesBodyStructure)
  leagues?: LeaguesBodyStructure[];
}
