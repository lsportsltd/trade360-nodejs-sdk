import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { MarketEvent } from '@lsports/entities';

import { BaseEntity } from './';

@EntityKey(35)
export class SettlementUpdate implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Events' })
  @Type(() => MarketEvent)
  events?: MarketEvent[];
}
