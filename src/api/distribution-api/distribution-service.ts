import { BaseHttpClient } from "@httpClient";

import {
  START_PREFIX_URL,
  STATUS_PREFIX_URL,
  STOP_PREFIX_URL,
  TRADE360_BASE_URL,
  IDistributionHttpClient,
} from "@api/distribution-api";

import {
  HttpRequestDto,
  HttpResponsePayloadDto,
  ResponseBodyType,
} from "@api/common";

/**
 * Class that represent all distribution requests
 */
export class DistributionRequest
  extends BaseHttpClient
  implements IDistributionHttpClient
{
  constructor(requestSettings: HttpRequestDto, logger: Console) {
    super(TRADE360_BASE_URL, requestSettings, logger);
  }

  startDistribution = async <TResponse extends ResponseBodyType>(): Promise<
    HttpResponsePayloadDto<TResponse> | undefined
  > => {
    this.logger.log("run start request...");

    return await this.sendRequest<HttpResponsePayloadDto<TResponse>>(
      START_PREFIX_URL
    );
  };

  stopDistribution = async <TResponse extends ResponseBodyType>(): Promise<
    HttpResponsePayloadDto<TResponse> | undefined
  > => {
    this.logger.log("run stop request...");

    return await this.sendRequest<HttpResponsePayloadDto<TResponse>>(
      STOP_PREFIX_URL
    );
  };

  getDistributionStatus = async <TResponse extends ResponseBodyType>(): Promise<
    HttpResponsePayloadDto<TResponse> | undefined
  > => {
    this.logger.log("run status request...");

    return await this.sendRequest<HttpResponsePayloadDto<TResponse>>(
      STATUS_PREFIX_URL
    );

    // TODO: handle errors
  };
}
