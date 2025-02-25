import { Expose, Type } from 'class-transformer';

import { ProviderBet } from './provider-bet';

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
}
}