import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@entities';

import { MarketBodyStructure } from '../body-entities';

/**
 * MarketsCollectionResponse class is responsible for deserializing the response
 * from the metadata API to a collection of markets.
 */
export class MarketsCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Markets' })
  @Type(() => MarketBodyStructure)
  markets?: MarketBodyStructure[];
}
