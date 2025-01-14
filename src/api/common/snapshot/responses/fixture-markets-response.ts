import { Expose, Type } from 'class-transformer';
import { MarketEvent } from '@lsports/entities';
import { BaseEntity } from '@entities';
/**
 * GetFixtureMarketsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get get fixture markets
 */
export class GetFixtureMarketsResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Markets' })
  @Type(() => MarketEvent)
  markets?: MarketEvent[];
}
