import { Expose, Type } from 'class-transformer';

import { Bet, MarketStatus, ProviderMarket } from '@lsports/entities';

/**
 * Outright Market Element Structure class is responsible for
 * deserializing the response from the snapshot API to a
 * outright market element structure.
 */
export class OutrightMarketBodyStructure {
  @Expose({ name: 'Id' })
  id!: number;

  @Expose({ name: 'Name' })
  name!: string;

  @Expose({ name: 'Bets' })
  @Type(() => Bet)
  bets: Bet[] = [];

  @Expose({ name: 'ProviderMarkets' })
  @Type(() => ProviderMarket)
  providerMarkets?: ProviderMarket[];

  @Expose({ name: 'Status' })
  status?: MarketStatus;
}
