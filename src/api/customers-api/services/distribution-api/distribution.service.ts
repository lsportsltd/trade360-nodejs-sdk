import { isNil } from 'lodash';

import { BaseHttpClient } from '@httpClient';

import { IDistributionHttpClient } from '@api';
import { HttpResponsePayloadDto, IHttpServiceConfig, ResponseBodyType } from '@api/common';

import { ConsoleAdapter, ILogger } from '@logger';
import { DistributionRoutesPrefixUrl } from '.';

/**
 * PackageDistributionHttpClient class is responsible for sending requests to the distribution API.
 */
export class PackageDistributionHttpClient
  extends BaseHttpClient
  implements IDistributionHttpClient
{
  protected logger: ILogger;

  constructor({ packageCredentials, baseUrl, logger }: IHttpServiceConfig) {
    super({ baseUrl, packageCredentials, logger });

    this.logger = !isNil(logger) ? logger : new ConsoleAdapter();
  }

  public async startDistribution<TResponse extends ResponseBodyType>(): Promise<
    HttpResponsePayloadDto<TResponse> | undefined
  > {
    this.logger.debug('run start request...');

    return this.sendRequest<HttpResponsePayloadDto<TResponse>>(
      DistributionRoutesPrefixUrl.START_PREFIX_URL,
    );
  }

  public async stopDistribution<TResponse extends ResponseBodyType>(): Promise<
    HttpResponsePayloadDto<TResponse> | undefined
  > {
    this.logger.debug('run stop request...');

    return this.sendRequest<HttpResponsePayloadDto<TResponse>>(
      DistributionRoutesPrefixUrl.STOP_PREFIX_URL,
    );
  }

  public async getDistributionStatus<TResponse extends ResponseBodyType>(): Promise<
    HttpResponsePayloadDto<TResponse> | undefined
  > {
    this.logger.debug('run status request...');

    return this.sendRequest<HttpResponsePayloadDto<TResponse>>(
      DistributionRoutesPrefixUrl.STATUS_PREFIX_URL,
    );
  }
}
