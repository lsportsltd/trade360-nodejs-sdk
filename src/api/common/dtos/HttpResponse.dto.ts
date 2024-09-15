import { ResponseBodyType } from '@api/common';

export class HttpResponsePayloadDto<TResponse extends ResponseBodyType> {
  Header!: Record<'HttpStatusCode', number>;

  Body!: TResponse;
}
