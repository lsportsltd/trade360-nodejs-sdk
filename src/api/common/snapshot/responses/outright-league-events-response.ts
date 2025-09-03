'use strict';

import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@entities';
import { OutrightLeagueEventsCompetition } from '@api/common/body-entities/responses/outright-league-events-competition';

/**
 * OutrightLeagueEventsCompetitionElement class is responsible
 * for deserializing the competition part of the response from the snapshot
 * API to get outright league events
 */
export class OutrightLeagueEventsCompetitionElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Id' })
  @Type(() => Number)
  public id!: number;

  @Expose({ name: 'Name' })
  @Type(() => String)
  public name!: string;

  @Expose({ name: 'Type' })
  @Type(() => Number)
  public type!: number;

  @Expose({ name: 'Competitions' })
  @Type(() => OutrightLeagueEventsCompetition)
  competitions?: OutrightLeagueEventsCompetition[];
}

/**
 * GetOutrightLeagueEventsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get outright league events
 */
export class GetOutrightLeagueEventsResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Competition' })
  @Type(() => OutrightLeagueEventsCompetitionElement)
  competition?: OutrightLeagueEventsCompetitionElement[];
}
