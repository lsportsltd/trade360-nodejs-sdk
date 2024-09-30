import { Expose, Type } from 'class-transformer';

import { Bet } from './bet';

export class Provider {
  @Expose({ name: 'id' })
  Id?: number;

  @Expose({ name: 'name' })
  Name?: string;

  @Expose({ name: 'lastUpdate' })
  @Type(() => Date)
  LastUpdate?: Date;

  @Expose({ name: 'providerFixtureId' })
  ProviderFixtureId?: string;

  @Expose({ name: 'providerLeagueId' })
  ProviderLeagueId?: string;

  @Expose({ name: 'providerMarketId' })
  ProviderMarketId?: string;

  @Expose({ name: 'bets' })
  @Type(() => Bet)
  Bets?: Bet[];
}
