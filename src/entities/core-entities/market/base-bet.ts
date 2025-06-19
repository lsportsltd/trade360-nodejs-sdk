import { Expose, Transform, Type } from 'class-transformer';

import { BetStatus, SettlementType } from '@lsports/enums';

/**
 * Safely transforms a value to BigInt with comprehensive error handling.
 * Handles precision loss prevention for large numbers while gracefully
 * handling invalid inputs without crashing the application.
 *
 * @param value - The value to transform (string, number, bigint, null, or undefined)
 * @param isRequired - Whether the field is required (throws error if true and value is invalid)
 * @returns BigInt for valid large integers, undefined for invalid inputs when not required
 * @throws Error when required field has invalid value
 */
export function transformToBigInt(value: unknown, isRequired: boolean = false): bigint | undefined {
  if (value === null || value === undefined) {
    if (isRequired) {
      throw new Error('ID is required but received null or undefined');
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
        throw new Error('ID is required but received empty string');
      }
      return undefined;
    }

    // Check if string contains only digits (and optional leading minus)
    if (!/^-?\d+$/.test(value.trim())) {
      const errorMsg =
        'Invalid ID format received. Expected integer, got non-numeric string: ' + value;
      if (isRequired) {
        throw new Error(errorMsg);
      }
      console.warn(errorMsg);
      return undefined;
    }

    try {
      return BigInt(value.trim());
    } catch (error) {
      const errorMsg = 'Failed to convert ID to BigInt: ' + value;
      if (isRequired) {
        throw new Error(errorMsg + ' - ' + error);
      }
      console.warn(errorMsg, error);
      return undefined;
    }
  }

  // Handle number values
  if (typeof value === 'number') {
    // Check for NaN, Infinity, or decimal numbers
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      const errorMsg = `Invalid ID format received: ${value}. Expected integer, got ${
        typeof value === 'number' && !Number.isInteger(value) ? 'decimal' : 'non-finite'
      } number.`;
      if (isRequired) {
        throw new Error(errorMsg);
      }
      console.warn(errorMsg);
      return undefined;
    }

    try {
      return BigInt(Math.trunc(value));
    } catch (error) {
      const errorMsg = 'Failed to convert ID to BigInt: ' + value;
      if (isRequired) {
        throw new Error(errorMsg + ' - ' + error);
      }
      console.warn(errorMsg, error);
      return undefined;
    }
  }

  // Unexpected type
  const errorMsg = `Invalid ID type received: ${typeof value}. Expected string, number, or bigint.`;
  if (isRequired) {
    throw new Error(errorMsg);
  }
  console.warn(errorMsg);
  return undefined;
}

export class BaseBet {
  @Expose({ name: 'Id' })
  @Transform(({ value }) => transformToBigInt(value, true))
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
