import { BaseHttpClient } from '@httpClient';

import { IPackageDistributionHttpClient } from '@api/customers-api';
import { HttpResponsePayloadDto, IHttpServiceConfig } from '@api/common';

import { BaseEntity } from '@entities';

import { DistributionRoutesPrefixUrl } from '.';

/**
 * PackageDistributionHttpClient class is responsible for sending
 * requests to the distribution API.
 * It extends the BaseHttpClient class and contains the logic for
 * sending requests to the distribution API.
 * @param packageCredentials The package credentials for the API
 * @param customersApiBaseUrl The base URL of the customers API
 * @param logger The logger instance
 * @returns PackageDistributionHttpClient instance that is
 * responsible for sending requests to the distribution API.
 * @extends BaseHttpClient class for sending requests to the
 * customers API.
 * @implements IPackageDistributionHttpClient interface for sending
 * requests to the distribution API.
 * @see BaseHttpClient class for sending requests to the customers API.
 */
export class PackageDistributionHttpClient
  extends BaseHttpClient
  implements IPackageDistributionHttpClient
{
  constructor({ packageCredentials, customersApiBaseUrl, logger }: IHttpServiceConfig) {
    super({ customersApiBaseUrl, packageCredentials, logger });
  }

  public async getDistributionStatus<TResponse extends BaseEntity>(
    responseBodyType: new () => TResponse,
  ): Promise<HttpResponsePayloadDto<TResponse> | undefined> {
    this.logger.debug('run  status request...');

    return this.postRequest<TResponse>(
      DistributionRoutesPrefixUrl.STATUS_PREFIX_URL,
      responseBodyType,
    );
  }

  public async startDistribution<TResponse extends BaseEntity>(
    responseBodyType: new () => TResponse,
  ): Promise<HttpResponsePayloadDto<TResponse> | undefined> {
    this.logger.debug('run start request...');

    return this.postRequest<TResponse>(
      DistributionRoutesPrefixUrl.START_PREFIX_URL,
      responseBodyType,
    );
  }

  public async stopDistribution<TResponse extends BaseEntity>(
    stopResponsePayloadDto: new () => TResponse,
  ): Promise<HttpResponsePayloadDto<TResponse> | undefined> {
    this.logger.debug('run stop request...');

    return this.postRequest<TResponse>(
      DistributionRoutesPrefixUrl.STOP_PREFIX_URL,
      stopResponsePayloadDto,
    );
  }
}
