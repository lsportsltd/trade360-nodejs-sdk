import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { OutrightFixtureMarketBodyStructure } from '@api/common/body-entities/responses/outright-fixture-market-body-structure';

/**
 * GetOutrightFixtureMarketsResultElement class is responsible
 * for deserializing the response from the snapshot
 * API to get outright fixture markets
 */
export class GetOutrightFixtureMarketsResultElement implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Markets' })
  @Type(() => OutrightFixtureMarketBodyStructure)
  markets?: OutrightFixtureMarketBodyStructure[];
}
