import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { LivescoreEvent } from '@lsports/entities';

import { BaseEntity } from './';

@EntityKey(2)
export class LivescoreUpdate implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Events' })
  @Type(() => LivescoreEvent)
  events?: LivescoreEvent[];
}
