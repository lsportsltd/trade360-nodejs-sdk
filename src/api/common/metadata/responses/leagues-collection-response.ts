import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { LeaguesBodyStructure } from '@api/common/body-entities';

/**
 * LeaguesCollectionResponse class is responsible
 * for deserializing the response from the metadata
 * API to a collection of leagues.
 */
export class LeaguesCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Leagues' })
  @Type(() => LeaguesBodyStructure)
  leagues?: LeaguesBodyStructure[];
}
