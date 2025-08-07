import { ClassConstructor, Expose, Transform, Type } from 'class-transformer';

import { BaseEntity } from '@lsports/entities';
import { TransformerUtil } from '@utilities';

import { HeaderContent } from './http-response-header';

/**
 * HttpResponsePayloadDto class is responsible for the
 * response structure of the HTTP response.It contains
 * the header and body of the response. The header
 * contains the HTTP status code and the errors if any.
 * The body contains the response data.
 * @typeparam TResponse The type of the response data.
 */
export class HttpResponsePayloadDto<TResponse extends BaseEntity> implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Header' })
  @Type(() => HeaderContent)
  header!: HeaderContent;

  @Expose({ name: 'Body' })
  body!: TResponse;

  /**
   * Create a custom DTO for the response body.
   * @param entityClass The class of the response body.
   * @returns The custom DTO for the response body.
   */
  static createPayloadDto<TResponse extends BaseEntity>(
    entityClass: ClassConstructor<TResponse>,
  ): new () => HttpResponsePayloadDto<TResponse> {
    class CustomHttpResponsePayloadDto extends HttpResponsePayloadDto<TResponse> {
      @Expose({ name: 'Body' })
      @Transform(({ value }) => TransformerUtil.transform(value, entityClass))
      declare body: TResponse;
    }

    return CustomHttpResponsePayloadDto;
  }
}
