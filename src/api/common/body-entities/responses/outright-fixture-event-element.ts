import { Expose } from 'class-transformer';

import { OutrightFixtureElement } from './outright-fixture-element';

/**
 * Outright Fixture Event Element class is responsible for
 * deserializing the response from the snapshot API to a
 * outright fixture event element structure.
 */
export class OutrightFixtureEventElement {

  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'OutrightFixture' })
  outrightFixture!: OutrightFixtureElement;
}
