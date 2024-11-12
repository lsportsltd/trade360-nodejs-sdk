import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { MarketEvent, OutrightCompetition } from '@lsports/entities';

import { BaseEntity } from './';

@EntityKey(42)
export class OutrightSettlementsUpdate implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Competition' })
  @Type(() => OutrightCompetition)
  competition?: OutrightCompetition<MarketEvent>;
}
