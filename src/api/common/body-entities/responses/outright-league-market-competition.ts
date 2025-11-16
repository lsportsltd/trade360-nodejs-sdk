import { Expose, Type } from 'class-transformer';

import { OutrightFixtureMarketsBodyStructure } from './outright-fixture-market-body-structure';

/**
 * Outright League Markets Competition Structure class is responsible for
 * deserializing the response from the snapshot API to a
 * outright league markets competition body structure.
 */
export class OutrightLeagueMarketsCompetition {
  @Expose({ name: 'Id' })
  id!: number;

  @Expose({ name: 'Name' })
  name!: string;

  @Expose({ name: 'Type' })
  type!: number;

  @Expose({ name: 'Events' })
  @Type(() => OutrightFixtureMarketsBodyStructure)
  events: OutrightFixtureMarketsBodyStructure[] = [];
}
