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

InplaySnapshotApiClientPrefixUrl;
import { BaseEntity, Constructor } from '@entities';

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
