import { HttpResponsePayloadDto, ResponseBodyType } from "../../common";

export interface IDistributionHttpClient {
  startDistribution: <T extends ResponseBodyType>() => Promise<
    HttpResponsePayloadDto<T> | undefined
  >;
  stopDistribution: <T extends ResponseBodyType>() => Promise<
    HttpResponsePayloadDto<T> | undefined
  >;
  getDistributionStatus: <T extends ResponseBodyType>() => Promise<
    HttpResponsePayloadDto<T> | undefined
  >;
}