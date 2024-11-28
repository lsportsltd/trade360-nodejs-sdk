import { BaseEntity, Constructor } from '@entities';

/**
 * IPackageDistributionHttpClient interface is responsible
 * for sending requests to the distribution API.
 */
export interface IPackageDistributionHttpClient {
  /**
   * start distribution for provider queue and return the
   * response body type
   * @returns Promise<HttpResponsePayloadDto<TResponse>>
   * @param responseBodyType response body type to be returned
   * @returns Promise<HttpResponsePayloadDto<TResponse>>
   */
  startDistribution: <TResponse extends BaseEntity>(
    responseBodyType: Constructor<TResponse>,
  ) => Promise<TResponse | undefined>;

  /**
   * close distribution for provider queue and return the
   * response body type
   * @returns Promise<HttpResponsePayloadDto<TResponse>>
   * @param responseBodyType response body type to be returned
   * @returns Promise<HttpResponsePayloadDto<TResponse>>
   */
  stopDistribution: <TResponse extends BaseEntity>(
    responseBodyType: Constructor<TResponse>,
  ) => Promise<TResponse | undefined>;

  /**
   * get the status of the distribution service and return the
   * response body type
   * @returns Promise<HttpResponsePayloadDto<TResponse>>
   * @param responseBodyType response body type to be returned
   * @returns Promise<HttpResponsePayloadDto<TResponse>>
   */
  getDistributionStatus: <TResponse extends BaseEntity>(
    responseBodyType: Constructor<TResponse>,
  ) => Promise<TResponse | undefined>;
}
