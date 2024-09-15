import { IStatusResponseBody } from './IStatusResponseBody';
import { IStartResponseBody } from './IStartResponseBody';
import { IStopResponseBody } from './IStopResponseBody';

export type ResponseBodyType = IStatusResponseBody | IStartResponseBody | IStopResponseBody;

export { IStatusResponseBody, IStartResponseBody, IStopResponseBody };
