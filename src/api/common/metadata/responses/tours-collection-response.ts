import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@entities';

import { TourBodyStructure } from '@api/common/body-entities/responses';

/**
 * ToursCollectionResponse class is responsible
 * for deserializing the response from the metadata
 * API to a collection of tours.
 */
export class ToursCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Tours' })
  @Type(() => TourBodyStructure)
  tours?: TourBodyStructure[];
}
