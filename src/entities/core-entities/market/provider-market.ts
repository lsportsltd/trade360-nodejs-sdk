import { Expose, Type } from 'class-transformer';

import { ProviderBet } from './provider-bet';
import { MarketStatus } from './market-status';
import { PredictionData } from './prediction-data';

export class ProviderMarket {
  @Expose({ name: 'Id' })
  id?: number;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'Bets' })
  @Type(() => ProviderBet)
  Bets?: ProviderBet[];

  @Expose({ name: 'LastUpdate' })
  @Type(() => Date)
  lastUpdate?: Date;

  @Expose({ name: 'MarketStatus' })
  marketStatus?: MarketStatus;

  @Expose({ name: 'PredictionData' })
  @Type(() => PredictionData)
  predictionData?: PredictionData;
}
