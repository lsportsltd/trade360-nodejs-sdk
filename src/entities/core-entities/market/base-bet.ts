import { Expose, Type, Transform } from 'class-transformer';

import { BetStatus, SettlementType } from '@lsports/enums';
import { IdTransformationError } from '../../errors/id-transformation.error';

/**
 * Base betting entity with string-based ID handling for JSON compatibility.
 *
 * Uses simple string IDs to ensure perfect serialization/deserialization
 * with frontends and JSON-based APIs. No complex transformations needed.
 */
export class BaseBet {
  /**
   * Unique identifier for the bet.
   * Uses string to ensure JSON serialization compatibility and frontend interoperability.
   * Handles large numbers without precision loss and maintains simplicity.
   */
  @Expose({ name: 'Id' })
  @Transform(({ value }) => {
    // Handle null/undefined - this should throw an error as ID is required
    if (value === null || value === undefined) {
      throw new IdTransformationError('Id', value, 'Field is required but received null or undefined');
    }

    // Convert numbers to strings (including large numbers)
    if (typeof value === 'number') {
      if (!Number.isFinite(value)) {
        throw new IdTransformationError('Id', value, 'Invalid number value (NaN or Infinity)');
      }
      return value.toString();
    }

    // Convert BigInt to strings
    if (typeof value === 'bigint') {
      return value.toString();
    }

    // Keep strings as they are (but validate they're not empty)
    if (typeof value === 'string') {
      if (value.trim() === '') {
        throw new IdTransformationError('Id', value, 'String value cannot be empty');
      }
      return value;
    }

    // Reject any other types
    throw new IdTransformationError('Id', value, `Unsupported type: ${typeof value}`);
  })
  id!: string;

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
