import { Expose } from 'class-transformer';

/**
 * RequestSuspendedMarket class is responsible for
 * deserializing the response from the subscription
 * API to a suspended market.
 */
export class RequestSuspendedMarket {
  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose()
  marketId?: number;

  @Expose()
  line?: string;
}
