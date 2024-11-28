import { HttpRequestDto } from '@api/common';
import {
  DistributionRoutesPrefixUrl,
  MetadataRoutesPrefixUrl,
  SubscriptionRoutesPrefixUrl,
} from '@api/customers-api';
import { BaseEntity, Constructor } from '@entities';

export interface IRequestArgs<TResponse extends BaseEntity> {
  route: SubscriptionRoutesPrefixUrl | MetadataRoutesPrefixUrl | DistributionRoutesPrefixUrl;
  responseBodyType: Constructor<TResponse>;
  requestBody?: HttpRequestDto;
}
