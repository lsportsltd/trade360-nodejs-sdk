import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@entities';

import { CompetitionBodyStructure } from '@api/common/body-entities';

/**
 * CompetitionCollectionResponse class is responsible for deserializing the response
 * from the metadata API to a collection of competitions.
 */
export class CompetitionCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Competitions' })
  @Type(() => CompetitionBodyStructure)
  competitions?: CompetitionBodyStructure[];
}
