import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { parse, isInteger } from 'lossless-json';

import { BaseEntity } from '@entities';

import { IHttpService } from '../interfaces';

/**
 * Custom number parser for lossless-json that converts large positive integers to BigInt
 * and other numeric values to regular numbers. Since ID values are always positive,
 * we only need to handle large positive integers to prevent precision loss.
 */
function customNumberParser(value: string): number | bigint {
  if (isInteger(value)) {
    // For positive integers only (since IDs are always positive)
    if (!value.startsWith('-')) {
      // For very long numbers (17+ digits), definitely use BigInt
      if (value.length > 16) {
        return BigInt(value);
      }

      // For 16-digit numbers, compare against MAX_SAFE_INTEGER as string
      if (value.length === 16) {
        const maxSafeIntegerStr = '9007199254740991';
        if (value > maxSafeIntegerStr) {
          return BigInt(value);
        }
      }
    }

    // Safe to convert to number (includes all negative numbers and safe positive numbers)
    return parseInt(value, 10);
  }
  return parseFloat(value);
}

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
    // Override the default JSON parsing to use lossless-json
    transformResponse: [
      function (data: string): unknown {
        if (typeof data === 'string') {
          try {
            // Use lossless-json to parse with BigInt support for large integers
            return parse(data, undefined, customNumberParser);
          } catch (error) {
            // If lossless-json fails, return the original data
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
