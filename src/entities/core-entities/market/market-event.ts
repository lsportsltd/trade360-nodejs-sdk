import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@entities';

import { Market } from './market';

export class MarketEvent implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'Markets' })
  @Type(() => Market)
  markets?: Market[];
}
