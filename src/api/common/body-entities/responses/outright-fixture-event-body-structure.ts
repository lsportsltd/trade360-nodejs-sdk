import { Expose, Type } from 'class-transformer';

import { OutrightFixtureBodyStructure } from './outright-fixture-body-structure';

/**
 * Outright Fixture Event Element class is responsible for
 * deserializing the response from the snapshot API to a
 * outright fixture event element structure.
 */
export class OutrightFixtureEventBodyStructure {
  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'OutrightFixture' })
  @Type(() => OutrightFixtureBodyStructure)
  outrightFixture!: OutrightFixtureBodyStructure;
}
