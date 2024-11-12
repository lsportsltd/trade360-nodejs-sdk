import { Expose } from 'class-transformer';

import { BaseEntity } from '@entities';

/**
 * Package Quota Response class
 * (used for serialization) - represents the response
 * body of the package quota endpoint.
 */
export class PackageQuotaResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'CreditRemaining' })
  creditRemaining?: number;

  @Expose({ name: 'CreditLimit' })
  creditLimit?: number;

  @Expose({ name: 'UsedCredit' })
  usedCredit?: number;

  @Expose({ name: 'CurrentPeriodStartDate' })
  currentPeriodStartDate?: Date;

  @Expose({ name: 'CurrentPeriodEndDate' })
  currentPeriodEndDate?: Date;
}
