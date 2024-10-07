import { IHttpServiceConfig } from '@api/common';

import { IPackageDistributionHttpClient } from './distribution-http-client.interface';

/**
 * Factory interface for creating package distribution HTTP client.
 */
export interface ICustomersApiFactory {
  /**
   * Create package distribution HTTP client.
   * @param httpServiceConfig - HTTP service configuration.
   * @returns Package distribution HTTP client.
   */
  createPackageDistributionHttpClient(
    httpServiceConfig: IHttpServiceConfig,
  ): IPackageDistributionHttpClient;
}
