import { Expose, Type } from 'class-transformer';

import { Bet } from '@lsports/entities/market/bet';

/**
 * Outright Market Element Structure class is responsible for
 * deserializing the response from the snapshot API to a
 * outright market element structure.
 */
export class OutrightMarketElement {
  @Expose({ name: 'id' })
  id!: number;

  @Expose({ name: 'Name' })
  name!: string;

  @Expose({ name: 'Bets' })
  @Type(() => Bet)
  bets: Bet[] = [];
}
