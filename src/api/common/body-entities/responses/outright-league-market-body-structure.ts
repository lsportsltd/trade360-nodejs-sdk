import { Expose, Type } from 'class-transformer';
import { OutrightLeagueMarketsCompetition } from '@api/common/body-entities/responses/outright-league-market-competition';
/**
 * OutrightLeagueMarketBodyStructure class is responsible
 * for deserializing the response from the snapshot
 * API to get outright league markets
 */
export class  OutrightLeagueMarketBodyStructure {
  @Expose({ name: 'Id' })
  @Type(() => Number)
  public id!: number;

  @Expose({ name: 'Name' })
  @Type(() => String)
  public name!: string;

  @Expose({ name: 'Type' })
  @Type(() => Number)
  public type!: number;

  @Expose({ name: 'Events' })
  @Type(() => OutrightLeagueMarketsCompetition)
  events?: OutrightLeagueMarketsCompetition[];
}
