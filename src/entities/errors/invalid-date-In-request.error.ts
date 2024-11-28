import { BaseError } from './base.error';

export class InvalidDateInRequestError extends BaseError {
  constructor(fieldName: string) {
    const message = `Date ${fieldName} is required and was not provided for as fields of the request`;

    super(message);
    this.name = 'InvalidDateInRequestError';
  }
}
