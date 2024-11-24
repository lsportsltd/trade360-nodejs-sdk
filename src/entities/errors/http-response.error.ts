import { isNil } from 'lodash';

import { BaseError } from './base.error';

export class HttpResponseError extends BaseError {
  constructor(extraMessage: string, args: Record<string, unknown> = {}) {
    const message = `API call failed, ${extraMessage}`;
    // "'Header' property is missing. Please ensure that you use the correct URL."
    // "'Body' property is missing. Please ensure that you use the correct URL.",
    // 'API call failed', { context: 'No response received' }
    // `API call failed with message: ${message}`, {context: rawErrorResponse,cause}
    // `${statusText}, ${message}`, { context: rawErrorResponse }

    super(message, args);
  }

  private static HttpErrorStatusMapping: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
  };

  /**
   *  Creates an instance of HttpResponseError based on the httpStatusCode.
   * @param httpStatusCode The status code of the HTTP response
   * @param rawErrorResponse The raw error response
   * @param statusText The status text of the HTTP response
   * @param message error message
   * @returns HttpResponseError instance based on the httpStatusCode provided
   * or a generic error message if the httpStatusCode is not handled.
   */
  public static getHttpResponseErrorByStatusCode(
    httpStatusCode: number = -1,
    rawErrorResponse?: string,
    statusText?: string,
    message?: string,
  ): HttpResponseError {
    const errorMessage = Object.prototype.hasOwnProperty.call(
      this.HttpErrorStatusMapping,
      httpStatusCode,
    )
      ? this.HttpErrorStatusMapping[httpStatusCode]
      : undefined;

    if (isNil(errorMessage)) {
      return new HttpResponseError(`${statusText}, ${message}`, { context: rawErrorResponse });
    }

    return new HttpResponseError(errorMessage, { context: rawErrorResponse });
  }
}
