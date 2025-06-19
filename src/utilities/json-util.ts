/**
 * Custom JSON replacer function that handles BigInt serialization.
 * Converts BigInt values to strings to avoid serialization errors.
 *
 * @param key - The key being stringified
 * @param value - The value being stringified
 * @returns The value to serialize (BigInt converted to string)
 */
function bigIntReplacer(key: string, value: unknown): unknown {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
}

/**
 * Utility class for JSON operations with BigInt support.
 */
export class JsonUtil {
  /**
   * JSON.stringify that safely handles BigInt values by converting them to strings.
   *
   * @param value - The value to convert to a JSON string
   * @param space - Number of spaces to use for indentation (optional)
   * @returns JSON string with BigInt values converted to strings
   */
  public static stringify(value: unknown, space?: string | number): string {
    return JSON.stringify(value, bigIntReplacer, space);
  }

  /**
   * Standard JSON.parse (for completeness of the utility)
   *
   * @param text - The string to parse as JSON
   * @returns The parsed JSON value
   */
  public static parse(text: string): unknown {
    return JSON.parse(text);
  }

  /**
   * Get the BigInt replacer function for use with custom JSON.stringify calls
   *
   * @returns The BigInt replacer function
   */
  public static getBigIntReplacer(): (key: string, value: unknown) => unknown {
    return bigIntReplacer;
  }
} 