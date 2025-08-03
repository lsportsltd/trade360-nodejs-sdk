import { z } from 'zod';

/**
 * JSON parser that preserves large integers as strings in ID fields to prevent precision loss.
 *
 * Specifically targets field names that are exactly "id" (case-insensitive) and converts
 * large numbers that exceed JavaScript's safe integer range to strings.
 * Optimized with Zod v4 for enhanced performance, validation, and error handling.
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
    }, 'Number is within safe integer range');

  /**
   * Core parsing logic that validates input, transforms large IDs, and parses JSON.
   *
   * @param jsonString The JSON string to process
   * @returns Parsed object with large ID numbers preserved as strings
   * @throws Error if input validation or JSON parsing fails
   */
  private static parseInternal(jsonString: string): unknown {
    const processedJson = jsonString.replace(this.ID_FIELD_REGEX, (match, fieldName, number) => {
      const isLarge = this.isLargeNumberSchema.safeParse(number).success;
      if (isLarge) {
        return `"${fieldName}":"${number}"`;
      }
      return match;
    });

    try {
      return JSON.parse(processedJson);
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
  public static parse(jsonString: string): unknown {
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
   * Non-throwing parser that returns a result object.
   *
   * @note This method is primarily used for testing purposes.
   *
   * @param jsonString The JSON string to parse
   * @returns Success result with data or error result with detailed error information
   */
  public static safeParse(
    jsonString: string,
  ): { success: true; data: unknown } | { success: false; error: string } {
    try {
      const parsedData = this.parseInternal(jsonString);
      return { success: true, data: parsedData };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = this.formatZodError(error);
        return { success: false, error: `JSON parsing failed: ${errorMessage}` };
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Alias for parse() method for backward compatibility.
   *
   * @param jsonString The JSON string to parse
   * @returns Parsed object with large ID numbers preserved as strings
   */
  public static parsePreservingLargeIds(jsonString: string): unknown {
    return this.parse(jsonString);
  }

  /**
   * Checks if a number string could lose precision when parsed as JavaScript number.
   *
   * @note This method is primarily used for testing purposes.
   *
   * @param numberString The numeric string to check
   * @returns True if the number could lose precision
   */
  public static isLargeNumber(numberString: string): boolean {
    return this.isLargeNumberSchema.safeParse(numberString).success;
  }

  /**
   * Validates JSON string structure before parsing.
   *
   * @note This method is primarily used for testing purposes.
   *
   * @param jsonString The JSON string to validate
   * @returns Validation result with error information if invalid
   */
  public static validateJsonString(
    jsonString: string,
  ): { valid: true } | { valid: false; error: string } {
    if (typeof jsonString !== 'string' || jsonString.length === 0) {
      return { valid: false, error: 'JSON string cannot be empty' };
    }

    try {
      JSON.parse(jsonString);
      return { valid: true };
    } catch {
      return { valid: false, error: 'Must be valid JSON string' };
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
