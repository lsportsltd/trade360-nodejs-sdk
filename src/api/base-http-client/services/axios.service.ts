import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { BaseEntity } from '@lsports/entities';
import { IdSafeJsonParser } from '@utilities';

import { IHttpService } from '@httpClient/interfaces';

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
export class AxiosService<TRequest extends BaseEntity> implements IHttpService<TRequest> {
  private axiosInstance: AxiosInstance;

  private configRequest: AxiosRequestConfig = {
    validateStatus: function (status): boolean {
      return status >= 200 && status < 300; // Resolve only if the status
      // code is above then 200 and less then 300
    },
    transformResponse: [
      function (data: unknown): unknown {
        if (typeof data === 'string') {
          try {
            return IdSafeJsonParser.parse<TRequest>(data);
          } catch (e) {
            return data;
          }
        }
        return data;
      },
    ],
  };

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async get<TResponse extends BaseEntity>(url: string): Promise<AxiosResponse<TResponse>> {
    return this.axiosInstance.get(url, this.configRequest);
  }

  public async post<TResponse extends BaseEntity>(
    url: string,
    body: TRequest,
  ): Promise<AxiosResponse<TResponse>> {
    return this.axiosInstance.post(url, body, this.configRequest);
  }
}
