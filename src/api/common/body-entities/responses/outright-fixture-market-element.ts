import { Expose, Type } from 'class-transformer';

import { OutrightMarketElement } from './outright-market-element';

/**
 * Outright Fixture Markets Element class is responsible for
 * deserializing the response from the snapshot API to a
 * outright fixture markets element structure.
 */
export class OutrightFixtureMarketsElement {
  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'Markets' })
  @Type(() => OutrightMarketElement)
  markets: OutrightMarketElement[] = [];
}
