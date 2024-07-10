import {
  HttpRequestDto,
  HttpResponsePayloadDto,
  IDistributionHttpClient,
  ResponseBodyType,
  START_PREFIX_URL,
  STATUS_PREFIX_URL,
  STOP_PREFIX_URL,
  TRADE360_BASE_URL,
} from "../";
import { BaseHttpClient } from "../base-http-client";

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

  /**
   * open distribution for provider queue
   * @returns Promise<HttpResponsePayloadDto<T>>
   */
  startDistribution = async <T extends ResponseBodyType>(): Promise<
    HttpResponsePayloadDto<T> | undefined
  > => {
    this.logger.log("run start request...");

    return await this.sendRequest<HttpResponsePayloadDto<T>>(START_PREFIX_URL);
  };
  /**
   * close distribution for provider queue
   * @returns Promise<HttpResponsePayloadDto<T>>
   */
  stopDistribution = async <T extends ResponseBodyType>(): Promise<
    HttpResponsePayloadDto<T> | undefined
  > => {
    this.logger.log("run stop request...");

    return await this.sendRequest<HttpResponsePayloadDto<T>>(STOP_PREFIX_URL);
  };

  /**
   * get distribution status for provider queue
   * @returns Promise<HttpResponsePayloadDto<T>>
   */
  getDistributionStatus = async <T extends ResponseBodyType>(): Promise<
    HttpResponsePayloadDto<T> | undefined
  > => {
    this.logger.log("run status request...");

    return await this.sendRequest<HttpResponsePayloadDto<T>>(STATUS_PREFIX_URL);

    // TODO: handle errors
  };
}
