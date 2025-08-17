import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@lsports/entities';
import { SuspensionsChangeBodyStructure } from '@api/common/body-entities';

/**
 * Change Manual Suspensions Response class
 * (used for serialization) - represents the response
 * body of the change manual suspensions endpoint.
 * This class is used to deserialize the response from the
 * change manual suspensions endpoint.
 * It contains the suspensions change body structure,
 * succeeded, and reason properties.
 */
export class ChangeManualSuspensionsResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Succeeded' })
  succeeded!: boolean;

  @Expose({ name: 'Reason' })
  reason?: string;

  @Expose({ name: 'Suspensions' })
  @Type(() => SuspensionsChangeBodyStructure)
  suspensions: SuspensionsChangeBodyStructure[] = [];
}
