import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@lsports/entities';

import { SportsBodyStructure } from '@api/common/body-entities';

/**
 * SportsCollectionResponse class is responsible
 * for deserializing the response from the metadata
 * API to a collection of sports.
 */
export class SportsCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Sports' })
  @Type(() => SportsBodyStructure)
  sports?: SportsBodyStructure[];
}
