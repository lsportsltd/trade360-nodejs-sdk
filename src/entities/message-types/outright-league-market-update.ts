import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { MarketEvent, OutrightLeagueCompetition } from '@lsports/entities';

import { BaseEntity } from './';

@EntityKey(40)
export class OutrightLeagueMarketUpdate implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Competition' })
  @Type(() => OutrightLeagueCompetition)
  competition?: OutrightLeagueCompetition<MarketEvent>;
}
