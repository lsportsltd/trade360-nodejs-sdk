import { IStatusResponseBody } from './status-response-body.interface';
import { IStartResponseBody } from './start-response-body.interface';
import { IStopResponseBody } from './stop-response-body.interface';

export type ResponseBodyType = IStatusResponseBody | IStartResponseBody | IStopResponseBody;

export { IStatusResponseBody, IStartResponseBody, IStopResponseBody };
