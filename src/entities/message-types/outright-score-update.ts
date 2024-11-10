import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { OutrightCompetition, OutrightScoreEvent } from '@lsports/entities';

import { BaseEntity } from './';

@EntityKey(39)
export class OutrightScoreUpdate implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Competition' })
  @Type(() => OutrightCompetition)
  competition?: OutrightCompetition<OutrightScoreEvent>;
}
