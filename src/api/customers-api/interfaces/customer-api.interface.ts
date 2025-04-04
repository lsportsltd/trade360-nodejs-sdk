import { IHttpServiceConfig } from '@api/common';

import { IPackageDistributionHttpClient } from './distribution-http-client.interface';
import { IMetadataHttpClient } from './metadata-http-client.interface';
import { ISubscriptionHttpClient } from './subscription-http-client.interface';

/**
 * Factory interface for creating package distribution
 * HTTP client.
 */
export interface ICustomersApiFactory {
  /**
   * Create package distribution HTTP client.
   * @param httpServiceConfig - HTTP service configuration.
   * @param customersApiBaseUrl - Customers API base URL.
   * @param packageCredentials - Package credentials.
   * @param logger - Logger.
   * @returns Package distribution HTTP client.
   */
  createPackageDistributionHttpClient: (
    httpServiceConfig: IHttpServiceConfig,
  ) => IPackageDistributionHttpClient;

  /**
   * Create metadata HTTP client.
   * @param httpServiceConfig - HTTP service configuration.
   * @param customersApiBaseUrl - Customers API base URL.
   * @param packageCredentials - Package credentials.
   * @param logger - Logger.
   * @param mapper - Mapper.
   * @returns Metadata HTTP client.
   */
  createMetadataHttpClient: (httpServiceConfig: IHttpServiceConfig) => IMetadataHttpClient;

  /**
   * Create subscription HTTP client.
   * @param httpServiceConfig - HTTP service configuration.
   * @param customersApiBaseUrl - Customers API base URL.
   * @param packageCredentials - Package credentials.
   * @param logger - Logger.
   * @param mapper - Mapper.
   * @returns Subscription HTTP client.
   */
  createSubscriptionHttpClient: (httpServiceConfig: IHttpServiceConfig) => ISubscriptionHttpClient;
}
