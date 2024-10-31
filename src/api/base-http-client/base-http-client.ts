import { AxiosError, AxiosResponse } from 'axios';
import { isNil, map } from 'lodash';

import { HttpRequestDto, HttpResponsePayloadDto, IHttpServiceConfig } from '@api/common';
import { BaseEntity } from '@entities';
import { HttpResponseError } from '@lsports/errors';
import { AxiosService } from '@httpClient/services';
import { RequestSettingsValidator } from '@httpClient/validators';
import { ConsoleAdapter, ILogger } from '@logger';
import { TransformerUtil } from '@utilities';

import { IHttpService } from './interfaces';

/**
 * BaseHttpClient class is responsible for sending requests
 * to the customers API. It is a base class for all HTTP clients.
 * It contains the basic logic for sending requests.
 * @param customersApiBaseUrl The base URL of the customers API
 * @param packageCredentials The package credentials for the API
 * @param logger The logger instance
 */
export abstract class BaseHttpClient {
  protected readonly httpService: IHttpService<HttpRequestDto>;

  protected readonly baseUrl: string;

  protected requestSettings: HttpRequestDto;

  protected readonly logger: ILogger;

  constructor({ customersApiBaseUrl, packageCredentials, logger }: IHttpServiceConfig) {
    this.requestSettings = RequestSettingsValidator.validate({
      customersApiBaseUrl,
      ...packageCredentials,
    });

    this.logger = !isNil(logger) ? logger : new ConsoleAdapter();

    this.baseUrl = encodeURI(customersApiBaseUrl!);

    this.httpService = new AxiosService<HttpRequestDto>(this.baseUrl);
  }

  /**
   * This method is responsible for sending POST requests to
   * the customers API. basic POST request, with body contains
   * packageId, userName and password.
   * The request expect getting generic type R which declare
   * the expected response structure.
   * @param route string that represent the route expected to
   * be sent to the API endpoint.
   * @param responseBodyType new instance of the expected response
   * structure.
   * @param requestBody optional parameter that represent the body
   * of the request.
   * @returns  promise with the TResponse type response type of
   * the API.
   */
  protected async postRequest<TResponse extends BaseEntity>(
    route: string,
    responseBodyType: new () => TResponse,
    requestBody?: HttpRequestDto,
  ): Promise<HttpResponsePayloadDto<TResponse> | undefined> {
    this.requestSettings = !isNil(requestBody)
      ? requestBody
      : TransformerUtil.transform(this.requestSettings, HttpRequestDto);

    const responsePayloadDto = HttpResponsePayloadDto.createPayloadDto(responseBodyType);
    try {
      const response = await this.httpService.post<TResponse>(route, this.requestSettings);

      return await this.handleValidResponse(response, responsePayloadDto);
    } catch (error) {
      this.handleErrorResponse(error, responsePayloadDto);
    }
  }

  protected async getRequest<TResponse extends BaseEntity>(
    route: string,
    params?: Record<string, string>,
    // responseBodyType?: new () => TResponse,
  ): Promise<TResponse> {
    // Implement your GET logic here
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    const response = await fetch(`${this.baseUrl}/${route}${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any authorization headers based on packageCredentials
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as TResponse;
  }

  /**
   * This method is responsible for handling the valid response.
   * @param httpResponse The response received from the API call
   * @param responsePayloadDto The response payload DTO to be used
   * for transforming the response
   * @returns The response payload DTO
   * @throws HttpResponseError if the response does not contain the
   *  required properties
   */
  private async handleValidResponse<TResponse extends BaseEntity>(
    httpResponse: AxiosResponse<TResponse>,
    responsePayloadDto: new () => HttpResponsePayloadDto<TResponse>,
  ): Promise<HttpResponsePayloadDto<TResponse>> {
    const { data } = httpResponse;

    const responsePayload = TransformerUtil.transform(data, responsePayloadDto);

    this.validateResponsePayloadStructure(responsePayload);

    return responsePayload;
  }

  /**
   * This method is responsible for validating the structure of the
   * response payload. It checks if the response payload contains the
   * required properties.
   * @param responsePayload The response payload to be validated
   * @returns void
   * @throws HttpResponseError if the response payload does not contain
   * the required properties
   */
  private validateResponsePayloadStructure<TResponse extends BaseEntity>(
    responsePayload: HttpResponsePayloadDto<TResponse>,
  ): void {
    const { header, body } = responsePayload;

    if (isNil(header)) {
      throw new HttpResponseError(
        "'Header' property is missing. Please ensure that you use the correct URL.",
      );
    }
    if (isNil(body)) {
      throw new HttpResponseError(
        "'Body' property is missing. Please ensure that you use the correct URL.",
      );
    }
  }

  /**
   * This method is responsible for handling the error response.
   * It throws an error with the appropriate message based on the error
   * response received. If the error response is not an AxiosError, it
   * throws the error as is.
   * @param errorResponse The error response received from the API call
   * @param responsePayloadDto The response payload DTO to be used for
   * transforming the error response
   * @returns void
   * @throws HttpResponseError if the error response contains errors in
   * the response body, it throws an error with the error messages as
   * the context of the error response
   * @throws HttpResponseError if the error response is not an AxiosError
   * or if the error response is an AxiosError with a status code that is
   * not handled by the HttpResponseError class
   */
  private handleErrorResponse<TResponse extends BaseEntity>(
    errorResponse: unknown,
    responsePayloadDto: new () => HttpResponsePayloadDto<TResponse>,
  ): void {
    if (isNil(errorResponse)) {
      throw new HttpResponseError('API call failed', { context: 'No response received' });
    } else if (!(errorResponse instanceof AxiosError)) throw errorResponse;

    const { response, message, cause } = errorResponse;

    const rawErrorResponse = errorResponse.toString();

    if (isNil(response)) {
      throw new HttpResponseError(`API call failed with message: ${message}`, {
        context: rawErrorResponse,
        cause,
      });
    }

    const { data, statusText } = response;

    if (!isNil(data)) {
      throw HttpResponseError.getHttpResponseErrorByStatusCode(
        undefined,
        rawErrorResponse,
        statusText,
        message,
      );
    }
    const {
      header: { httpStatusCode, errors },
    } = TransformerUtil.transform(data, responsePayloadDto);

    if (!isNil(errors)) {
      const errorsArray = map(errors, (error) => error.message);

      throw new HttpResponseError('API call failed', {
        context: errorsArray,
        cause: errorResponse,
      });
    }

    throw HttpResponseError.getHttpResponseErrorByStatusCode(
      httpStatusCode,
      rawErrorResponse,
      statusText,
      message,
    );
  }
}
