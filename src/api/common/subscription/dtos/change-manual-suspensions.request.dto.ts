import { Expose, Type } from 'class-transformer';

import { ManualSuspensionsRequestBodyStructure } from '@api/common/body-entities';
import { BaseEntity } from '@entities';

/**
 * ChangeManualSuspensionRequestDto class for sending
 * request to change manual suspensions from the API.
 * It contains the properties for the request to change
 * manual suspensions from the API.
 * @param suspensions The suspensions to change in the request
 * to change manual suspensions from the API.
 * @returns ChangeManualSuspensionRequestDto instance that
 * contains the properties for the request to change manual
 * suspensions from the API.
 */
export class ChangeManualSuspensionsRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose({ name: 'Suspensions' })
  @Type(() => ManualSuspensionsRequestBodyStructure)
  suspensions?: ManualSuspensionsRequestBodyStructure[];
}
