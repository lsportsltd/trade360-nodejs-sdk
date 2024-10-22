import { IHttpServiceConfig } from '@api/common';
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

  public createMetadataHttpClient(httpServiceConfig: IHttpServiceConfig): IMetadataHttpClient {
    // var mapper = _serviceProvider.GetRequiredService<IMapper>();
    return new MetadataHttpClient(httpServiceConfig /*, mapper*/);
  }
}
