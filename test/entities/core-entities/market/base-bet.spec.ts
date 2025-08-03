import { plainToInstance } from 'class-transformer';
import { parse, isInteger } from 'lossless-json';
import { BaseBet } from '../../../../src/entities/core-entities/market/base-bet';
import { BetStatus } from '../../../../src/entities/core-entities/enums/bet-status';
import { SettlementType } from '../../../../src/entities/core-entities/enums/settlement-type';
import { IdTransformationError } from '../../../../src/entities/errors/id-transformation.error';
import { BigIntSerializationUtil } from '../../../../src/utilities/bigint-serialization.util';

/**
 * Custom number parser for lossless-json (same logic as in AxiosService)
 */
function customNumberParser(value: string): number | bigint {
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
          return BigInt(value);
        }
      }
    }

    // Safe to convert to number (includes all negative numbers and safe positive numbers)
    return parseInt(value, 10);
  }
  return parseFloat(value);
}

describe('BaseBet Entity', () => {
  it('should deserialize a plain object into a BaseBet instance', (): void => {
    const plain = {
      Id: 1,
      Name: 'Base Bet',
      Line: '2.5',
      Status: BetStatus.Open,
      Settlement: SettlementType.Winner,
      LastUpdate: '2024-06-01T12:00:00Z',
      IsChanged: 1,
      Probability: 0.75,
      ParticipantId: 42,
      PlayerName: 'Player X',
    };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect(baseBet).toBeInstanceOf(BaseBet);
    expect(baseBet.id).toBe(1n);
    expect(baseBet.name).toBe('Base Bet');
    expect(baseBet.line).toBe('2.5');
    expect(baseBet.status).toBe(BetStatus.Open);
    expect(baseBet.settlement).toBe(SettlementType.Winner);
    expect(baseBet.lastUpdate).toBeInstanceOf(Date);
    expect(baseBet.lastUpdate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
    expect(baseBet.probability).toBe(0.75);
    expect(baseBet.participantId).toBe(42);
    expect(baseBet.playerName).toBe('Player X');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    expect(() => {
      plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    }).toThrow(IdTransformationError);

    try {
      plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    } catch (error) {
      expect((error as IdTransformationError).message).toContain(
        'Field is required but received null or undefined',
      );
    }
  });

  it('should handle missing properties with valid ID', (): void => {
    const plain = { Id: 123 };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect(baseBet.id).toBe(123n);
    expect(baseBet.name).toBeUndefined();
    expect(baseBet.line).toBeUndefined();
    expect(baseBet.baseLine).toBeUndefined();
    expect(baseBet.status).toBeUndefined();
    expect(baseBet.startPrice).toBeUndefined();
    expect(baseBet.price).toBeUndefined();
    expect(baseBet.priceVolume).toBeUndefined();
    expect(baseBet.settlement).toBeUndefined();
    expect(baseBet.lastUpdate).toBeUndefined();
    expect(baseBet.priceIN).toBeUndefined();
    expect(baseBet.priceUS).toBeUndefined();
    expect(baseBet.priceUK).toBeUndefined();
    expect(baseBet.priceMA).toBeUndefined();
    expect(baseBet.priceHK).toBeUndefined();
    expect(baseBet.probability).toBeUndefined();
    expect(baseBet.participantId).toBeUndefined();
    expect(baseBet.playerName).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 2,
      Name: 'Test BaseBet',
      Extra: 'ignore me',
    };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect((baseBet as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });

  it('should handle large ID numbers without precision loss', (): void => {
    const plain = {
      Id: '11060329315062111', // The example from the user - using string to avoid precision loss
      Name: 'Large ID Bet',
    };
    const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
    expect(baseBet).toBeInstanceOf(BaseBet);
    expect(baseBet.id).toBe(11060329315062111n);
    expect(baseBet.name).toBe('Large ID Bet');
  });

  it('should handle the complete end-to-end scenario with lossless-json parsing', (): void => {
    // Simulate the exact JSON response from the server
    const jsonResponse = '{"Id":11060329315062111,"Name":"End-to-End Test","Status":1}';

    // Parse using lossless-json (same as AxiosService does)
    const parsedData = parse(jsonResponse, undefined, customNumberParser) as {
      Id: bigint;
      Name: string;
      Status: number;
    };

    // Verify that the large number is preserved as BigInt
    expect(typeof parsedData.Id).toBe('bigint');
    expect(parsedData.Id).toBe(11060329315062111n);
    // Verify that small numbers remain as regular numbers
    expect(typeof parsedData.Status).toBe('number');
    expect(parsedData.Status).toBe(1);

    // Transform using class-transformer (as the application would)
    const baseBet = plainToInstance(BaseBet, parsedData, {
      excludeExtraneousValues: true,
    });

    // Verify the final result maintains precision
    expect(baseBet.id).toBe(11060329315062111n);
    expect(baseBet.name).toBe('End-to-End Test');
    expect(baseBet.status).toBe(1);
  });

  it('should demonstrate the precision bug fix', (): void => {
    const problematicNumber = '11060329315062111';

    // Show the BUG: Using parseInt before boundary check loses precision
    const buggyParseInt = parseInt(problematicNumber, 10);
    expect(buggyParseInt).toBe(11060329315062112); // Lost precision!
    expect(buggyParseInt.toString()).not.toBe(problematicNumber);

    // The old buggy logic would detect it needs BigInt but return wrong value
    const wouldBeCorrectlyClassified = buggyParseInt > Number.MAX_SAFE_INTEGER;
    expect(wouldBeCorrectlyClassified).toBe(true); // Would correctly identify as large

    // But the BUG is that if the old code returned BigInt(buggyParseInt),
    // it would create BigInt from the wrong number!
    const buggyBigInt = BigInt(buggyParseInt);
    expect(buggyBigInt.toString()).toBe('11060329315062112'); // Wrong value!
    expect(buggyBigInt.toString()).not.toBe(problematicNumber);

    // Show our FIX: String-based boundary check + BigInt from original string
    const correctResult = customNumberParser(problematicNumber);
    expect(typeof correctResult).toBe('bigint');
    expect(correctResult).toBe(11060329315062111n);
    expect(correctResult.toString()).toBe(problematicNumber); // Correct value!
  });

  it('should handle boundary cases correctly with string comparison', (): void => {
    // Test exact MAX_SAFE_INTEGER boundary
    expect(customNumberParser('9007199254740991')).toBe(9007199254740991);
    expect(typeof customNumberParser('9007199254740991')).toBe('number');

    // Test MAX_SAFE_INTEGER + 1 (should be BigInt)
    expect(customNumberParser('9007199254740992')).toBe(9007199254740992n);
    expect(typeof customNumberParser('9007199254740992')).toBe('bigint');

    // Test large positive numbers
    expect(customNumberParser('99999999999999999')).toBe(99999999999999999n);
    expect(typeof customNumberParser('99999999999999999')).toBe('bigint');

    // Test all negative numbers remain as regular numbers (using safe integer for test)
    expect(customNumberParser('-1234567890123456')).toBe(-1234567890123456);
    expect(typeof customNumberParser('-1234567890123456')).toBe('number');
  });

  it('should handle Transform decorator with both BigInt and number inputs', (): void => {
    // Test with BigInt input (from lossless-json)
    const plainWithBigInt = { Id: 11060329315062111n };
    const baseBetFromBigInt = plainToInstance(BaseBet, plainWithBigInt, {
      excludeExtraneousValues: true,
    });
    expect(baseBetFromBigInt.id).toBe(11060329315062111n);

    // Test with string input (fallback case)
    const plainWithString = { Id: '11060329315062111' };
    const baseBetFromString = plainToInstance(BaseBet, plainWithString, {
      excludeExtraneousValues: true,
    });
    expect(baseBetFromString.id).toBe(11060329315062111n);

    // Test with number input (small numbers)
    const plainWithNumber = { Id: 123 };
    const baseBetFromNumber = plainToInstance(BaseBet, plainWithNumber, {
      excludeExtraneousValues: true,
    });
    expect(baseBetFromNumber.id).toBe(123n);
  });

  it('should handle edge cases in string ID conversion', (): void => {
    // Test string with leading/trailing whitespace
    const plainWithWhitespaceString = { Id: '  123456  ' };
    const baseBetFromWhitespaceString = plainToInstance(BaseBet, plainWithWhitespaceString, {
      excludeExtraneousValues: true,
    });
    expect(baseBetFromWhitespaceString.id).toBe(123456n);

    // Test negative string ID
    const plainWithNegativeString = { Id: '-123456' };
    const baseBetFromNegativeString = plainToInstance(BaseBet, plainWithNegativeString, {
      excludeExtraneousValues: true,
    });
    expect(baseBetFromNegativeString.id).toBe(-123456n);

    // Test string with scientific notation (should fail validation)
    expect(() => {
      const plainWithScientific = { Id: '1e10' };
      plainToInstance(BaseBet, plainWithScientific, { excludeExtraneousValues: true });
    }).toThrow(IdTransformationError);

    try {
      const plainWithScientific = { Id: '1e10' };
      plainToInstance(BaseBet, plainWithScientific, { excludeExtraneousValues: true });
    } catch (error) {
      expect((error as IdTransformationError).message).toContain(
        "Expected integer, got non-numeric string: '1e10'",
      );
    }
  });

  describe('Additional Edge Cases for ID Transformation', () => {
    it('should handle zero values correctly', (): void => {
      // Test zero as number
      const plainWithZeroNumber = { Id: 0 };
      const baseBetFromZeroNumber = plainToInstance(BaseBet, plainWithZeroNumber, {
        excludeExtraneousValues: true,
      });
      expect(baseBetFromZeroNumber.id).toBe(0n);

      // Test zero as string
      const plainWithZeroString = { Id: '0' };
      const baseBetFromZeroString = plainToInstance(BaseBet, plainWithZeroString, {
        excludeExtraneousValues: true,
      });
      expect(baseBetFromZeroString.id).toBe(0n);
    });

    it('should handle string numbers with leading zeros', (): void => {
      const plainWithLeadingZeros = { Id: '000123' };
      const baseBet = plainToInstance(BaseBet, plainWithLeadingZeros, {
        excludeExtraneousValues: true,
      });
      expect(baseBet.id).toBe(123n);
    });

    it('should reject hexadecimal and octal string formats', (): void => {
      const testCases = ['0x123', '0X123', '0o123', '0O123', '0b101', '0B101'];

      testCases.forEach((hexValue) => {
        expect(() => {
          plainToInstance(BaseBet, { Id: hexValue }, { excludeExtraneousValues: true });
        }).toThrow(IdTransformationError);
      });
    });

    it('should reject float strings', (): void => {
      const testCases = ['123.0', '123.45', '-456.78', '0.0'];

      testCases.forEach((floatString) => {
        expect(() => {
          plainToInstance(BaseBet, { Id: floatString }, { excludeExtraneousValues: true });
        }).toThrow(IdTransformationError);
      });
    });

    it('should handle very large negative numbers', (): void => {
      const veryLargeNegative = '-99999999999999999';
      const baseBet = plainToInstance(
        BaseBet,
        { Id: veryLargeNegative },
        {
          excludeExtraneousValues: true,
        },
      );
      expect(baseBet.id).toBe(-99999999999999999n);
    });

    it('should reject strings with unicode characters', (): void => {
      const testCases = ['123α', '１２３', '123\u0000'];

      testCases.forEach((unicodeString) => {
        expect(() => {
          plainToInstance(BaseBet, { Id: unicodeString }, { excludeExtraneousValues: true });
        }).toThrow(IdTransformationError);
      });
    });

    it('should reject array inputs', (): void => {
      const testCases = [[], [123], ['123'], [1, 2, 3]];

      testCases.forEach((arrayValue) => {
        expect(() => {
          plainToInstance(BaseBet, { Id: arrayValue }, { excludeExtraneousValues: true });
        }).toThrow(IdTransformationError);
      });
    });

    it('should handle mixed whitespace in strings', (): void => {
      // Valid cases - should trim and work
      const validCases = ['\t123\t', '\n456\n', '\r789\r', '  \t  123  \t  '];

      validCases.forEach((whitespaceString) => {
        const baseBet = plainToInstance(
          BaseBet,
          { Id: whitespaceString },
          {
            excludeExtraneousValues: true,
          },
        );
        expect(typeof baseBet.id).toBe('bigint');
      });

      // Invalid cases - internal whitespace should fail
      const invalidCases = ['1 23', '1\t23', '1\n23', '12 3'];

      invalidCases.forEach((invalidString) => {
        expect(() => {
          plainToInstance(BaseBet, { Id: invalidString }, { excludeExtraneousValues: true });
        }).toThrow(IdTransformationError);
      });
    });

    it('should handle function inputs', (): void => {
      const functionValue = (): number => 123;

      expect(() => {
        plainToInstance(BaseBet, { Id: functionValue }, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });

    it('should handle symbol inputs', (): void => {
      const symbolValue = Symbol('123');

      expect(() => {
        plainToInstance(BaseBet, { Id: symbolValue }, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });
  });

  describe('Date Field Transformation', () => {
    it('should transform valid date strings to Date objects', (): void => {
      const plain = {
        Id: 123,
        LastUpdate: '2024-06-01T12:00:00Z',
      };
      const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
      expect(baseBet.lastUpdate).toBeInstanceOf(Date);
      expect(baseBet.lastUpdate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
    });

    it('should handle Date objects as input', (): void => {
      const testDate = new Date('2024-06-01T12:00:00Z');
      const plain = {
        Id: 123,
        LastUpdate: testDate,
      };
      const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
      expect(baseBet.lastUpdate).toBeInstanceOf(Date);
      expect(baseBet.lastUpdate?.getTime()).toBe(testDate.getTime());
    });

    it('should handle invalid date strings gracefully', (): void => {
      const plain = {
        Id: 123,
        LastUpdate: 'invalid-date',
      };
      const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
      expect(baseBet.lastUpdate).toBeInstanceOf(Date);
      expect(baseBet.lastUpdate?.toString()).toBe('Invalid Date');
    });

    it('should handle null/undefined for optional date field', (): void => {
      const plainWithNull = { Id: 123, LastUpdate: null };
      const baseBetFromNull = plainToInstance(BaseBet, plainWithNull, {
        excludeExtraneousValues: true,
      });
      expect(baseBetFromNull.lastUpdate).toBeNull();

      const plainWithUndefined = { Id: 123, LastUpdate: undefined };
      const baseBetFromUndefined = plainToInstance(BaseBet, plainWithUndefined, {
        excludeExtraneousValues: true,
      });
      expect(baseBetFromUndefined.lastUpdate).toBeUndefined();
    });
  });

  describe('Enum Field Validation', () => {
    it('should handle valid enum values for Status', (): void => {
      const validStatuses = [
        BetStatus.NotSet,
        BetStatus.Open,
        BetStatus.Suspended,
        BetStatus.Settled,
      ];

      validStatuses.forEach((status) => {
        const plain = { Id: 123, Status: status };
        const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
        expect(baseBet.status).toBe(status);
      });
    });

    it('should handle valid enum values for Settlement', (): void => {
      const validSettlements = [
        SettlementType.Cancelled,
        SettlementType.NotSettled,
        SettlementType.Loser,
        SettlementType.Winner,
        SettlementType.Refund,
        SettlementType.HalfLost,
        SettlementType.HalfWon,
      ];

      validSettlements.forEach((settlement) => {
        const plain = { Id: 123, Settlement: settlement };
        const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
        expect(baseBet.settlement).toBe(settlement);
      });
    });

    it('should handle invalid enum values by preserving them', (): void => {
      // class-transformer doesn't validate enum values by default
      const plain = { Id: 123, Status: 999, Settlement: -1 };
      const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
      expect(baseBet.status).toBe(999);
      expect(baseBet.settlement).toBe(-1);
    });
  });

  describe('Default Value Behavior', () => {
    it('should handle IsChanged field when not provided', (): void => {
      const plain = { Id: 123 };
      const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
      expect(baseBet.isChanged).toBeUndefined();
    });

    it('should handle explicit IsChanged value', (): void => {
      const plain = { Id: 123, IsChanged: 5 };
      const baseBet = plainToInstance(BaseBet, plain, { excludeExtraneousValues: true });
      expect(baseBet.isChanged).toBe(5);
    });

    it('should handle IsChanged with default constructor behavior', (): void => {
      // When creating new instance directly, default value applies
      const baseBet = new BaseBet();
      expect(baseBet.isChanged).toBe(-1);
    });
  });

  describe('Error Handling for Required ID Field', () => {
    it('should throw IdTransformationError for null ID', (): void => {
      const plainWithNullId = { Id: null };

      expect(() => {
        plainToInstance(BaseBet, plainWithNullId, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });

    it('should throw IdTransformationError for undefined ID', (): void => {
      const plainWithUndefinedId = { Id: undefined };

      expect(() => {
        plainToInstance(BaseBet, plainWithUndefinedId, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });

    it('should throw IdTransformationError for empty string ID', (): void => {
      const plainWithEmptyId = { Id: '' };

      expect(() => {
        plainToInstance(BaseBet, plainWithEmptyId, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });

    it('should throw IdTransformationError for whitespace-only string ID', (): void => {
      const plainWithWhitespaceId = { Id: '   ' };

      expect(() => {
        plainToInstance(BaseBet, plainWithWhitespaceId, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });

    it('should throw IdTransformationError for non-numeric string ID', (): void => {
      const plainWithInvalidId = { Id: 'not-a-number' };

      expect(() => {
        plainToInstance(BaseBet, plainWithInvalidId, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });

    it('should throw IdTransformationError for decimal number ID', (): void => {
      const plainWithDecimalId = { Id: 123.45 };

      expect(() => {
        plainToInstance(BaseBet, plainWithDecimalId, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });

    it('should throw IdTransformationError for NaN ID', (): void => {
      const plainWithNaNId = { Id: NaN };

      expect(() => {
        plainToInstance(BaseBet, plainWithNaNId, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });

    it('should throw IdTransformationError for Infinity ID', (): void => {
      const plainWithInfinityId = { Id: Infinity };

      expect(() => {
        plainToInstance(BaseBet, plainWithInfinityId, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });

    it('should throw IdTransformationError for boolean ID', (): void => {
      const plainWithBooleanId = { Id: true };

      expect(() => {
        plainToInstance(BaseBet, plainWithBooleanId, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });

    it('should throw IdTransformationError for object ID', (): void => {
      const plainWithObjectId = { Id: {} };

      expect(() => {
        plainToInstance(BaseBet, plainWithObjectId, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });

    it('should provide detailed error information in IdTransformationError', (): void => {
      const plainWithInvalidId = { Id: 123.45 };

      try {
        plainToInstance(BaseBet, plainWithInvalidId, { excludeExtraneousValues: true });
        throw new Error('Expected IdTransformationError to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(IdTransformationError);
        expect((error as IdTransformationError).fieldName).toBe('Id');
        expect((error as IdTransformationError).originalValue).toBe(123.45);
        expect((error as IdTransformationError).message).toContain(
          "Invalid ID transformation for field 'Id'",
        );
        expect((error as IdTransformationError).message).toContain('decimal number');
      }
    });

    it('should provide appropriate error message for different invalid types', (): void => {
      const testCases = [
        { value: 'abc', expectedMessage: 'non-numeric string' },
        { value: NaN, expectedMessage: 'non-finite' },
        { value: Infinity, expectedMessage: 'non-finite' },
        { value: 123.45, expectedMessage: 'decimal number' },
        { value: true, expectedMessage: 'Invalid ID type' },
        { value: {}, expectedMessage: 'Invalid ID type' },
      ];

      testCases.forEach(({ value, expectedMessage }) => {
        try {
          plainToInstance(BaseBet, { Id: value }, { excludeExtraneousValues: true });
          throw new Error(`Expected IdTransformationError to be thrown for value: ${value}`);
        } catch (error) {
          expect(error).toBeInstanceOf(IdTransformationError);
          expect((error as IdTransformationError).message).toContain(expectedMessage);
        }
      });
    });

    it('should handle string with scientific notation as invalid', (): void => {
      const plainWithScientific = { Id: '1e10' };

      expect(() => {
        plainToInstance(BaseBet, plainWithScientific, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);

      try {
        plainToInstance(BaseBet, plainWithScientific, { excludeExtraneousValues: true });
      } catch (error) {
        expect((error as IdTransformationError).message).toContain('non-numeric string');
      }
    });
  });

  describe('Backward Compatibility', () => {
    it('should maintain backward compatibility for valid inputs', (): void => {
      const validInputs = [
        { Id: 1 },
        { Id: '123' },
        { Id: 9007199254740991 }, // MAX_SAFE_INTEGER
        { Id: '9007199254740992' }, // MAX_SAFE_INTEGER + 1 as string
        { Id: 123n }, // BigInt input
      ];

      validInputs.forEach((input) => {
        expect(() => {
          const result = plainToInstance(BaseBet, input, { excludeExtraneousValues: true });
          expect(typeof result.id).toBe('bigint');
        }).not.toThrow();
      });
    });

    it('should handle missing Id property by throwing error', (): void => {
      const plainWithoutId = { Name: 'Test Bet' };

      expect(() => {
        plainToInstance(BaseBet, plainWithoutId, { excludeExtraneousValues: true });
      }).toThrow(IdTransformationError);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle complete bet data with all fields', (): void => {
      const completeData = {
        Id: '999999999999999999',
        Name: 'Complete Bet',
        Line: '1.5',
        BaseLine: '1.0',
        Status: BetStatus.Open,
        StartPrice: '2.50',
        Price: '2.75',
        PriceVolume: '1000.00',
        Settlement: SettlementType.Winner,
        SuspensionReason: 5,
        LastUpdate: '2024-06-01T12:00:00Z',
        PriceIN: '2.75',
        PriceUS: '+175',
        PriceUK: '7/4',
        PriceMA: '1.75',
        PriceHK: '1.75',
        IsChanged: 1,
        Probability: 0.36,
        ParticipantId: 789,
        PlayerName: 'Test Player',
      };

      const baseBet = plainToInstance(BaseBet, completeData, { excludeExtraneousValues: true });

      expect(baseBet.id).toBe(999999999999999999n);
      expect(baseBet.name).toBe('Complete Bet');
      expect(baseBet.line).toBe('1.5');
      expect(baseBet.baseLine).toBe('1.0');
      expect(baseBet.status).toBe(BetStatus.Open);
      expect(baseBet.startPrice).toBe('2.50');
      expect(baseBet.price).toBe('2.75');
      expect(baseBet.priceVolume).toBe('1000.00');
      expect(baseBet.settlement).toBe(SettlementType.Winner);
      expect(baseBet.suspensionReason).toBe(5);
      expect(baseBet.lastUpdate).toBeInstanceOf(Date);
      expect(baseBet.priceIN).toBe('2.75');
      expect(baseBet.priceUS).toBe('+175');
      expect(baseBet.priceUK).toBe('7/4');
      expect(baseBet.priceMA).toBe('1.75');
      expect(baseBet.priceHK).toBe('1.75');
      expect(baseBet.isChanged).toBe(1);
      expect(baseBet.probability).toBe(0.36);
      expect(baseBet.participantId).toBe(789);
      expect(baseBet.playerName).toBe('Test Player');
    });

    it('should handle partial data gracefully', (): void => {
      const partialData = {
        Id: 12345,
        Name: 'Partial Bet',
        Status: BetStatus.Suspended,
      };

      const baseBet = plainToInstance(BaseBet, partialData, { excludeExtraneousValues: true });

      expect(baseBet.id).toBe(12345n);
      expect(baseBet.name).toBe('Partial Bet');
      expect(baseBet.status).toBe(BetStatus.Suspended);
      expect(baseBet.isChanged).toBeUndefined(); // Not provided in partial data
      // All other fields should be undefined
      expect(baseBet.line).toBeUndefined();
      expect(baseBet.price).toBeUndefined();
      expect(baseBet.lastUpdate).toBeUndefined();
    });
  });

  describe('toJSON method', () => {
    it('should convert BigInt ID to string with n suffix', () => {
      const plainData = {
        Id: '11060329315062111', // The problematic precision-loss value as string
        Name: 'Test Bet',
        Status: BetStatus.Open,
      };

      const baseBet = plainToInstance(BaseBet, plainData, { excludeExtraneousValues: true });
      const json = baseBet.toJSON();

      // ID should be converted to string with 'n' suffix
      expect(json.id).toBe('11060329315062111n');
      expect(typeof json.id).toBe('string');

      // Other properties should remain unchanged
      expect(json.name).toBe('Test Bet');
      expect(json.status).toBe(BetStatus.Open);
    });

    it('should preserve precision for large BigInt values in JSON', () => {
      const largeBigIntId = 999999999999999999999n;
      const plainData = {
        Id: largeBigIntId.toString(),
        Name: 'Large ID Bet',
      };

      const baseBet = plainToInstance(BaseBet, plainData, { excludeExtraneousValues: true });
      const json = baseBet.toJSON();

      expect(json.id).toBe('999999999999999999999n');

      // Verify we can safely restore the BigInt value
      const idString = (json.id as string).slice(0, -1); // Remove 'n'
      expect(BigInt(idString)).toBe(largeBigIntId);
    });

    it('should handle JSON round-trip with BigIntSerializationUtil.safeParse', () => {
      const plainData = {
        Id: '11060329315062111', // Use string to avoid precision loss
        Name: 'Round Trip Test',
        ParticipantId: 123,
      };

      const baseBet = plainToInstance(BaseBet, plainData, { excludeExtraneousValues: true });

      // Serialize to JSON string
      const jsonString = JSON.stringify(baseBet.toJSON());

      // Parse back using safeParse to restore BigInt
      const parsed = BigIntSerializationUtil.safeParse(jsonString) as any;

      expect(parsed.id).toBe(11060329315062111n); // Should be BigInt again
      expect(typeof parsed.id).toBe('bigint');
      expect(parsed.name).toBe('Round Trip Test');
      expect(parsed.participantId).toBe(123);
    });

    it('should not lose precision when compared to direct Number conversion', () => {
      const problematicValueString = '11060329315062111'; // Use string to avoid precision loss
      const problematicValueNumber = '11060329315062111'; // Use string to avoid precision loss
      const plainData = { Id: problematicValueString };

      const baseBet = plainToInstance(BaseBet, plainData, { excludeExtraneousValues: true });
      const json = baseBet.toJSON();

      // Extract the numeric part (without 'n')
      const preservedValue = (json.id as string).slice(0, -1);

      // Direct Number conversion loses precision
      expect(Number(problematicValueNumber).toString()).toBe('11060329315062112'); // ❌ Wrong

      // Our toJSON preserves it perfectly
      expect(preservedValue).toBe('11060329315062111'); // ✅ Correct
    });

    it('should handle all property types correctly in toJSON', () => {
      const plainData = {
        Id: 123456789n,
        Name: 'Full Test',
        Line: '1.5',
        Status: BetStatus.Open,
        Price: '2.50',
        IsChanged: 1,
        ParticipantId: 999,
        PlayerName: 'John Doe',
      };

      const baseBet = plainToInstance(BaseBet, plainData, { excludeExtraneousValues: true });
      const json = baseBet.toJSON();

      // BigInt converted to string with 'n'
      expect(json.id).toBe('123456789n');

      // Other types preserved
      expect(json.name).toBe('Full Test');
      expect(json.line).toBe('1.5');
      expect(json.status).toBe(BetStatus.Open);
      expect(json.price).toBe('2.50');
      expect(json.isChanged).toBe(1);
      expect(json.participantId).toBe(999);
      expect(json.playerName).toBe('John Doe');
    });

    it('should be serializable with JSON.stringify after toJSON', () => {
      const plainData = {
        Id: '11060329315062111', // Use string to avoid precision loss
        Name: 'Stringify Test',
      };

      const baseBet = plainToInstance(BaseBet, plainData, { excludeExtraneousValues: true });

      // This should not throw "Do not know how to serialize a BigInt"
      expect(() => {
        JSON.stringify(baseBet.toJSON());
      }).not.toThrow();

      const jsonString = JSON.stringify(baseBet.toJSON());
      expect(jsonString).toContain('"id":"11060329315062111n"');
      expect(jsonString).toContain('"name":"Stringify Test"');
    });
  });
});
