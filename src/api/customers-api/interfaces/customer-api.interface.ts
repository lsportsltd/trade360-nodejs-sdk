import { IHttpServiceConfig } from '@api/common';

import { IPackageDistributionHttpClient } from './distribution-http-client.interface';

export interface ICustomersApiFactory {
  createPackageDistributionHttpClient(
    httpServiceConfig: IHttpServiceConfig,
  ): IPackageDistributionHttpClient;
}
