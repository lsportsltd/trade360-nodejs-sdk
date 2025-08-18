import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@entities';
import { SuspensionsBodyStructure } from '@api/common/body-entities';

/**
 * Get Manual Suspensions Response class
 * (used for serialization) - represents the response
 * body of the get manual suspensions endpoint.
 * This class is used to deserialize the response from the
 * get manual suspensions endpoint.
 * It contains the succeeded flag, reason, and suspensions.
 */
export class GetManualSuspensionsResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Succeeded' })
  succeeded!: boolean;

  @Expose({ name: 'Reason' })
  reason?: string;

  @Expose({ name: 'Suspensions' })
  @Type(() => SuspensionsBodyStructure)
  suspensions: SuspensionsBodyStructure[] = [];
}
