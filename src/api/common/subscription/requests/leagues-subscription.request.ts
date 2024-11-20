import { Expose, Type } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';
import { LeaguesSubscriptionRequestBodyStructure } from '@api/common/body-entities';

/**
 * LeaguesSubscriptionRequest class is responsible
 * for sending requests to the subscription API to
 * subscribe to leagues. It is a HTTP request DTO
 * for subscribing to leagues in the subscription API.
 * @param subscriptions The subscriptions to the leagues
 * in the subscription API
 * @returns A new instance of the
 * LeaguesSubscriptionRequest class with the provided
 * subscriptions to the leagues in the subscription API.
 * @extends HttpRequestDto class for sending requests to
 * the subscription API to subscribe to leagues.
 */
export class LeaguesSubscriptionRequest extends HttpRequestDto {
  @Expose()
  @Type(() => LeaguesSubscriptionRequestBodyStructure)
  subscriptions?: LeaguesSubscriptionRequestBodyStructure[];
}
