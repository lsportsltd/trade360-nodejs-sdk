import { Expose, Transform } from 'class-transformer';

import { BaseEntity, transformToEventInstance } from '@entities';

export class OutrightLeagueCompetitions<TEvent extends BaseEntity> {
  @Expose({ name: 'Id' })
  id?: number;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'Type' })
  type?: number;

  @Expose({ name: 'Events' })
  @Transform(({ value }) => {
    return transformToEventInstance(value);
  })
  events?: TEvent[];
}
