'use strict';

import { IdTransformationError } from '@lsports/errors';

/**
 * Safely transforms a value to BigInt without logging to avoid BigInt serialization issues.
 * This is a simplified version that doesn't use logging to prevent circular BigInt serialization problems.
 *
 * @param value - The value to transform (string, number, bigint, null, or undefined)
 * @param isRequired - Whether the field is required (throws error if true and value is invalid)
 * @param fieldName - Name of the field being transformed (for error context)
 * @returns BigInt for valid large integers, undefined for invalid inputs when not required
 * @throws {IdTransformationError} When required field has invalid value
 */
export function transformToBigInt(
  value: unknown,
  isRequired: boolean = false,
  fieldName: string = 'id',
): bigint | undefined {
  if (value === null || value === undefined) {
    if (isRequired) {
      throw new IdTransformationError(
        fieldName,
        value,
        'Field is required but received null or undefined',
      );
    }
    return undefined;
  }

  // If the value is already a BigInt (from lossless-json), return it as is
  if (typeof value === 'bigint') {
    return value;
  }

  // Handle string values
  if (typeof value === 'string') {
    // Check if string is empty or whitespace only
    if (value.trim() === '') {
      if (isRequired) {
        throw new IdTransformationError(
          fieldName,
          value,
          'Field is required but received empty string',
        );
      }
      return undefined;
    }

    let processedValue = value.trim();

    // Handle BigInt serialized strings (those ending with 'n')
    if (processedValue.endsWith('n')) {
      processedValue = processedValue.slice(0, -1); // Remove the 'n' suffix
    }

    // Check if string contains only digits (and optional leading minus)
    if (!/^-?\d+$/.test(processedValue)) {
      const details = `Expected integer, got non-numeric string: '${value}'`;
      if (isRequired) {
        throw new IdTransformationError(fieldName, value, details);
      }
      return undefined;
    }

    try {
      return BigInt(processedValue);
    } catch (error) {
      const details = `Failed to convert string to BigInt: '${value}'`;
      if (isRequired) {
        throw new IdTransformationError(fieldName, value, `${details} - ${error}`);
      }
      return undefined;
    }
  }

  // Handle number values
  if (typeof value === 'number') {
    // Check for NaN, Infinity, or decimal numbers
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      const details = `Invalid ID format received: ${value}. Expected integer, got ${
        !Number.isFinite(value) ? 'non-finite' : 'decimal'
      } number.`;
      if (isRequired) {
        throw new IdTransformationError(fieldName, value, details);
      }
      return undefined;
    }

    try {
      const truncatedValue = Math.trunc(value);
      return BigInt(truncatedValue);
    } catch (error) {
      const details = `Failed to convert number to BigInt: ${value}`;
      if (isRequired) {
        throw new IdTransformationError(fieldName, value, `${details} - ${error}`);
      }
      return undefined;
    }
  }

  // Unexpected type
  const details = `Invalid ID type received: ${typeof value}. Expected string, number, or bigint.`;
  if (isRequired) {
    throw new IdTransformationError(fieldName, value, details);
  }
  return undefined;
}
