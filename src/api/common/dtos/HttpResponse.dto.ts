import { ResponseBodyType } from "..";

export class HttpResponsePayloadDto<T extends ResponseBodyType> {
    Header!: Record<"HttpStatusCode", number>;
    Body!: T;
  }