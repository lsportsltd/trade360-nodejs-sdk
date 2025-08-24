import { BaseEntity } from '@entities';
import { z } from 'zod';

/**
 * JSON parser that preserves large integers as strings in ID fields to prevent precision loss.
 *
 * Specifically targets field names that are exactly "id" (case-insensitive) and converts
 * large numbers that exceed JavaScript's safe integer range to strings.
 */
export class IdSafeJsonParser {
  private static readonly ID_FIELD_REGEX = /"([iI][dD])"\s*:\s*(\d+)/g;

  private static readonly SAFE_INTEGER_DIGIT_THRESHOLD = 15;

  private static readonly isLargeNumberSchema = z
    .string()
    .regex(/^\d+$/, 'Must contain only digits')
    .refine((val) => {
      if (val.length > 16) return true;
      if (val.length >= this.SAFE_INTEGER_DIGIT_THRESHOLD) {
        const numericValue = Number(val);
        return numericValue > Number.MAX_SAFE_INTEGER;
      }
      return false;
    });

  /**
   * Core parsing logic that validates input, transforms large IDs, and parses JSON.
   *
   * @param jsonString The JSON string to process
   * @returns Parsed object with large ID numbers preserved as strings
   * @throws Error if input validation or JSON parsing fails
   */
  private static parseInternal<T extends BaseEntity>(jsonString: string): T {
    const processedJson = jsonString.replace(this.ID_FIELD_REGEX, (match, fieldName, number) => {
      const isLarge = this.isLargeNumberSchema.safeParse(number).success;
      if (isLarge) {
        return `"${fieldName}":"${number}"`;
      }
      return match;
    });

    try {
      return JSON.parse(processedJson) as T;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid JSON format';
      throw new Error(`JSON parsing failed: ${message}`);
    }
  }

  /**
   * Primary parser method that preserves large numbers as strings for ID fields.
   *
   * @param jsonString The JSON string to parse
   * @returns Parsed object with large ID numbers preserved as strings
   * @throws Error with detailed error information if validation fails
   */
  public static parse<T extends BaseEntity>(jsonString: string): T {
    try {
      return this.parseInternal(jsonString);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const prettyError = this.formatZodError(error);
        throw new Error(`JSON parsing failed: ${prettyError}`);
      }
      throw error;
    }
  }

  /**
   * Formats Zod errors into user-friendly messages.
   *
   * @param error The ZodError to format
   * @returns Formatted error message string
   */
  private static formatZodError(error: z.ZodError): string {
    if (error.errors.length > 1) {
      return error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join('; ');
    }

    return error.errors[0]?.message || 'Invalid input';
  }
}
