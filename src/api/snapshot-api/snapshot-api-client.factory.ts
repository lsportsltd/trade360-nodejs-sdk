import { BaseHttpClient } from '../base-http-client';
import { ILogger } from '../../logger';
import { IHttpServiceConfig } from '../common';
import { ISnapshotApiClient } from './interfaces/snapshot-api-client.interface';
import { SnapshotApiClient } from './snapshot-api-client';

/**
 * Factory for creating instances of the Snapshot API client.
 */
export class SnapshotApiClientFactory {
  /**
   * Creates a new instance of the Snapshot API client.
   * @param config The HTTP service configuration
   * @returns A new instance of the Snapshot API client
   */
  public createSnapshotApiClient(config: IHttpServiceConfig): ISnapshotApiClient {
    return new SnapshotApiClient(config);
  }
}
