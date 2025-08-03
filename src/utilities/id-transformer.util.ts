import { IdTransformationError } from '../entities/errors/id-transformation.error';

/**
 * Utility class for ID transformations across entities.
 * Provides reusable transformation logic for converting various ID types to strings.
 */
export class IdTransformerUtil {
  /**
   * Transforms various ID types to string format with validation.
   *
   * @param value - The ID value to transform (number, BigInt, string, etc.)
   * @param fieldName - The name of the field being transformed (for error reporting)
   * @returns The ID as a string
   * @throws IdTransformationError if the value is invalid
   */
  public static transformId(value: unknown, fieldName: string = 'Id'): string {
    if (value === null || value === undefined) {
      throw new IdTransformationError(
        fieldName,
        value,
        'Field is required but received null or undefined',
      );
    }

    if (typeof value === 'number') {
      if (!Number.isFinite(value)) {
        throw new IdTransformationError(fieldName, value, 'Invalid number value (NaN or Infinity)');
      }
      return value.toString();
    }

    if (typeof value === 'bigint') {
      return value.toString();
    }

    if (typeof value === 'string') {
      if (value.trim() === '') {
        throw new IdTransformationError(fieldName, value, 'String value cannot be empty');
      }
      return value;
    }

    throw new IdTransformationError(fieldName, value, `Unsupported type: ${typeof value}`);
  }

  /**
   * Creates a class-transformer compatible transform function for ID fields.
   *
   * @param fieldName - The name of the field being transformed (for error reporting)
   * @returns A transform function that can be used with @Transform decorator
   */
  public static createIdTransform(fieldName: string = 'Id'): (obj: { value: unknown }) => string {
    return ({ value }: { value: unknown }) => this.transformId(value, fieldName);
  }
}
