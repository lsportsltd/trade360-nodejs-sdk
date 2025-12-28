import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@entities';

import { SeasonBodyStructure } from '@api/common/body-entities/responses';

/**
 * SeasonsCollectionResponse class is responsible
 * for deserializing the response from the metadata
 * API to a collection of seasons.
 */
export class SeasonsCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Seasons' })
  @Type(() => SeasonBodyStructure)
  seasons?: SeasonBodyStructure[];
}
