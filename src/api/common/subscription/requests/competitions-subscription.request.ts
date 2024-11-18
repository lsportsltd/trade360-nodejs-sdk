import { Expose, Type } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';
import { CompetitionsSubscriptionRequestBodyStructure } from '@api/common/body-entities';

/**
 * CompetitionsSubscriptionRequest class for sending request to
 * subscribe to competitions from the API. It contains the
 * properties for the request to subscribe to competitions
 * from the API.
 * @param subscriptions The subscriptions to subscribe to in
 * the request to subscribe to competitions from the API.
 * @returns CompetitionsSubscriptionRequest instance that contains
 * the properties for the request to subscribe to competitions
 * from the API.
 */
export class CompetitionsSubscriptionRequest extends HttpRequestDto {
  @Expose()
  @Type(() => CompetitionsSubscriptionRequestBodyStructure)
  subscriptions?: CompetitionsSubscriptionRequestBodyStructure[];
}
