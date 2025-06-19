import { Expose, Transform, Type } from 'class-transformer';

import { BetStatus, SettlementType } from '@lsports/enums';
import { IdTransformationError } from '@lsports/errors';
import { ILogger } from '@logger';

/**
 * Safely transforms a value to BigInt with comprehensive error handling.
 * Handles precision loss prevention for large numbers while gracefully
 * handling invalid inputs without crashing the application.
 *
 * **IMPORTANT**: When isRequired=true, this function throws IdTransformationError
 * for invalid values instead of returning undefined. This ensures data integrity
 * but requires proper error handling in consuming code.
 *
 * @param value - The value to transform (string, number, bigint, null, or undefined)
 * @param isRequired - Whether the field is required (throws error if true and value is invalid)
 * @param fieldName - Name of the field being transformed (for error context)
 * @param logger - Optional logger for structured error reporting
 * @returns BigInt for valid large integers, undefined for invalid inputs when not required
 * @throws {IdTransformationError} When required field has invalid value
 *
 * @example
 * ```typescript
 * // Required field - throws on invalid data
 * @Transform(({ value }) => transformToBigInt(value, true, 'Id'))
 * id!: bigint;
 *
 * // Optional field - returns undefined on invalid data
 * @Transform(({ value }) => transformToBigInt(value, false, 'OptionalId'))
 * optionalId?: bigint;
 * ```
 */
export function transformToBigInt(
  value: unknown,
  isRequired: boolean = false,
  fieldName: string = 'id',
  logger?: ILogger,
): bigint | undefined {
  if (value === null || value === undefined) {
    if (isRequired) {
      const error = new IdTransformationError(
        fieldName,
        value,
        'Field is required but received null or undefined',
      );
      logger?.error('ID transformation failed for required field', {
        fieldName,
        originalValue: value,
        valueType: typeof value,
        error: 'null-or-undefined',
      });
      throw error;
    }
    return undefined;
  }

  // If the value is already a BigInt (from lossless-json), return it as is
  if (typeof value === 'bigint') return value;

  // Handle string values
  if (typeof value === 'string') {
    // Check if string is empty or whitespace only
    if (value.trim() === '') {
      if (isRequired) {
        const error = new IdTransformationError(
          fieldName,
          value,
          'Field is required but received empty string',
        );
        logger?.error('ID transformation failed for required field', {
          fieldName,
          originalValue: value,
          valueType: typeof value,
          error: 'empty-string',
        });
        throw error;
      }
      return undefined;
    }

    // Check if string contains only digits (and optional leading minus)
    if (!/^-?\d+$/.test(value.trim())) {
      const details = `Expected integer, got non-numeric string: '${value}'`;
      const logData = {
        fieldName,
        originalValue: value,
        valueType: typeof value,
        error: 'non-numeric-string',
      };

      if (isRequired) {
        logger?.error('ID transformation failed for required field', logData);
        throw new IdTransformationError(fieldName, value, details);
      }

      logger?.warn('ID transformation failed for optional field', logData);
      return undefined;
    }

    try {
      return BigInt(value.trim());
    } catch (error) {
      const details = `Failed to convert string to BigInt: '${value}'`;
      const logData = {
        fieldName,
        originalValue: value,
        valueType: typeof value,
        error: 'bigint-conversion-failed',
        conversionError: error,
      };

      if (isRequired) {
        logger?.error('ID transformation failed for required field', logData);
        throw new IdTransformationError(fieldName, value, `${details} - ${error}`);
      }

      logger?.warn('ID transformation failed for optional field', logData);
      return undefined;
    }
  }

  // Handle number values
  if (typeof value === 'number') {
    // Check for NaN, Infinity, or decimal numbers
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      const details = `Invalid ID format received: ${value}. Expected integer, got ${
        typeof value === 'number' && !Number.isInteger(value) ? 'decimal' : 'non-finite'
      } number.`;
      const logData = {
        fieldName,
        originalValue: value,
        valueType: typeof value,
        error: !Number.isInteger(value) ? 'decimal-number' : 'non-finite-number',
      };

      if (isRequired) {
        logger?.error('ID transformation failed for required field', logData);
        throw new IdTransformationError(fieldName, value, details);
      }

      logger?.warn('ID transformation failed for optional field', logData);
      return undefined;
    }

    try {
      return BigInt(Math.trunc(value));
    } catch (error) {
      const details = `Failed to convert number to BigInt: ${value}`;
      const logData = {
        fieldName,
        originalValue: value,
        valueType: typeof value,
        error: 'bigint-conversion-failed',
        conversionError: error,
      };

      if (isRequired) {
        logger?.error('ID transformation failed for required field', logData);
        throw new IdTransformationError(fieldName, value, `${details} - ${error}`);
      }

      logger?.warn('ID transformation failed for optional field', logData);
      return undefined;
    }
  }

  // Unexpected type
  const details = `Invalid ID type received: ${typeof value}. Expected string, number, or bigint.`;
  const logData = {
    fieldName,
    originalValue: value,
    valueType: typeof value,
    error: 'unexpected-type',
  };

  if (isRequired) {
    logger?.error('ID transformation failed for required field', logData);
    throw new IdTransformationError(fieldName, value, details);
  }

  logger?.warn('ID transformation failed for optional field', logData);
  return undefined;
}

/**
 * Base betting entity with precision-safe ID handling.
 *
 * **Data Integrity Note**: The `id` field uses strict validation that throws
 * IdTransformationError for invalid data. This prevents creation of entities
 * with corrupted IDs but requires error handling in consuming applications.
 *
 * @see {@link IdTransformationError} for error handling details
 * @see {@link transformToBigInt} for transformation logic
 */
export class BaseBet {
  /**
   * Unique identifier for the bet.
   * Uses BigInt to prevent JavaScript precision loss for large numbers.
   *
   * @throws {IdTransformationError} During deserialization if ID is invalid
   */
  @Expose({ name: 'Id' })
  @Transform(({ value }) => transformToBigInt(value, true, 'Id'))
  id!: bigint;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'Line' })
  line?: string;

  @Expose({ name: 'BaseLine' })
  baseLine?: string;

  @Expose({ name: 'Status' })
  status?: BetStatus;

  @Expose({ name: 'StartPrice' })
  startPrice?: string;

  @Expose({ name: 'Price' })
  price?: string;

  @Expose({ name: 'PriceVolume' })
  priceVolume?: string;

  @Expose({ name: 'Settlement' })
  settlement?: SettlementType;

  @Expose({ name: 'SuspensionReason' })
  suspensionReason?: number;

  @Expose({ name: 'LastUpdate' })
  @Type(() => Date)
  lastUpdate?: Date;

  @Expose({ name: 'PriceIN' })
  priceIN?: string;

  @Expose({ name: 'PriceUS' })
  priceUS?: string;

  @Expose({ name: 'PriceUK' })
  priceUK?: string;

  @Expose({ name: 'PriceMA' })
  priceMA?: string;

  @Expose({ name: 'PriceHK' })
  priceHK?: string;

  @Expose({ name: 'IsChanged' })
  isChanged: number = -1;

  @Expose({ name: 'Probability' })
  probability?: number;

  @Expose({ name: 'ParticipantId' })
  participantId?: number;

  @Expose({ name: 'PlayerName' })
  playerName?: string;
}
