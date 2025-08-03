/**
 * Custom JSON parser that preserves large integers as strings to prevent precision loss.
 *
 * This parser specifically handles ID fields that might contain large numbers
 * exceeding JavaScript's Number.MAX_SAFE_INTEGER (9,007,199,254,740,991).
 */
export class PrecisionJsonParser {
  private static readonly ID_FIELD_PATTERNS = [
    /^"Id"\s*:\s*(\d{16,})/g,
    /^"id"\s*:\s*(\d{16,})/g,
    /^"ID"\s*:\s*(\d{16,})/g,
  ];

  /**
   * Parses JSON string while preserving large numbers as strings for ID fields.
   * This prevents precision loss when dealing with large integers.
   *
   * @param jsonString The JSON string to parse
   * @returns Parsed object with large ID numbers preserved as strings
   */
  public static parse(jsonString: string): unknown {
    // Pre-process the JSON string to wrap large ID numbers in quotes
    let processedJson = jsonString;

    // Find and quote large ID numbers
    this.ID_FIELD_PATTERNS.forEach((pattern) => {
      processedJson = processedJson.replace(pattern, (match, number) => {
        // If the number is larger than JavaScript's safe integer range, wrap in quotes
        if (parseInt(number) > Number.MAX_SAFE_INTEGER) {
          return match.replace(number, `"${number}"`);
        }
        return match;
      });
    });

    // Use standard JSON.parse on the processed string
    return JSON.parse(processedJson);
  }

  /**
   * Alternative parser using a reviver function approach.
   * This approach processes all numeric values during parsing.
   *
   * @param jsonString The JSON string to parse
   * @returns Parsed object with large numbers converted to strings
   */
  public static parseWithReviver(jsonString: string): unknown {
    return JSON.parse(jsonString, (key: string, value: unknown) => {
      // Check if the key looks like an ID field and the value is a large number
      if (this.isIdField(key) && typeof value === 'number' && value > Number.MAX_SAFE_INTEGER) {
        // Convert back to string to preserve original precision
        // Note: This approach has limitations as precision is already lost
        return value.toString();
      }
      return value;
    });
  }

  /**
   * Determines if a field name represents an ID field.
   *
   * @param fieldName The field name to check
   * @returns True if the field appears to be an ID field
   */
  private static isIdField(fieldName: string): boolean {
    if (typeof fieldName !== 'string') return false;

    const lowerKey = fieldName.toLowerCase();
    return lowerKey === 'id' || lowerKey.endsWith('id');
  }

  /**
   * Enhanced parser that uses regex to identify and preserve large numbers
   * in ID fields before JSON parsing occurs.
   *
   * @param jsonString The JSON string to parse
   * @returns Parsed object with large ID numbers preserved as strings
   */
  public static parsePreservingLargeIds(jsonString: string): unknown {
    // Enhanced regex to find ID fields with any numbers
    // This matches field names that are exactly 'id', 'Id', 'ID' or end with 'id', 'Id', 'ID'
    const idFieldRegex = /"([iI][dD]|\w+[iI][dD]|\w*ID)"\s*:\s*(\d+)/g;

    let processedJson = jsonString;

    // Replace all numbers in ID fields with quoted versions for consistency
    processedJson = processedJson.replace(idFieldRegex, (match, fieldName, number) => {
      // Convert all ID field numbers to strings for consistency
      return `"${fieldName}":"${number}"`;
    });

    return JSON.parse(processedJson);
  }
}
