import { HttpResponsePayloadDto } from '@api/common';
import { BaseEntity } from '@entities';

/**
 * IPackageDistributionHttpClient interface is responsible for sending requests to the distribution API.
 */
export interface IPackageDistributionHttpClient {
  /**
   * start distribution for provider queue
   * @returns Promise<HttpResponsePayloadDto<TResponse>>
   * @param responseBodyType response body type to be returned
   */
  startDistribution: <TResponse extends BaseEntity>(
    responseBodyType: new () => TResponse,
  ) => Promise<HttpResponsePayloadDto<TResponse> | undefined>;

  /**
   * close distribution for provider queue
   * @returns Promise<HttpResponsePayloadDto<TResponse>>
   * @param responseBodyType response body type to be returned
   */
  stopDistribution: <TResponse extends BaseEntity>(
    responseBodyType: new () => TResponse,
  ) => Promise<HttpResponsePayloadDto<TResponse> | undefined>;

  /**
   * get the status of the distribution service
   * @returns Promise<HttpResponsePayloadDto<TResponse>>
   * @param responseBodyType response body type to be returned
   */
  getDistributionStatus: <TResponse extends BaseEntity>(
    responseBodyType: new () => TResponse,
  ) => Promise<HttpResponsePayloadDto<TResponse> | undefined>;
}
