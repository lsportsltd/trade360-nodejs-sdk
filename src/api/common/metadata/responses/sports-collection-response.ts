import { Expose, Type } from 'class-transformer';

import { Sport } from '@entities';

export class SportsCollectionResponse {
  @Expose({ name: 'Sports' })
  @Type(() => Sport)
  sports?: Sport[];
}
