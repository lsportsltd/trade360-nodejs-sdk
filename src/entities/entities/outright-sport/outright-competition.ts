import { Expose, Transform } from 'class-transformer';

import { BaseEntity } from '@entities';
import { deserializeToEventInstance } from '@lsports/entities/utilities';

export class OutrightCompetition<TEvent extends BaseEntity> {
  @Expose({ name: 'Id' })
  id?: number;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'Type' })
  type?: number;

  @Expose({ name: 'Events' })
  @Transform(({ value }) => {
    return deserializeToEventInstance(value);
  })
  events?: TEvent[];
}
