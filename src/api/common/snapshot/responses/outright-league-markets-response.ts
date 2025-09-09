import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { OutrightLeagueMarketsCompetition } from '@api/common/body-entities/responses/outright-league-market-competition';


/**
 * OutrightLeagueEventsCompetitionElement class is responsible
 * for deserializing the competition part of the response from the snapshot
 * API to get outright league events
 */
export class OutrightLeagueMarketsCompetitionElement implements BaseEntity {
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
  @Type(() => OutrightLeagueMarketsCompetition)
  competitions?: OutrightLeagueMarketsCompetition[];
}

/**
 * GetOutrightLeagueEventsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get outright league events
 */
export class GetOutrightLeagueMarketsResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Competition' })
  @Type(() => OutrightLeagueMarketsCompetitionElement)
  competition?: OutrightLeagueMarketsCompetitionElement[];
}
