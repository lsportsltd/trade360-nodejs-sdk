import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { MarketEvent, OutrightCompetition } from '@lsports/entities';

import { BaseEntity } from './';

@EntityKey(41)
export class OutrightFixtureMarketUpdate implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Competition' })
  @Type(() => OutrightCompetition)
  competition?: OutrightCompetition<MarketEvent>;
}
