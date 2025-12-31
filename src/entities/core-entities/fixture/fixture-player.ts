import { Expose, Type } from 'class-transformer';

import { IdNNameRecord } from '@lsports/entities/common';

import { FixturePlayerInfo } from './fixture-player-info';

export class FixturePlayer {
  @Expose({ name: 'PlayerId' })
  public playerId?: number;

  @Expose({ name: 'ShirtNumber' })
  public shirtNumber?: string;

  @Expose({ name: 'IsCaptain' })
  public isCaptain?: boolean;

  @Expose({ name: 'IsStartingLineup' })
  public isStartingLineup?: boolean;

  @Expose({ name: 'Position' })
  @Type(() => IdNNameRecord)
  public position?: IdNNameRecord;

  @Expose({ name: 'State' })
  @Type(() => IdNNameRecord)
  public state?: IdNNameRecord;

  @Expose({ name: 'Player' })
  @Type(() => FixturePlayerInfo)
  public player?: FixturePlayerInfo;
}

