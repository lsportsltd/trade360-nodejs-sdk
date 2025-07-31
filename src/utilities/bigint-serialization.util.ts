'use strict';

import { isInteger } from 'lossless-json';

/**
 * Utility for safely handling BigInt serialization and parsing in JSON operations.
 * This prevents "Do not know how to serialize a BigInt" errors and handles
 * parsing of large numbers to BigInt to avoid precision loss.
 */
export class BigIntSerializationUtil {
  /**
   * JSON replacer function that converts BigInt values to strings
   * while preserving all other data types.
   *
   * @param key - The key of the property being stringified
   * @param value - The value being stringified
   * @returns The value with BigInt converted to string
   */
  public static bigIntReplacer(key: string, value: unknown): unknown {
    if (typeof value === 'bigint') {
      return `${value.toString()}n`; // Append 'n' to indicate it was a BigInt
    }
    return value;
  }

  /**
   * Custom number parser for lossless-json that converts large positive integers to BigInt
   * and other numeric values to regular numbers. Since ID values are always positive,
   * we only need to handle large positive integers to prevent precision loss.
   * @param value The string value to parse.
   * @returns A `number` or `bigint`.
   */
  public static customNumberParser(value: string): number | bigint {
    if (isInteger(value)) {
      // For positive integers only (since IDs are always positive)
      if (!value.startsWith('-')) {
        // For very long numbers (17+ digits), definitely use BigInt
        if (value.length > 16) {
          return BigInt(value);
        }

        // For 16-digit numbers, compare against MAX_SAFE_INTEGER as string
        if (value.length === 16) {
          const maxSafeIntegerStr = '9007199254740991';
          if (value > maxSafeIntegerStr) {
            console.log('customNumberParser', value);
            return BigInt(value);
          }
        }
      }

      // Safe to convert to number (includes all negative numbers and safe positive numbers)
      return parseInt(value, 10);
    }
    return parseFloat(value);
  }

  /**
   * Safely stringify an object that may contain BigInt values.
   *
   * @param obj - The object to stringify
   * @param space - Optional spacing for formatted JSON
   * @returns JSON string with BigInt values converted to strings
   */
  public static stringify(obj: unknown, space?: string | number): string {
    try {
      return JSON.stringify(obj, BigIntSerializationUtil.bigIntReplacer, space);
    } catch (error) {
      // Fallback for circular references or other serialization issues
      try {
        return JSON.stringify({
          error: 'Serialization failed',
          message: String(obj),
          originalError: String(error),
        });
      } catch {
        return `[Unserializable object: ${String(obj)}]`;
      }
    }
  }

  /**
   * Safely convert an error object to a string, handling BigInt values.
   * This is particularly useful for logging errors that may contain BigInt data.
   *
   * @param error - The error object to convert
   * @returns A safe string representation of the error
   */
  public static errorToString(error: unknown): string {
    if (error instanceof Error) {
      // Create a plain object with error details that can be safely serialized
      const errorInfo: Record<string, unknown> = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        // Include any custom properties from the error object
        ...(error as unknown as Record<string, unknown>),
      };

      try {
        return BigIntSerializationUtil.stringify(errorInfo, 2);
      } catch {
        // Ultimate fallback - just use the error message
        return `${error.name}: ${error.message}`;
      }
    }

    return String(error);
  }

  /**
   * Safely extract key information from an error for logging purposes.
   * This extracts the most important error details without risking BigInt serialization issues.
   *
   * @param error - The error to extract information from
   * @returns Safe error summary object
   */
  public static extractErrorInfo(error: unknown): Record<string, unknown> {
    if (error instanceof Error) {
      return {
        type: error.constructor.name,
        message: error.message,
        // Don't include stack trace in structured logs by default
        hasStack: !!error.stack,
      };
    }

    return {
      type: typeof error,
      value: String(error),
    };
  }
}
