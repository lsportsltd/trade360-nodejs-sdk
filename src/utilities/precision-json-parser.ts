/**
 * Custom JSON parser that preserves large integers as strings to prevent precision loss.
 *
 * This parser specifically handles ID fields that might contain large numbers
 * exceeding JavaScript's Number.MAX_SAFE_INTEGER (9,007,199,254,740,991).
 *
 * Recommended usage: Use `parse()` method for most cases, which automatically
 * detects and preserves large numbers in ID fields.
 */
export class PrecisionJsonParser {
  private static readonly LARGE_ID_FIELD_REGEX = /"(\w*[iI][dD])"\s*:\s*(\d+)/g;

  private static readonly SAFE_INTEGER_DIGIT_THRESHOLD = 15;

  /**
   * Primary parser method that preserves large numbers as strings for ID fields.
   * This method uses regex preprocessing to identify and quote large numbers
   * before JSON parsing occurs, preventing precision loss.
   *
   * @param jsonString The JSON string to parse
   * @returns Parsed object with large ID numbers preserved as strings
   */
  public static parse(jsonString: string): unknown {
    return this.parsePreservingLargeIds(jsonString);
  }

  /**
   * Enhanced parser that uses regex to identify and preserve large numbers
   * in ID fields before JSON parsing occurs. This method converts numbers
   * to strings only when they exceed the safe integer threshold.
   *
   * @param jsonString The JSON string to parse
   * @returns Parsed object with large ID numbers preserved as strings
   */
  public static parsePreservingLargeIds(jsonString: string): unknown {
    let processedJson = jsonString;

    processedJson = processedJson.replace(this.LARGE_ID_FIELD_REGEX, (match, fieldName, number) => {
      if (this.isLargeNumber(number)) {
        return `"${fieldName}":"${number}"`;
      }
      return match;
    });

    return JSON.parse(processedJson);
  }

  /**
   * Alternative parser that preserves ALL numbers in ID fields as strings,
   * regardless of size. Use this for maximum consistency when you want
   * all ID fields to be strings.
   *
   * @param jsonString The JSON string to parse
   * @returns Parsed object with all ID numbers as strings
   */
  public static parseAllIdFieldsAsStrings(jsonString: string): unknown {
    let processedJson = jsonString;

    processedJson = processedJson.replace(this.LARGE_ID_FIELD_REGEX, (match, fieldName, number) => {
      return `"${fieldName}":"${number}"`;
    });

    return JSON.parse(processedJson);
  }

  /**
   * Legacy parser using a reviver function approach.
   *
   * ⚠️  WARNING: This approach has limitations as precision may already be lost
   * during the initial JSON.parse phase. Use `parse()` method instead.
   *
   * @param jsonString The JSON string to parse
   * @returns Parsed object with large numbers converted to strings
   * @deprecated Use `parse()` method instead for better precision preservation
   */
  public static parseWithReviver(jsonString: string): unknown {
    return JSON.parse(jsonString, (key: string, value: unknown) => {
      if (this.isIdField(key) && typeof value === 'number' && value > Number.MAX_SAFE_INTEGER) {
        return value.toString();
      }
      return value;
    });
  }

  /**
   * Determines if a field name represents an ID field.
   * Matches fields that are exactly 'id' (case-insensitive) or end with 'id'/'Id'/'ID'.
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
   * Safely determines if a numeric string represents a large number
   * that could lose precision when parsed as a JavaScript number.
   *
   * @param numberString The numeric string to check
   * @returns True if the number could lose precision
   */
  private static isLargeNumber(numberString: string): boolean {
    if (numberString.length > 16) {
      return true;
    }

    if (numberString.length >= this.SAFE_INTEGER_DIGIT_THRESHOLD) {
      try {
        const bigIntValue = BigInt(numberString);
        return bigIntValue > BigInt(Number.MAX_SAFE_INTEGER);
      } catch {
        return true;
      }
    }

    return false;
  }
}
