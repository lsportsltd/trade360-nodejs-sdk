import { transformToBigInt } from '../../../../src/entities/core-entities/utilities/id-transformation';
import { IdTransformationError } from '../../../../src/entities/errors/id-transformation.error';

describe('transformToBigInt utility function', () => {
  describe('Valid inputs', () => {
    describe('BigInt inputs', () => {
      it('should return BigInt values unchanged', () => {
        const testCases = [0n, 123n, -456n, 999999999999999999n];

        testCases.forEach((value) => {
          const result = transformToBigInt(value, false, 'test');
          expect(result).toBe(value);
          expect(typeof result).toBe('bigint');
        });
      });

      it('should handle very large BigInt values', () => {
        const largeBigInt = 999999999999999999999999n;
        const result = transformToBigInt(largeBigInt, true, 'largeId');
        expect(result).toBe(largeBigInt);
      });
    });

    describe('String inputs', () => {
      it('should convert valid numeric strings to BigInt', () => {
        const testCases = [
          { input: '123', expected: 123n },
          { input: '0', expected: 0n },
          { input: '-456', expected: -456n },
          { input: '999999999999999999', expected: 999999999999999999n },
        ];

        testCases.forEach(({ input, expected }) => {
          const result = transformToBigInt(input, true, 'test');
          expect(result).toBe(expected);
        });
      });

      it('should handle strings with leading and trailing whitespace', () => {
        const testCases = ['  123  ', '\t456\t', '\n789\n', '\r123\r', '  \t  456  \t  '];

        testCases.forEach((input) => {
          const result = transformToBigInt(input, true, 'test');
          expect(typeof result).toBe('bigint');
          expect(result).toBeGreaterThan(0n);
        });
      });

      it('should handle strings with leading zeros', () => {
        const result = transformToBigInt('000123', true, 'test');
        expect(result).toBe(123n);
      });

      it('should handle BigInt serialized strings (with n suffix)', () => {
        const testCases = [
          { input: '123n', expected: 123n },
          { input: '999999999999999999n', expected: 999999999999999999n },
          { input: '-456n', expected: -456n },
          { input: '0n', expected: 0n },
        ];

        testCases.forEach(({ input, expected }) => {
          const result = transformToBigInt(input, true, 'test');
          expect(result).toBe(expected);
        });
      });
    });

    describe('Number inputs', () => {
      it('should convert valid integers to BigInt', () => {
        const testCases = [
          { input: 123, expected: 123n },
          { input: 0, expected: 0n },
          { input: -456, expected: -456n },
          { input: 9007199254740991, expected: 9007199254740991n }, // MAX_SAFE_INTEGER
        ];

        testCases.forEach(({ input, expected }) => {
          const result = transformToBigInt(input, true, 'test');
          expect(result).toBe(expected);
        });
      });

      it('should handle very large safe integers', () => {
        const largeNumber = 9007199254740991; // MAX_SAFE_INTEGER
        const result = transformToBigInt(largeNumber, true, 'test');
        expect(result).toBe(BigInt(largeNumber));
      });
    });
  });

  describe('Invalid inputs - when required=false', () => {
    it('should return undefined for null when not required', () => {
      const result = transformToBigInt(null, false, 'test');
      expect(result).toBeUndefined();
    });

    it('should return undefined for undefined when not required', () => {
      const result = transformToBigInt(undefined, false, 'test');
      expect(result).toBeUndefined();
    });

    it('should return undefined for empty string when not required', () => {
      const testCases = ['', '   ', '\t', '\n', '\r'];

      testCases.forEach((input) => {
        const result = transformToBigInt(input, false, 'test');
        expect(result).toBeUndefined();
      });
    });

    it('should return undefined for non-numeric strings when not required', () => {
      const testCases = ['abc', '12.3', '1e10', '0x123', 'NaN', 'Infinity'];

      testCases.forEach((input) => {
        const result = transformToBigInt(input, false, 'test');
        expect(result).toBeUndefined();
      });
    });

    it('should return undefined for invalid numbers when not required', () => {
      const testCases = [NaN, Infinity, -Infinity, 12.3, -45.6];

      testCases.forEach((input) => {
        const result = transformToBigInt(input, false, 'test');
        expect(result).toBeUndefined();
      });
    });

    it('should return undefined for invalid types when not required', () => {
      const testCases = [true, false, {}, [], () => {}, Symbol('test')];

      testCases.forEach((input) => {
        const result = transformToBigInt(input, false, 'test');
        expect(result).toBeUndefined();
      });
    });
  });

  describe('Invalid inputs - when required=true', () => {
    it('should throw IdTransformationError for null when required', () => {
      expect(() => {
        transformToBigInt(null, true, 'requiredField');
      }).toThrow(IdTransformationError);

      try {
        transformToBigInt(null, true, 'requiredField');
      } catch (error) {
        expect(error).toBeInstanceOf(IdTransformationError);
        expect((error as IdTransformationError).fieldName).toBe('requiredField');
        expect((error as IdTransformationError).originalValue).toBe(null);
        expect((error as IdTransformationError).message).toContain(
          'required but received null or undefined',
        );
      }
    });

    it('should throw IdTransformationError for undefined when required', () => {
      expect(() => {
        transformToBigInt(undefined, true, 'requiredField');
      }).toThrow(IdTransformationError);
    });

    it('should throw IdTransformationError for empty string when required', () => {
      expect(() => {
        transformToBigInt('', true, 'requiredField');
      }).toThrow(IdTransformationError);

      try {
        transformToBigInt('   ', true, 'requiredField');
      } catch (error) {
        expect((error as IdTransformationError).message).toContain(
          'required but received empty string',
        );
      }
    });

    it('should throw IdTransformationError for non-numeric strings when required', () => {
      const testCases = [
        { input: 'abc', expectedMessage: 'non-numeric string' },
        { input: '12.3', expectedMessage: 'non-numeric string' },
        { input: '1e10', expectedMessage: 'non-numeric string' },
        { input: '0x123', expectedMessage: 'non-numeric string' },
        { input: '1 23', expectedMessage: 'non-numeric string' },
      ];

      testCases.forEach(({ input, expectedMessage }) => {
        expect(() => {
          transformToBigInt(input, true, 'requiredField');
        }).toThrow(IdTransformationError);

        try {
          transformToBigInt(input, true, 'requiredField');
        } catch (error) {
          expect((error as IdTransformationError).message).toContain(expectedMessage);
          expect((error as IdTransformationError).originalValue).toBe(input);
        }
      });
    });

    it('should throw IdTransformationError for invalid numbers when required', () => {
      const testCases = [
        { input: NaN, expectedMessage: 'non-finite' },
        { input: Infinity, expectedMessage: 'non-finite' },
        { input: -Infinity, expectedMessage: 'non-finite' },
        { input: 12.3, expectedMessage: 'decimal' },
        { input: -45.6, expectedMessage: 'decimal' },
      ];

      testCases.forEach(({ input, expectedMessage }) => {
        expect(() => {
          transformToBigInt(input, true, 'requiredField');
        }).toThrow(IdTransformationError);

        try {
          transformToBigInt(input, true, 'requiredField');
        } catch (error) {
          expect((error as IdTransformationError).message).toContain(expectedMessage);
          expect((error as IdTransformationError).originalValue).toBe(input);
        }
      });
    });

    it('should throw IdTransformationError for invalid types when required', () => {
      const testCases = [
        { input: true, expectedType: 'boolean' },
        { input: {}, expectedType: 'object' },
        { input: [], expectedType: 'object' },
        { input: () => {}, expectedType: 'function' },
        { input: Symbol('test'), expectedType: 'symbol' },
      ];

      testCases.forEach(({ input, expectedType }) => {
        expect(() => {
          transformToBigInt(input, true, 'requiredField');
        }).toThrow(IdTransformationError);

        try {
          transformToBigInt(input, true, 'requiredField');
        } catch (error) {
          expect((error as IdTransformationError).message).toContain('Invalid ID type');
          expect((error as IdTransformationError).message).toContain(expectedType);
          expect((error as IdTransformationError).originalValue).toBe(input);
        }
      });
    });
  });

  describe('Error details and context', () => {
    it('should include proper field name in error', () => {
      const fieldName = 'customFieldName';

      try {
        transformToBigInt('invalid', true, fieldName);
      } catch (error) {
        expect((error as IdTransformationError).fieldName).toBe(fieldName);
        expect((error as IdTransformationError).message).toContain(`'${fieldName}'`);
      }
    });

    it('should use default field name when not provided', () => {
      try {
        transformToBigInt('invalid', true);
      } catch (error) {
        expect((error as IdTransformationError).fieldName).toBe('id');
        expect((error as IdTransformationError).message).toContain("'id'");
      }
    });

    it('should provide detailed error messages for different failure types', () => {
      const testCases = [
        {
          input: null,
          field: 'testNull',
          expectedInMessage: ['required', 'null or undefined'],
        },
        {
          input: 'abc',
          field: 'testString',
          expectedInMessage: ['Expected integer', 'non-numeric string'],
        },
        {
          input: 12.5,
          field: 'testDecimal',
          expectedInMessage: ['Invalid ID format', 'decimal number'],
        },
        {
          input: true,
          field: 'testBoolean',
          expectedInMessage: ['Invalid ID type', 'boolean'],
        },
      ];

      testCases.forEach(({ input, field, expectedInMessage }) => {
        try {
          transformToBigInt(input, true, field);
          fail(`Expected error for input: ${input}`);
        } catch (error) {
          expect(error).toBeInstanceOf(IdTransformationError);
          const message = (error as IdTransformationError).message;
          expectedInMessage.forEach((expectedText) => {
            expect(message).toContain(expectedText);
          });
        }
      });
    });
  });

  describe('Edge cases and boundaries', () => {
    it('should handle very long numeric strings correctly', () => {
      const veryLongNumber = '123456789012345678901234567890';
      const result = transformToBigInt(veryLongNumber, true, 'test');
      expect(result).toBe(BigInt(veryLongNumber));
    });

    it('should handle string conversion edge cases', () => {
      // Test string that could cause parseInt precision issues
      const problematicString = '11060329315062111';
      const result = transformToBigInt(problematicString, true, 'test');
      expect(result).toBe(11060329315062111n);
      expect(result!.toString()).toBe(problematicString);
    });

    it('should handle mixed whitespace correctly', () => {
      const mixedWhitespace = '\t\n\r 123 \r\n\t';
      const result = transformToBigInt(mixedWhitespace, true, 'test');
      expect(result).toBe(123n);
    });

    it('should reject strings with internal whitespace', () => {
      const internalWhitespace = ['1 23', '12\t3', '1\n23', '12 34'];

      internalWhitespace.forEach((input) => {
        expect(() => {
          transformToBigInt(input, true, 'test');
        }).toThrow(IdTransformationError);
      });
    });

    it('should handle Math.trunc for number inputs correctly', () => {
      // Verify that number inputs use Math.trunc
      const testNumber = 123.999;
      const result = transformToBigInt(testNumber, false, 'test'); // Should fail due to non-integer
      expect(result).toBeUndefined();
    });

    it('should handle negative zero correctly', () => {
      const result = transformToBigInt(-0, true, 'test');
      expect(result).toBe(0n);
    });
  });

  describe('Performance and regression tests', () => {
    it('should handle the exact problematic case from the original bug', () => {
      // This is the specific case that caused precision loss
      const problematicId = '11060329315062111';

      // Demonstrate the bug with parseInt
      const buggyResult = parseInt(problematicId, 10);
      expect(buggyResult).toBe(11060329315062112); // Shows precision loss

      // Show our fix works correctly
      const correctResult = transformToBigInt(problematicId, true, 'Id');
      expect(correctResult).toBe(11060329315062111n);
      expect(correctResult!.toString()).toBe(problematicId);
    });

    it('should maintain consistency across different input formats for same value', () => {
      const value = '123456789012345678';
      const bigintValue = BigInt(value);

      // String and BigInt should give same result
      const fromString = transformToBigInt(value, true, 'test');
      const fromBigInt = transformToBigInt(bigintValue, true, 'test');
      const fromSerializedString = transformToBigInt(value + 'n', true, 'test');

      expect(fromString).toBe(fromBigInt);
      expect(fromString).toBe(fromSerializedString);
      expect(fromString?.toString()).toBe(value);
    });

    it('should handle boundary cases around number precision', () => {
      const maxSafeInteger = 9007199254740991;
      const maxSafeIntegerPlusOne = '9007199254740992';

      // MAX_SAFE_INTEGER should work as number
      const safeResult = transformToBigInt(maxSafeInteger, true, 'test');
      expect(safeResult).toBe(BigInt(maxSafeInteger));

      // MAX_SAFE_INTEGER + 1 should work as string
      const unsafeResult = transformToBigInt(maxSafeIntegerPlusOne, true, 'test');
      expect(unsafeResult).toBe(BigInt(maxSafeIntegerPlusOne));
    });
  });
});
