import { Expose, Type } from 'class-transformer';

import { NameValueRecord } from '@lsports/entities/common';

import { Period } from './period';
import { Scoreboard } from './scoreboard';
import { Statistic } from './statistic';
import { CurrentIncident } from './current-incident';
import { DangerIndicator } from './danger-indicator';

export class Livescore {
  @Expose({ name: 'Scoreboard' })
  @Type(() => Scoreboard)
  scoreboard?: Scoreboard;

  @Expose({ name: 'Periods' })
  @Type(() => Period)
  periods?: Period[];

  @Expose({ name: 'Statistics' })
  @Type(() => Statistic)
  statistics?: Statistic[];

  @Expose({ name: 'LivescoreExtraData' })
  @Type(() => NameValueRecord)
  livescoreExtraData?: NameValueRecord[];

  @Expose({ name: 'CurrentIncident' })
  @Type(() => CurrentIncident)
  currentIncident?: CurrentIncident;

  @Expose({ name: 'DangerTriggers' })
  @Type(() => DangerIndicator)
  dangerTriggers?: DangerIndicator[];
}
