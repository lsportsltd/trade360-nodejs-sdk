import { Expose, Type } from 'class-transformer';

import { MarketBodyStructure } from '../body-entities';

/**
 * MarketsCollectionResponse class is responsible for deserializing the response
 * from the metadata API to a collection of markets.
 */
export class MarketsCollectionResponse {
  @Expose({ name: 'Markets' })
  @Type(() => MarketBodyStructure)
  markets?: MarketBodyStructure[];
}
