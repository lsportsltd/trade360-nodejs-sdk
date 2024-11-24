import { BaseError } from './base.error';

export class RetryError extends BaseError {
  constructor(operationName: string, attempts: number) {
    const message = `${operationName} failed after ${attempts} attempts`;

    super(message);
  }
}
