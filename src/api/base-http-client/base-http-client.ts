import { AxiosError, AxiosResponse } from 'axios';
import { isNil, map } from 'lodash';

import { HttpRequestDto, HttpResponsePayloadDto, IHttpServiceConfig } from '@api/common';
import { BaseEntity } from '@entities';

import { HttpResponseError } from '@lsports/errors';

import { AxiosService } from '@httpClient/services';
import { RequestSettingsValidator } from '@httpClient/vaildators';

import { ILogger } from '@logger';
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
export class BaseHttpClient {
  protected httpService: IHttpService<HttpRequestDto>;

  protected baseUrl: string;

  protected requestSettings: HttpRequestDto;

  protected logger?: ILogger;

  constructor({ customersApiBaseUrl, packageCredentials, logger }: IHttpServiceConfig) {
    this.requestSettings = RequestSettingsValidator.validate({
      customersApiBaseUrl,
      ...packageCredentials,
    });

    this.logger = logger;

    this.baseUrl = encodeURI(customersApiBaseUrl!);

    this.httpService = new AxiosService<HttpRequestDto>(this.baseUrl, HttpRequestDto);
  }

  /**
   * This method is responsible for sending POST requests to
   * the customers API. basic POST request, with body contains
   * packageId, userName and password.
   * The request expect getting generic type R which declare
   * the expected response structure.
   * @param route string that represent the route expected to
   * be sent to
   * @returns  promise with the TResponse type response type
   */
  public async postRequest<TResponse extends BaseEntity>(
    route: string,
    responseBodyType: new () => TResponse,
  ): Promise<HttpResponsePayloadDto<TResponse> | undefined> {
    this.requestSettings = TransformerUtil.transform(this.requestSettings, HttpRequestDto);

    const responsePayloadDto = HttpResponsePayloadDto.createPayloadDto(responseBodyType);
    try {
      const response = await this.httpService?.post<TResponse>(route, this.requestSettings);

      return await this.handleValidResponse(response, responsePayloadDto);
    } catch (error) {
      this.handleErrorResponse(error, responsePayloadDto);
    }
  }

  /**
   * This method is responsible for handling the valid response.
   * It checks the status code of the response and throws an error
   *  if the status code is not valid.
   * @param httpResponse The response received from the API call
   * @param responsePayloadDto The response payload DTO to be used
   * for transforming the response
   * @returns The response payload DTO
   * @throws HttpResponseError if the status code is not valid
   * @throws HttpResponseError if the response does not contain the
   *  required properties
   */
  private async handleValidResponse<TResponse extends BaseEntity>(
    httpResponse: AxiosResponse<TResponse>,
    responsePayloadDto: new () => HttpResponsePayloadDto<TResponse>,
  ): Promise<HttpResponsePayloadDto<TResponse>> {
    const { status, data } = httpResponse;

    if (status < 200 || status >= 300)
      throw new HttpResponseError(
        `Invalid status code: ${status}. 
        Please ensure that you use the correct URL.`,
      );

    const responsePayload = TransformerUtil.transform(data, responsePayloadDto);

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

    return responsePayload;
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
