import { IHttpServiceConfig } from '@api/common';

import { InPlaySnapshotApiClient } from './snapshotapiinplay-http-client.interface';
import { PreMatchSnapshotApiClient } from './snapshotapiprematch-http-client.interface';

/**
 * Factory for creating Snapshot API clients.
 */
export interface ISnapshotApiFactory {
  /**
   * Create package distribution HTTP client.
   * @param httpServiceConfig - HTTP service configuration.
   * @param snapshotApiBaseUrl - snapshot API base URL.
   * @param packageCredentials - Package credentials.
   * @param logger - Logger.
   * @return A new instance of {@link InPlaySnapshotApiClient}
   */
  createSnapshotApiInPlayHttpClient: (
    httpServiceConfig: IHttpServiceConfig,
  ) => InPlaySnapshotApiClient;

  /**
   * Create metadata HTTP client.
   * @param httpServiceConfig - HTTP service configuration.
   * @param snapshotApiBaseUrl - Customers API base URL.
   * @param packageCredentials - Package credentials.
   * @param logger - Logger.
   * @param mapper - Mapper.
   * @return A new instance of {@link PreMatchSnapshotApiClient}
   */
  createSnapshotApiPrematchHttpClient: (
    httpServiceConfig: IHttpServiceConfig,
  ) => PreMatchSnapshotApiClient;
}
