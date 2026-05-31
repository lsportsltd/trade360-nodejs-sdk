import { Exclude, Expose, Type } from 'class-transformer';

import { BaseEntity } from '../../message-types';

import { MarketEvent } from '../market/market-event';

@Exclude()
export class OutrightLeagueCompetition<TEvent extends BaseEntity> {
  @Expose({ name: 'Id' })
  id?: number;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'Type' })
  type?: number;

  @Expose({ name: 'Competitions' })
  @Type(() => require('./outright-league-competitions').OutrightLeagueCompetitions)
  competitions?: import('./outright-league-competitions').OutrightLeagueCompetitions<TEvent>[];
}

export class OutrightLeagueMarketCompetition extends OutrightLeagueCompetition<MarketEvent> {
  @Expose({ name: 'NextFixtureStartTime' })
  @Type(() => Date)
  nextFixtureStartTime?: Date;
}
