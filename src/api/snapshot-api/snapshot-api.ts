import { IHttpServiceConfig, Mapper } from '@api/common';
import {
  ISnapshotApiFactory,
  InPlaySnapshotApiClient,
  PreMatchSnapshotApiClient,
} from '@api/snapshot-api/interfaces';
import {
  InPlaySnapshotApiClientImplementation,
  PreMatchSnapshotApiClientImplementation
} from '@api/snapshot-api/services';

/**
 * Factory class for creating snapshot HTTP client.
 * @implements ISnapshotApiFactory interface for creating snapshot
 *  HTTP client.
 * @see ISnapshotApiFactory interface for creating snapshot
 */
export class SnapshotApi implements ISnapshotApiFactory {
  
  public createSnapshotApiInPlayHttpClient(httpServiceConfig: IHttpServiceConfig): InPlaySnapshotApiClient {
    const mapper = new Mapper(httpServiceConfig.packageCredentials);
    return new InPlaySnapshotApiClientImplementation(httpServiceConfig, mapper);
  }

  public createSnapshotApiPrematchHttpClient(httpServiceConfig: IHttpServiceConfig): PreMatchSnapshotApiClient {
    const mapper = new Mapper(httpServiceConfig.packageCredentials);
    return new PreMatchSnapshotApiClientImplementation(httpServiceConfig, mapper);
  }
 }
