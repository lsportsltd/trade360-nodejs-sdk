import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { OutrightCompetition, OutrightFixtureEvent } from '@lsports/entities';

import { BaseEntity } from './';

@EntityKey(37)
export class OutrightFixtureUpdate implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Competition' })
  @Type(() => OutrightCompetition)
  competition?: OutrightCompetition<OutrightFixtureEvent>;
}
