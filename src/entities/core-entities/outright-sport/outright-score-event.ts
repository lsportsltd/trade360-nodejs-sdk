import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '../../message-types';

import { OutrightScore } from './outright-score';

export class OutrightScoreEvent implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'OutrightScore' })
  @Type(() => OutrightScore)
  outrightScore?: OutrightScore;
}
