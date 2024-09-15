import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { OutrightCompetition, OutrightScoreEvent } from '@lsports/entities';

@EntityKey(39)
export class OutrightScoreUpdate {
  @Expose({ name: 'Competition' })
  @Type(() => OutrightCompetition)
  competition?: OutrightCompetition<OutrightScoreEvent>;
}
