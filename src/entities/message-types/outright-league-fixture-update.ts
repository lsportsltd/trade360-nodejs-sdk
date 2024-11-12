import { Expose, Type } from 'class-transformer';

import { EntityKey } from '@lsports/decorators';
import { OutrightLeagueCompetition, OutrightLeagueFixtureEvent } from '@lsports/entities';

import { BaseEntity } from './';

@EntityKey(38)
export class OutrightLeagueFixtureUpdate implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Competition' })
  @Type(() => OutrightLeagueCompetition)
  competition?: OutrightLeagueCompetition<OutrightLeagueFixtureEvent>;
}
