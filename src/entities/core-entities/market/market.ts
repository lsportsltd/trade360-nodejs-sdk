import { Expose, Type } from 'class-transformer';

import { Bet } from './bet';
import { MarketStatus } from './market-status';
import { ProviderMarket } from './provider-market';
import { PredictionData } from './prediction-data';

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

  @Expose({ name: 'Status' })
  status?: MarketStatus;

  @Expose({ name: 'PredictionData' })
  @Type(() => PredictionData)
  predictionData?: PredictionData;
}
