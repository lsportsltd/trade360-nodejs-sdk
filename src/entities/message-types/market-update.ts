import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { MarketEvent } from '@lsports/entities';

import { BaseEntity } from './';

@EntityKey(3)
export class MarketUpdate implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Events' })
  @Type(() => MarketEvent)
  events?: MarketEvent[];
}
