import { Expose, Type } from 'class-transformer';

import { Bet } from '@lsports/entities';

/**
 * Fixture Market Element Structure class is responsible for
 * deserializing the response from the snapshot API to a
 * fixture market element structure.
 */
export class FixtureMarketBodyStructure {
  @Expose({ name: 'id' })
  id!: number;

  @Expose({ name: 'Name' })
  name!: string;

  @Expose({ name: 'Bets' })
  @Type(() => Bet)
  bets: Bet[] = [];
}
