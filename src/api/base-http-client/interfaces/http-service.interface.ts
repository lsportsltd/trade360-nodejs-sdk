import { AxiosResponse } from 'axios';

import { BaseEntity } from '@entities';

export interface IHttpService<TRequest extends BaseEntity> {
  /**
   *  GET request
   * @param url String that represent the url expect to sent to
   * @returns Promise with object of R structure
   */
  get: <TResponse extends BaseEntity>(
    url: string,
    // body: TRequest,
  ) => Promise<AxiosResponse<TResponse>>;

  /**
   * POST request
   * @param url String that represent the url expect to sent to
   * @param body Payload that represent the request body
   * @param responseBodyType Type of the response body expected
   * to be returned
   * @returns Promise with object of R structure
   */
  post: <TResponse extends BaseEntity>(
    url: string,
    body: TRequest,
  ) => Promise<AxiosResponse<TResponse>>;
}
