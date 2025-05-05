import { BaseError } from './base.error';

export class ValidationError extends BaseError {
  constructor(operationName: string, context?: Record<string, unknown>) {
    const message = `${operationName} validation failed`;
    super(message, { context: context as any });
  }
}
