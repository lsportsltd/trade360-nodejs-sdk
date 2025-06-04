import { BaseError } from './base.error';
import type { Jsonable } from './base.error';

export class ValidationError extends BaseError {
  constructor(operationName: string, context?: unknown) {
    const message = `${operationName} validation failed`;
    super(message, { context: context as Jsonable });
  }
}
