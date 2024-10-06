import { IHttpServiceConfig } from '@api/common';

import { ICustomersApiFactory, IPackageDistributionHttpClient } from '@customers-api/interfaces';
import { PackageDistributionHttpClient } from '@customers-api/services';

export class CustomersApiFactory implements ICustomersApiFactory {
  public createPackageDistributionHttpClient({
    baseUrl,
    packageCredentials,
    logger,
  }: IHttpServiceConfig): IPackageDistributionHttpClient {
    return new PackageDistributionHttpClient({ packageCredentials, baseUrl, logger });
  }
}
