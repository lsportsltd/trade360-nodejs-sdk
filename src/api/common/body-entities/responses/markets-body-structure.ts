import { Expose } from 'class-transformer';

/**
 * MarketBodyStructure class is responsible for
 * deserializing the response from the metadata
 * API to a market.
 */
export class MarketBodyStructure {
  @Expose({ name: 'Id' })
  id!: number;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'IsSettleable' })
  isSettleable?: boolean;
}
