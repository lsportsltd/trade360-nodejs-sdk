import { Expose, Type } from 'class-transformer';

import { BaseEntity, Sport } from '@entities';

/**
 * SportsCollectionResponse class is responsible for deserializing the response
 * from the metadata API to a collection of sports.
 */
export class SportsCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Sports' })
  @Type(() => Sport)
  sports?: Sport[];
}
