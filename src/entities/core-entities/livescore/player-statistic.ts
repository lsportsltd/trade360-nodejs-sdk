import { Expose, Type } from 'class-transformer';

import { StatisticValue } from './statistic-value';

export class PlayerStatistic{
    @Expose({ name: 'PlayerId' })
    playerId?: number;

    @Expose({ name: 'Statistics' })
    @Type(() => StatisticValue)
    statistics?: StatisticValue[];

    @Expose({ name: 'PlayerName' })
    playerName?: string;

    @Expose({ name: 'TeamId'})
    teamId?: number;

    @Expose({ name: 'HasPlayed' })
    hasPlayed?: boolean;
}