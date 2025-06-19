import { BaseError } from './base.error';

export class IdTransformationError extends BaseError {
  public readonly originalValue: unknown;

  public readonly fieldName: string;

  constructor(fieldName: string, originalValue: unknown, details: string) {
    const message = `Invalid ID transformation for field '${fieldName}': ${details}`;

    super(message);
    this.name = 'IdTransformationError';
    this.originalValue = originalValue;
    this.fieldName = fieldName;
  }
}
