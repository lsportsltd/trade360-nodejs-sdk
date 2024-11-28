import { Expose, Type } from 'class-transformer';

/**
 * ErrorMessage class is responsible for the
 * error message structure of the HTTP response.
 * It contains the message of the error.
 * @example "Message": "Incorrect user name or
 * password for requested package"
 */
class ErrorMessage {
  @Expose({ name: 'Message' })
  message!: string;
}

/**
 * HeaderContent class is responsible for the
 * header structure of the HTTP response. It contains
 * the HTTP status code and the errors if any.
 * @example "HttpStatusCode": 401
 * @example "Errors": [{"Message": "Incorrect user
 * name or password for requested package"}]
 */
export class HeaderContent {
  @Expose({ name: 'HttpStatusCode' })
  httpStatusCode!: number;

  @Expose({ name: 'Errors' })
  @Type(() => ErrorMessage)
  errors?: ErrorMessage[];
}
