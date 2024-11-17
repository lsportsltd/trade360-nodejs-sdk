import { Expose } from 'class-transformer';

import { BaseEntity } from '@entities';

/**
 * RequestSuspendedMarket class is responsible for
 * deserializing the response from the subscription
 * API to a suspended market.
 */
export class RequestSuspendedMarket implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose()
  marketId?: number;

  @Expose()
  line?: string;
}
