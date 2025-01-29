import { Expose, Type } from 'class-transformer';

import { OutrightFixtureBodyStructure } from './outright-fixture-body-structure';
import { FixtureMarketBodyStructure } from './fixture-market-body-strcture';
import { OutrightScoreBodyStructure } from './outright-score-body-structure';

/**
 * Outright Event Element class is responsible for
 * deserializing the response from the snapshot API to a
 * outright event element structure.
 */
export class OutrightEventBodyStructure {
  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'OutrightFixture' })
  @Type(() => OutrightFixtureBodyStructure)
  outrightFixture!: OutrightFixtureBodyStructure;

  @Expose({ name: 'OutrightScore' })
  @Type(() => OutrightScoreBodyStructure)
  outrightScore!: OutrightScoreBodyStructure;

  @Expose({ name: 'Markets' })
  @Type(() => FixtureMarketBodyStructure)
  markets: FixtureMarketBodyStructure[] = [];
}
