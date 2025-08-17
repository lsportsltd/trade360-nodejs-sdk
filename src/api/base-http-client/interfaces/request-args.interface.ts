import { BaseEntity, Constructor } from '@lsports/messages/types';
import { HttpRequestDto } from '@api/common';
import {
  DistributionRoutesPrefixUrl,
  MetadataRoutesPrefixUrl,
  SubscriptionRoutesPrefixUrl,
} from '@api/customers-api';
import {
  InplaySnapshotApiClientPrefixUrl,
  PrematchSnapshotApiClientPrefixUrl,
} from '@api/snapshot-api/enums';

/**
 * Interface for request arguments used in HTTP client methods
 */
export interface IRequestArgs<TResponse extends BaseEntity> {
  route:
    | SubscriptionRoutesPrefixUrl
    | MetadataRoutesPrefixUrl
    | DistributionRoutesPrefixUrl
    | InplaySnapshotApiClientPrefixUrl
    | PrematchSnapshotApiClientPrefixUrl;
  responseBodyType: Constructor<TResponse>;
  requestBody?: HttpRequestDto;
}
