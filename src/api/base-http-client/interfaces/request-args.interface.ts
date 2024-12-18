import { BaseEntity, Constructor } from '@entities';
import {
  SubscriptionRoutesPrefixUrl,
  MetadataRoutesPrefixUrl,
  DistributionRoutesPrefixUrl,
} from '@api/customers-api/enums';
import { SnapshotRoutesPrefixUrl } from '@api/common';

export interface IRequestArgs<TResponse extends BaseEntity> {
  route:
    | SubscriptionRoutesPrefixUrl
    | MetadataRoutesPrefixUrl
    | DistributionRoutesPrefixUrl
    | SnapshotRoutesPrefixUrl;
  responseBodyType: Constructor<TResponse>;
  requestBody?: BaseEntity;
}
