import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { BaseEntity } from '@entities';

/**
 * Axios service instance for different API endpoints with
 * varying request and response types. class with a generic
 * type TRequest for the request body:
 * a generic type TRequest which represents the type of the
 * request body. and a response type TResponse and return
 * a promise of that response type TResponse.
 * @param TRequest Type of the request body
 * @param TResponse Type of the response body
 * @returns Promise with object of TResponse structure
 */
export class AxiosService<TRequest> {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   *  GET request
   * @param url String that represent the url expect to sent to
   * @returns Promise with object of R structure
   */
  public async get<TResponse>(url: string): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await this.axiosInstance.get(url);
    return response.data as TResponse;
  }

  /**
   * POST request
   * @param url String that represent the url expect to sent to
   * @param body Payload that represent the request body
   * @param responseBodyType Type of the response body expected
   * to be returned
   * @returns Promise with object of R structure
   */
  public async post<TResponse extends BaseEntity>(
    url: string,
    body: TRequest,
  ): Promise<AxiosResponse<TResponse>> {
    body = body as TRequest;
    return this.axiosInstance.post(url, body);
  }
}
