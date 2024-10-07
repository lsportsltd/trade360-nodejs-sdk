import { IHttpServiceConfig } from '@api/common';

import { ICustomersApiFactory, IPackageDistributionHttpClient } from '@customers-api/interfaces';
import { PackageDistributionHttpClient } from '@customers-api/services';

/**
 * Factory class for creating package distribution HTTP client.
 */
export class CustomersApiFactory implements ICustomersApiFactory {
  /**
   * Create package distribution HTTP client.
   * @param customersApiBaseUrl - Customers API base URL.
   * @param packageCredentials - Package credentials.
   * @param logger - Logger.
   * @returns Package distribution HTTP client.
   */
  public createPackageDistributionHttpClient({
    customersApiBaseUrl,
    packageCredentials,
    logger,
  }: IHttpServiceConfig): IPackageDistributionHttpClient {
    return new PackageDistributionHttpClient({ packageCredentials, customersApiBaseUrl, logger });
  }
}
