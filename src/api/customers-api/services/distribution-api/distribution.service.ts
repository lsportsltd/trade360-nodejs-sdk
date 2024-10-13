import { isNil } from 'lodash';

import { BaseHttpClient } from '@httpClient';

import { IPackageDistributionHttpClient } from '@api/customers-api';
import { HttpResponsePayloadDto, IHttpServiceConfig } from '@api/common';

import { ConsoleAdapter, ILogger } from '@logger';
import { BaseEntity } from '@entities';

import { DistributionRoutesPrefixUrl } from '.';

/**
 * PackageDistributionHttpClient class is responsible for sending requests to the distribution API.
 */
export class PackageDistributionHttpClient
  extends BaseHttpClient
  implements IPackageDistributionHttpClient
{
  protected logger: ILogger;

  constructor({ packageCredentials, customersApiBaseUrl, logger }: IHttpServiceConfig) {
    super({ customersApiBaseUrl, packageCredentials, logger });

    this.logger = !isNil(logger) ? logger : new ConsoleAdapter();
  }

  public async getDistributionStatus<TResponse extends BaseEntity>(
    responseBodyType: new () => TResponse,
  ): Promise<HttpResponsePayloadDto<TResponse>> {
    this.logger.debug('run  status request...');

    return this.sendRequest<TResponse>(
      DistributionRoutesPrefixUrl.STATUS_PREFIX_URL,
      responseBodyType,
    );
  }

  public async startDistribution<TResponse extends BaseEntity>(
    responseBodyType: new () => TResponse,
  ): Promise<HttpResponsePayloadDto<TResponse> | undefined> {
    this.logger.debug('run start request...');

    return this.sendRequest<TResponse>(
      DistributionRoutesPrefixUrl.START_PREFIX_URL,
      responseBodyType,
    );
  }

  public async stopDistribution<TResponse extends BaseEntity>(
    stopResponsePayloadDto: new () => TResponse,
  ): Promise<HttpResponsePayloadDto<TResponse> | undefined> {
    this.logger.debug('run stop request...');

    return this.sendRequest<TResponse>(
      DistributionRoutesPrefixUrl.STOP_PREFIX_URL,
      stopResponsePayloadDto,
    );
  }
}
