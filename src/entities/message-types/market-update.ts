import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { MarketEvent } from '@lsports/entities';

@EntityKey(3)
export class MarketUpdate {
  @Expose({ name: 'Events' })
  @Type(() => MarketEvent)
  events?: MarketEvent[];
}
