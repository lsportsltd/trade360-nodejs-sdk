import { Expose, Type } from 'class-transformer';

import { OutrightLivescore } from './outright-livescore';

/**
 * Outright Score Event Element class is responsible for
 * deserializing the response from the snapshot API to a
 * outright score event element structure.
 */
export class OutrightScoreEventElement {

  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'OutrightScore' })
  @Type(() => OutrightLivescore)
  outrightScore!: OutrightLivescore;
}
