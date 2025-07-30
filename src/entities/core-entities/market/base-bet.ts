import { Expose, Transform, Type } from 'class-transformer';

import { BetStatus, SettlementType } from '@lsports/enums';
import { transformToBigInt } from '../utilities/id-transformation';
import { BigIntSerializationUtil } from '../../utilities/bigint-serialization.util';

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

  /**
   * Custom JSON serialization to handle BigInt values safely.
   * This prevents "Do not know how to serialize a BigInt" errors.
   *
   * ⚠️  IMPORTANT: BigInt values are converted to strings with 'n' suffix.
   * If you need to restore BigInt values from this JSON, use:
   * BigIntSerializationUtil.safeParse(JSON.stringify(obj.toJSON()))
   *
   * @returns Object with BigInt values converted to 'n' suffixed strings
   */
  toJSON(): Record<string, unknown> {
    // Use the replacer directly instead of stringify->parse cycle
    // This preserves the 'n' suffix to indicate original BigInt values
    const result: Record<string, unknown> = {};

    // Define allowed properties to prevent object injection
    const allowedKeys = [
      'id', 'name', 'line', 'baseLine', 'status', 'startPrice', 'price', 
      'priceVolume', 'settlement', 'suspensionReason', 'lastUpdate', 
      'priceIN', 'priceUS', 'priceUK', 'priceMA', 'priceHK', 'isChanged', 
      'probability', 'participantId', 'playerName'
    ];

    // Get all enumerable properties (class-transformer exposed properties)
    for (const [key, value] of Object.entries(this)) {
      if (typeof key === 'string' && allowedKeys.includes(key)) {
        result[key] = BigIntSerializationUtil.bigIntReplacer(key, value);
      }
    }

    return result;
  }
}
