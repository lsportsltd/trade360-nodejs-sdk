import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { LivescoreEvent } from '@lsports/entities';

@EntityKey(2)
export class LivescoreUpdate {
  @Expose({ name: 'Events' })
  @Type(() => LivescoreEvent)
  events?: LivescoreEvent[];
}
