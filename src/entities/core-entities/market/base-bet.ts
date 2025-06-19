import { Expose, Transform, Type } from 'class-transformer';

import { BetStatus, SettlementType } from '@lsports/enums';
import { transformToBigInt } from '../utilities/id-transformation';

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
   * Custom JSON serialization method that converts BigInt id to string.
   * This ensures proper serialization when objects are passed to JSON.stringify().
   *
   * @returns A JSON-serializable representation of the object
   */
  toJSON(): Record<string, unknown> {
    return {
      Id: this.id.toString(),
      Name: this.name,
      Line: this.line,
      BaseLine: this.baseLine,
      Status: this.status,
      StartPrice: this.startPrice,
      Price: this.price,
      PriceVolume: this.priceVolume,
      Settlement: this.settlement,
      SuspensionReason: this.suspensionReason,
      LastUpdate: this.lastUpdate?.toISOString(),
      PriceIN: this.priceIN,
      PriceUS: this.priceUS,
      PriceUK: this.priceUK,
      PriceMA: this.priceMA,
      PriceHK: this.priceHK,
      IsChanged: this.isChanged,
      Probability: this.probability,
      ParticipantId: this.participantId,
      PlayerName: this.playerName,
    };
  }
}
