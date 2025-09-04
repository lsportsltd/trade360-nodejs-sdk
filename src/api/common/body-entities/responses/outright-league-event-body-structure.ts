'use strict';

import { Expose, Type } from 'class-transformer';

import { OutrightMarketBodyStructure } from './outright-market-body-structure';
import { OutrightLeagueFixtureSnapshot } from './outright-league-fixture-snapshot';

/**
 * Outright League Event Body Structure class is responsible for
 * deserializing the response from the snapshot API to a
 * outright league event body structure.
 */
export class OutrightLeagueEventBodyStructure {
  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'Markets' })
  @Type(() => OutrightMarketBodyStructure)
  markets: OutrightMarketBodyStructure[] = [];

  @Expose({ name: 'OutrightLeague' })
  @Type(() => OutrightLeagueFixtureSnapshot)
  outrightLeague!: OutrightLeagueFixtureSnapshot;
}
