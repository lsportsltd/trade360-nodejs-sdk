import { BaseError } from './base.error';

export class HttpResponseError extends BaseError {
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
    httpStatusCode: number,
    rawErrorResponse: string,
    statusText?: string,
    message?: string,
  ): HttpResponseError {
    const errorMessage = this.HttpErrorStatusMapping[httpStatusCode];

    if (!errorMessage) {
      return new HttpResponseError(`${statusText}, ${message}`, { context: rawErrorResponse });
    }

    return new HttpResponseError(errorMessage, { context: rawErrorResponse });
  }
}
