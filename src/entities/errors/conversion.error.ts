import { BaseError } from './base.error';

export class ConversionError extends BaseError {
  constructor(targetClassName: string, err: unknown) {
    const message = `failed converting object to ${targetClassName} instance!, err: ${err}`;

    super(message);
    this.name = 'ConversionError';
  }
}
