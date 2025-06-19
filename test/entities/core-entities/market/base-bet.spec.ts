import { plainToInstance } from 'class-transformer';
import { parse, isInteger } from 'lossless-json';
import { BaseBet } from '../../../../src/entities/core-entities/market/base-bet';
import { BetStatus } from '../../../../src/entities/core-entities/enums/bet-status';
import { SettlementType } from '../../../../src/entities/core-entities/enums/settlement-type';
import { IdTransformationError } from '../../../../src/entities/errors/id-transformation.error';

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
        fail('Expected IdTransformationError to be thrown');
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
        { value: NaN, expectedMessage: 'decimal number' },
        { value: Infinity, expectedMessage: 'decimal number' },
        { value: 123.45, expectedMessage: 'decimal number' },
        { value: true, expectedMessage: 'Invalid ID type' },
        { value: {}, expectedMessage: 'Invalid ID type' },
      ];

      testCases.forEach(({ value, expectedMessage }) => {
        try {
          plainToInstance(BaseBet, { Id: value }, { excludeExtraneousValues: true });
          fail(`Expected IdTransformationError to be thrown for value: ${value}`);
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
});
