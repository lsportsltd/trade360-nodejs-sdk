import { ResponseBodyType } from "..";

export class HttpResponsePayloadDto<TResponse extends ResponseBodyType> {
    Header!: Record<"HttpStatusCode", number>;
    Body!: TResponse;
  }