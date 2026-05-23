import { Expose, Transform } from 'class-transformer';

import { BaseEntity } from '../../message-types';
import { transformToEventInstance } from '../utilities/transform-event-instance';

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
