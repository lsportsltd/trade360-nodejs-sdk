import { HttpResponsePayloadDto, ResponseBodyType } from '@api/common';

export interface IPackageDistributionHttpClient {
  /**
   * open distribution for provider queue
   * @returns Promise<HttpResponsePayloadDto<TResponse>>
   */
  startDistribution: <TResponse extends ResponseBodyType>() => Promise<
    HttpResponsePayloadDto<TResponse> | undefined
  >;

  /**
   * close distribution for provider queue
   * @returns Promise<HttpResponsePayloadDto<TResponse>>
   */
  stopDistribution: <TResponse extends ResponseBodyType>() => Promise<
    HttpResponsePayloadDto<TResponse> | undefined
  >;

  /**
   * get distribution status for provider queue
   * @returns Promise<HttpResponsePayloadDto<TResponse>>
   */
  getDistributionStatus: <TResponse extends ResponseBodyType>() => Promise<
    HttpResponsePayloadDto<TResponse> | undefined
  >;
}
