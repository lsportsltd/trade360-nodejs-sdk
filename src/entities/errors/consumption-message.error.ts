import { BaseError } from './base.error';

export class ConsumptionMessageError extends BaseError {
  constructor(error: unknown) {
    const message = `Error processing message, Error: ${error}`;
    super(message);
  }
}
