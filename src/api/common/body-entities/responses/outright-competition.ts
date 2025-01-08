import { Expose } from 'class-transformer';

import { OutrightLeagueFixtureSnapshot } from './outright-league-fixture-snapshot';

/**
 * Outright Competition Structure class is responsible for
 * deserializing the response from the snapshot API to a
 * outright competition body structure.
 */
export class OutrightCompetition {
  @Expose({ name: 'FixtureId' })
  fixtureId!: number;

  @Expose({ name: 'OutrightLeague' })
  outrightLeague!: OutrightLeagueFixtureSnapshot;
}
