import { Expose } from 'class-transformer';

import { BaseEntity } from '@entities';

/**
 * SuspendedMarket class is responsible for deserializing
 * the response from the subscription API to a suspended
 * market.
 */
export class SuspendedMarket implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'MarketId' })
  marketId?: number;

  @Expose({ name: 'Line' })
  line?: string;
}
