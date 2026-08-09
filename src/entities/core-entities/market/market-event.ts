import { Expose, Transform, Type } from 'class-transformer';

import { BaseEntity } from '../../message-types';

import { Market } from './market';

export class MarketEvent implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'FixtureName' })
  @Transform(({ value }) => (value === null || value === '' ? undefined : value))
  fixtureName?: string;

  @Expose({ name: 'Markets' })
  @Type(() => Market)
  markets?: Market[];
}
