import { Expose, Type } from 'class-transformer';

import { OutrightMarketBodyStructure } from './outright-market-body-structure';

/**
 * Outright Fixture Markets Element class is responsible for
 * deserializing the response from the snapshot API to a
 * outright fixture markets element structure.
 */
export class OutrightFixtureMarketsBodyStructure {
  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'Markets' })
  @Type(() => OutrightMarketBodyStructure)
  markets: OutrightMarketBodyStructure[] = [];
}
