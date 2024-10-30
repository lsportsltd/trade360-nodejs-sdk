import { Expose, Type } from 'class-transformer';

import { Sport } from '@entities';

/**
 * SportsCollectionResponse class is responsible for deserializing the response
 * from the metadata API to a collection of sports.
 */
export class SportsCollectionResponse {
  @Expose({ name: 'Sports' })
  @Type(() => Sport)
  sports?: Sport[];
}
