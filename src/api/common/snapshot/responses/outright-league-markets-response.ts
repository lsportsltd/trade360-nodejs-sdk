import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { OutrightLeagueMarketBodyStructure } from '@api/common/body-entities/responses/outright-league-market-body-structure';

/**
 * GetOutrightLeagueMarketsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get outright league markets
 */
export class GetOutrightLeagueMarketsResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Markets' })
  @Type(() => OutrightLeagueMarketBodyStructure)
  markets?: OutrightLeagueMarketBodyStructure[];
}
