import { Expose, Type } from 'class-transformer';

import { OutrightFixtureMarketsElement } from './outright-fixture-market-element';

/**
 * Outright League Markets Competition Structure class is responsible for
 * deserializing the response from the snapshot API to a
 * outright league markets competition body structure.
 */
export class OutrightLeagueMarketsCompetition {
  @Expose({ name: 'id' })
  id!: number;

  @Expose({ name: 'Name' })
  name!: string;

  @Expose({ name: 'Type' })
  type!: number;

  @Expose({ name: 'Events' })
  @Type(() => OutrightFixtureMarketsElement)
  events: OutrightFixtureMarketsElement[] = [];
}
