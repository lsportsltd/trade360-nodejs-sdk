import { Expose, Type } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';
import { ManualSuspensionsRequestBodyStructure } from '@api/common/body-entities';

/**
 * ChangeManualSuspensionRequest class for sending request to
 * change manual suspensions from the API. It contains the
 * properties for the request to change manual suspensions
 * from the API.
 * @param suspensions The suspensions to change in the request
 * to change manual suspensions from the API.
 * @returns ChangeManualSuspensionRequest instance that contains
 * the properties for the request to change manual suspensions
 * from the API.
 */
export class ChangeManualSuspensionsRequest extends HttpRequestDto {
  @Expose()
  @Type(() => ManualSuspensionsRequestBodyStructure)
  suspensions?: ManualSuspensionsRequestBodyStructure[];
}
