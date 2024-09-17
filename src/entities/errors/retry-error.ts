import { BaseError } from './base-error';

export class RetryError extends BaseError {
  constructor(
    message: string,
    public attempts: number,
  ) {
    super(message);
  }
}
