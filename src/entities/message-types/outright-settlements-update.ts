import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { MarketEvent, OutrightCompetition } from '@lsports/entities';

@EntityKey(42)
export class OutrightSettlementsUpdate {
  @Expose({ name: 'Competition' })
  @Type(() => OutrightCompetition)
  competition?: OutrightCompetition<MarketEvent>;
}
