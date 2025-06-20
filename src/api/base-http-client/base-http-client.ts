import { AxiosError, AxiosResponse } from 'axios';
import { forEach, isArray, isNil, map } from 'lodash';

import { HttpRequestDto, IHttpServiceConfig } from '@api/common';
import { HttpResponsePayloadDto } from '@api/common/dtos/http-response.dto';
import { BaseEntity, Constructor } from '@entities';
import { HttpResponseError } from '@lsports/errors';
import { AxiosService } from '@httpClient/services';
import { RequestSettingsValidator } from '@httpClient/validators';
import { ConsoleAdapter, ILogger } from '@logger';
import { TransformerUtil } from '@utilities';

import { IHttpService, IRequestArgs } from './interfaces';

/**
 * BaseHttpClient class is responsible for sending requests
 * to the REST API. It is a base class for all HTTP clients.
 * It contains the basic logic for sending requests.
 * @param apiBaseUrl The base URL of the REST API
 * @param packageCredentials The package credentials for the API
 * @param logger The logger instance to be used for logging
 */
export abstract class BaseHttpClient {
  protected readonly httpService: IHttpService<HttpRequestDto>;

  protected readonly baseUrl: string;

  protected requestSettings: HttpRequestDto;

  protected readonly logger: ILogger;

  constructor({ restApiBaseUrl, packageCredentials, logger }: IHttpServiceConfig) {
    this.requestSettings = RequestSettingsValidator.validate({
      restApiBaseUrl,
      ...packageCredentials,
    });

    this.logger = !isNil(logger) ? logger : new ConsoleAdapter();

    this.baseUrl = encodeURI(restApiBaseUrl!);

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
  protected async postRequest<TResponse extends BaseEntity>({
    route,
    responseBodyType,
    requestBody,
  }: IRequestArgs<TResponse>): Promise<TResponse | undefined> {
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

  /**
   * This method is responsible for sending GET requests to the
   * customers API. The request expect getting generic type R which
   * declare the expected response structure.
   * @param route string that represent the route expected to be
   * sent to the API endpoint.
   * @param responseBodyType new instance of the expected response
   * structure.
   * @param params optional parameter that represent the query
   * parameters of the request.
   * @returns promise with the TResponse type response type of the
   * API.
   */
  protected async getRequest<TResponse extends BaseEntity>({
    route,
    responseBodyType,
    requestBody: params,
  }: IRequestArgs<TResponse>): Promise<TResponse | undefined> {
    this.requestSettings = !isNil(params)
      ? params
      : TransformerUtil.transform(this.requestSettings, HttpRequestDto);

    const responsePayloadDto = HttpResponsePayloadDto.createPayloadDto(responseBodyType);

    try {
      // Build the query string from the request object properties
      const queryString = this.buildQueryString(params);
      const fullUri = `${route}?${queryString}`;

      const httpResponse = await this.httpService.get<TResponse>(fullUri);

      return await this.handleValidResponse(httpResponse, responsePayloadDto);
    } catch (error) {
      this.handleErrorResponse(error, responsePayloadDto);
    }
  }

  /**
   * This method is responsible for handling the valid response.
   * @param httpResponse The response received from the API call
   * @param responsePayloadDto The response payload DTO to be used
   * for transforming the response
   * @returns The response payload DTO with the required properties
   * @throws HttpResponseError if the response does not contain the
   * required properties
   */
  private async handleValidResponse<TResponse extends BaseEntity>(
    httpResponse: AxiosResponse<TResponse>,
    responsePayloadDto: Constructor<HttpResponsePayloadDto<TResponse>>,
  ): Promise<TResponse> {
    const { data } = httpResponse;

    const responsePayload = TransformerUtil.transform(data, responsePayloadDto);

    this.validateResponsePayloadStructure(responsePayload);

    return responsePayload.body;
  }

  /**
   * This method is responsible for validating the structure of the
   * response payload. It checks if the response payload contains the
   * required properties.
   * @param responsePayload The response payload to be validated
   * @returns void if the response payload contains the required
   * properties
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
   * @returns void if the error response is handled successfully
   * @throws HttpResponseError if the error response contains errors in
   * the response body, it throws an error with the error messages as
   * the context of the error response
   * @throws HttpResponseError if the error response is not an AxiosError
   * or if the error response is an AxiosError with a status code that is
   * not handled by the HttpResponseError class
   */
  private handleErrorResponse<TResponse extends BaseEntity>(
    errorResponse: unknown,
    responsePayloadDto: Constructor<HttpResponsePayloadDto<TResponse>>,
  ): void {
    if (isNil(errorResponse)) {
      throw new HttpResponseError('', { context: 'No response received' });
    } else if (!(errorResponse instanceof AxiosError)) throw errorResponse;

    const { response, message, cause } = errorResponse;

    const rawErrorResponse = errorResponse.toString();

    if (isNil(response)) {
      throw new HttpResponseError(`with message: ${message}`, {
        context: rawErrorResponse,
        cause,
      });
    }

    const { data, statusText } = response;

    if (isNil(data)) {
      throw HttpResponseError.getHttpResponseErrorByStatusCode(
        undefined,
        rawErrorResponse,
        statusText,
        message,
      );
    }

    const transformed = TransformerUtil.transform(data, responsePayloadDto);
    if (!transformed.header) {
      throw new HttpResponseError("Missing 'header' in error response", { context: data });
    }
    const { httpStatusCode, errors } = transformed.header;

    if (!isNil(errors)) {
      const errorsArray = map(errors, (error) => error.message);

      throw new HttpResponseError('', {
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

  /**
   * This method is responsible for building the query string from the
   * request parameters.
   * @param requestParams The request parameters to be used for building
   * the query string
   * @returns The query string built from the request parameters or an
   *
   */
  private buildQueryString(requestParams?: HttpRequestDto): string {
    if (isNil(requestParams)) return '';

    const queryParams: string[] = [];

    forEach(requestParams, (value, key) => {
      if (isArray(value)) {
        forEach(value, (element) => {
          queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(element))}`);
        });
      } else if (!isNil(value)) {
        queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
      }
    });

    return queryParams.join('&');
  }
}
