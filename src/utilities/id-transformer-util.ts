import { z } from 'zod';
import { IdTransformationError } from '../entities/errors/id-transformation.error';

/**
 * Utility class for ID transformations across entities.
 * Provides reusable transformation logic for converting various ID types to strings
 * with strict validation to ensure only numeric integer values are accepted.
 */
export class IdTransformerUtil {
  private static readonly numericStringSchema = z
    .string()
    .regex(/^\d+$/, 'ID must contain only digits')
    .refine((val) => val.length > 0, 'ID cannot be empty');

  private static readonly numericSchema = z
    .number()
    .int('ID must be an integer')
    .finite('ID must be a finite number')
    .nonnegative('ID must be non-negative');

  /**
   * Transforms various ID types to string format with strict validation.
   * Only accepts:
   * - Positive integers (number type)
   * - Numeric strings containing only digits
   *
   * Rejects:
   * - Decimal numbers (e.g., 123.45)
   * - Non-numeric strings (e.g., 'invalid', 'abc123')
   * - Negative numbers
   * - NaN, Infinity, null, undefined
   *
   * @param value - The ID value to transform (number, string, etc.)
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
      try {
        const validatedNumber = this.numericSchema.parse(value);
        return validatedNumber.toString();
      } catch (error) {
        throw new IdTransformationError(
          fieldName,
          value,
          `Invalid number: ${error instanceof z.ZodError ? error.errors[0]?.message : 'must be a positive integer'}`,
        );
      }
    }

    if (typeof value === 'string') {
      try {
        const validatedString = this.numericStringSchema.parse(value.trim());
        return validatedString;
      } catch (error) {
        throw new IdTransformationError(
          fieldName,
          value,
          `Invalid string ID: ${error instanceof z.ZodError ? error.errors[0]?.message : 'must contain only digits'}`,
        );
      }
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
