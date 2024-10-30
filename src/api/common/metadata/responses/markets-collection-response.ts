import { Expose, Type } from 'class-transformer';

import { MarketBodyStructure } from '../body-entities';

export class MarketsCollectionResponse {
  @Expose({ name: 'Markets' })
  @Type(() => MarketBodyStructure)
  markets?: MarketBodyStructure[];
}
