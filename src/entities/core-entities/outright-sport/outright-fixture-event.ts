import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@lsports/entities';

import { OutrightFixture } from './outright-fixture';

export class OutrightFixtureEvent implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'OutrightFixture' })
  @Type(() => OutrightFixture)
  outrightFixture?: OutrightFixture;
}
