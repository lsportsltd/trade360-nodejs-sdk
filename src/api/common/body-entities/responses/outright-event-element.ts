import { Expose, Type } from 'class-transformer';

import { OutrightFixtureElement } from './outright-fixture-element';
import { FixtureMarketElement } from './fixture-market-element';
import { OutrightScoreElement } from './outright-score-element';


/**
 * Outright Event Element class is responsible for
 * deserializing the response from the snapshot API to a
 * outright event element structure.
 */
export class OutrightEventElement {

  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'OutrightFixture' })
  @Type(() => OutrightFixtureElement)
  outrightFixture!: OutrightFixtureElement;

  @Expose({ name: 'OutrightScore' })
  @Type(() => OutrightScoreElement)
  outrightScore!: OutrightScoreElement;

  @Expose({ name: 'Markets' })
  @Type(() => FixtureMarketElement)
  markets: FixtureMarketElement[] = [];
}
