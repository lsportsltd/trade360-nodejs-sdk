import { IHttpServiceConfig, Mapper } from '@api/common';
import {
  ICustomersApiFactory,
  IMetadataHttpClient,
  IPackageDistributionHttpClient,
} from '@customers-api/interfaces';
import { MetadataHttpClient, PackageDistributionHttpClient } from '@customers-api/services';

/**
 * Factory class for creating package distribution HTTP client.
 * @implements ICustomersApiFactory interface for creating package
 * distribution HTTP client.
 * @see ICustomersApiFactory interface for creating package
 */
export class CustomersApiFactory implements ICustomersApiFactory {
  public createPackageDistributionHttpClient(
    httpServiceConfig: IHttpServiceConfig,
  ): IPackageDistributionHttpClient {
    return new PackageDistributionHttpClient(httpServiceConfig);
  }

  /**
   * createMetadataHttpClient method is responsible for creating
   * a new instance of the MetadataHttpClient class. It creates a
   * new instance of the MetadataHttpClient class with the provided
   * HTTP service configuration and mapper.
   * @param httpServiceConfig The HTTP service configuration for the
   * metadata HTTP client to use in sending requests to the metadata API.
   * @returns A new instance of the MetadataHttpClient class with the
   * provided HTTP service configuration and mapper.
   * @see MetadataHttpClient class for sending requests to the metadata API.
   * @see IHttpServiceConfig interface for the configuration of the HTTP service.
   * @see IMapper interface for mapping between different types of objects.
   * @see Mapper class for mapping between different types of objects in the application.
   */
  public createMetadataHttpClient(httpServiceConfig: IHttpServiceConfig): IMetadataHttpClient {
    const mapper = new Mapper(httpServiceConfig.packageCredentials);
    return new MetadataHttpClient(httpServiceConfig, mapper);
  }
}
