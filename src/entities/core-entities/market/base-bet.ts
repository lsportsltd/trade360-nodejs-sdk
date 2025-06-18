import { Expose, Transform, Type } from 'class-transformer';

import { BetStatus, SettlementType } from '@lsports/enums';

/**
 * Safely transforms a value to BigInt with comprehensive error handling.
 * Handles precision loss prevention for large numbers while gracefully
 * handling invalid inputs without crashing the application.
 *
 * @param value - The value to transform (string, number, bigint, null, or undefined)
 * @returns BigInt for valid large integers, undefined for invalid inputs
 */
export function transformToBigInt(value: unknown): bigint | undefined {
  if (value === null || value === undefined) return undefined;

  // If the value is already a BigInt (from lossless-json), return it as is
  if (typeof value === 'bigint') return value;

  // Handle string values
  if (typeof value === 'string') {
    // Check if string is empty or whitespace only
    if (value.trim() === '') return undefined;

    // Check if string contains only digits (and optional leading minus)
    if (!/^-?\d+$/.test(value.trim())) {
      console.warn('Invalid ID format received. Expected integer, got non-numeric string:', value);
      return undefined;
    }

    try {
      return BigInt(value.trim());
    } catch (error) {
      console.warn('Failed to convert ID to BigInt:', value, error);
      return undefined;
    }
  }

  // Handle number values
  if (typeof value === 'number') {
    // Check for NaN, Infinity, or decimal numbers
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      console.warn(
        `Invalid ID format received: ${value}. Expected integer, got ${typeof value === 'number' && !Number.isInteger(value) ? 'decimal' : 'non-finite'} number.`,
      );
      return undefined;
    }

    try {
      return BigInt(Math.trunc(value));
    } catch (error) {
      console.warn('Failed to convert ID to BigInt:', value, error);
      return undefined;
    }
  }

  // Unexpected type
  console.warn(`Invalid ID type received: ${typeof value}. Expected string, number, or bigint.`);
  return undefined;
}

export class BaseBet {
  @Expose({ name: 'Id' })
  @Transform(({ value }) => transformToBigInt(value))
  id?: bigint;

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
