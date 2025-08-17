import { BaseHttpClient } from '@httpClient';
import { IPackageDistributionHttpClient } from '@customers-api/interfaces';
import { DistributionRoutesPrefixUrl } from '@customers-api/enums';
import { IHttpServiceConfig } from '@api/common';
import { BaseEntity } from '@lsports/entities';

const { STATUS_PREFIX_URL, START_PREFIX_URL, STOP_PREFIX_URL } = DistributionRoutesPrefixUrl;

/**
 * PackageDistributionHttpClient class is responsible for sending
 * requests to the distribution API.
 * It extends the BaseHttpClient class and contains the logic for
 * sending requests to the distribution API.
 * @param packageCredentials The package credentials for the API
 * @param restApiBaseUrl The base URL of the customers API
 * @param logger The logger instance
 * @returns PackageDistributionHttpClient instance that is
 * responsible for sending requests to the distribution API.
 * @extends BaseHttpClient class for sending requests to the
 * customers API.
 * @implements IPackageDistributionHttpClient interface for
 * sending requests to the distribution API.
 * @see BaseHttpClient class for sending requests to the customers
 * API.
 * @see IPackageDistributionHttpClient interface for sending
 * requests to the distribution API.
 * @see IHttpServiceConfig interface for the configuration of the
 * HTTP service.
 * @see BaseEntity class for the base entity of the application.
 * @see DistributionRoutesPrefixUrl for the prefix URLs of the
 * distribution API.
 * @see HttpResponsePayloadDto class for the response payload of
 * the HTTP request.
 * @see IPackageDistributionHttpClient interface for sending
 * requests to the distribution API.
 */
export class PackageDistributionHttpClient
  extends BaseHttpClient
  implements IPackageDistributionHttpClient
{
  constructor({ packageCredentials, restApiBaseUrl, logger }: IHttpServiceConfig) {
    super({ restApiBaseUrl, packageCredentials, logger });
  }

  public async getDistributionStatus<TResponse extends BaseEntity>(
    responseBodyType: new () => TResponse,
  ): Promise<TResponse | undefined> {
    this.logger.debug('run  status request...');

    return this.postRequest<TResponse>({
      route: STATUS_PREFIX_URL,
      responseBodyType: responseBodyType,
    });
  }

  public async startDistribution<TResponse extends BaseEntity>(
    responseBodyType: new () => TResponse,
  ): Promise<TResponse | undefined> {
    this.logger.debug('run start request...');

    return this.postRequest<TResponse>({
      route: START_PREFIX_URL,
      responseBodyType: responseBodyType,
    });
  }

  public async stopDistribution<TResponse extends BaseEntity>(
    stopResponsePayloadDto: new () => TResponse,
  ): Promise<TResponse | undefined> {
    this.logger.debug('run stop request...');

    return this.postRequest<TResponse>({
      route: STOP_PREFIX_URL,
      responseBodyType: stopResponsePayloadDto,
    });
  }
}
