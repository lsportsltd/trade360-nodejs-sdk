import { BaseHttpClient } from '@httpClient';

import {
  IDistributionHttpClient,
  START_PREFIX_URL,
  STATUS_PREFIX_URL,
  STOP_PREFIX_URL,
  TRADE360_BASE_URL,
} from '@api/distribution-api';

import { HttpRequestDto, HttpResponsePayloadDto, ResponseBodyType } from '@api/common';
import { ILogger } from '@logger';

/**
 * Class that represent all distribution requests
 */
export class DistributionRequest extends BaseHttpClient implements IDistributionHttpClient {
  constructor(requestSettings: HttpRequestDto, logger: ILogger) {
    super(TRADE360_BASE_URL, requestSettings, logger);
  }

  startDistribution = async <TResponse extends ResponseBodyType>(): Promise<
    HttpResponsePayloadDto<TResponse> | undefined
  > => {
    this.logger.debug('run start request...');

    return this.sendRequest<HttpResponsePayloadDto<TResponse>>(START_PREFIX_URL);
  };

  stopDistribution = async <TResponse extends ResponseBodyType>(): Promise<
    HttpResponsePayloadDto<TResponse> | undefined
  > => {
    this.logger.debug('run stop request...');

    return this.sendRequest<HttpResponsePayloadDto<TResponse>>(STOP_PREFIX_URL);
  };

  getDistributionStatus = async <TResponse extends ResponseBodyType>(): Promise<
    HttpResponsePayloadDto<TResponse> | undefined
  > => {
    this.logger.debug('run status request...');

    return this.sendRequest<HttpResponsePayloadDto<TResponse>>(STATUS_PREFIX_URL);
  };
}
