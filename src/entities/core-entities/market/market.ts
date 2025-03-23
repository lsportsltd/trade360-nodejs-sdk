import { Expose, Type } from 'class-transformer';

import { Bet } from './bet';
import { ProviderMarket } from './provider-market';

export class Market {
  @Expose({ name: 'Id' })
  id?: number;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'Bets' })
  @Type(() => Bet)
  bets?: Bet[];

  @Expose({ name: 'ProviderMarkets' })
  @Type(() => ProviderMarket)
  providerMarkets?: ProviderMarket[];

  @Expose({ name: 'MainLine' })
  mainLine?: string;
}
