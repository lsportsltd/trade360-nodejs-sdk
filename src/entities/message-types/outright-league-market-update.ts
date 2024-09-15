import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { MarketEvent, OutrightLeagueCompetition } from '@lsports/entities';

@EntityKey(40)
export class OutrightLeagueMarketUpdate {
  @Expose({ name: 'Competition' })
  @Type(() => OutrightLeagueCompetition)
  competition?: OutrightLeagueCompetition<MarketEvent>;
}
