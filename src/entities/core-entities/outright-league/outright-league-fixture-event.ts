import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@entities';

import { OutrightLeagueFixture } from './outright-league-fixture';

export class OutrightLeagueFixtureEvent implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'OutrightLeague' })
  @Type(() => OutrightLeagueFixture)
  outrightLeague?: OutrightLeagueFixture;
}
