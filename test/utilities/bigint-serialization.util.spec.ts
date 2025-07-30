import { BigIntSerializationUtil } from '../../src/entities/utilities/bigint-serialization.util';

describe('BigIntSerializationUtil', () => {
  describe('bigIntReplacer', () => {
    it('should convert BigInt values to strings with n suffix', () => {
      const result = BigIntSerializationUtil.bigIntReplacer('test', 123n);
      expect(result).toBe('123n');
    });

    it('should preserve non-BigInt values unchanged', () => {
      const testCases = [
        { value: 123, expected: 123 },
        { value: 'string', expected: 'string' },
        { value: true, expected: true },
        { value: null, expected: null },
        { value: undefined, expected: undefined },
        { value: [], expected: [] },
        { value: {}, expected: {}, isObject: true },
      ];

      testCases.forEach(({ value, expected, isObject }) => {
        const result = BigIntSerializationUtil.bigIntReplacer('test', value);
        if (Array.isArray(expected) || isObject) {
          expect(result).toEqual(expected);
        } else {
          expect(result).toBe(expected);
        }
      });
    });

    it('should handle very large BigInt values', () => {
      const largeBigInt = 999999999999999999999999n;
      const result = BigIntSerializationUtil.bigIntReplacer('test', largeBigInt);
      expect(result).toBe('999999999999999999999999n');
    });

    it('should handle negative BigInt values', () => {
      const negativeBigInt = -123456789n;
      const result = BigIntSerializationUtil.bigIntReplacer('test', negativeBigInt);
      expect(result).toBe('-123456789n');
    });

    it('should handle zero BigInt value', () => {
      const result = BigIntSerializationUtil.bigIntReplacer('test', 0n);
      expect(result).toBe('0n');
    });
  });

  describe('customNumberParser', () => {
    it('should convert large positive integers to BigInt', () => {
      const testCases = [
        '99999999999999999', // 17+ digits
        '9999999999999999', // 16 digits
        '9007199254740992', // MAX_SAFE_INTEGER + 1
      ];

      testCases.forEach((value) => {
        const result = BigIntSerializationUtil.customNumberParser(value);
        expect(typeof result).toBe('bigint');
        expect(result).toBe(BigInt(value));
      });
    });

    it('should keep safe integers as numbers', () => {
      const testCases = [
        '123',
        '9007199254740991', // MAX_SAFE_INTEGER
        '1000000000000000', // 16 digits but less than MAX_SAFE_INTEGER
      ];

      testCases.forEach((value) => {
        const result = BigIntSerializationUtil.customNumberParser(value);
        expect(typeof result).toBe('number');
        expect(result).toBe(parseInt(value, 10));
      });
    });

    it('should handle negative numbers as regular numbers', () => {
      const testCases = [
        '-123',
        '-9999999999999999999', // Even very large negative numbers
      ];

      testCases.forEach((value) => {
        const result = BigIntSerializationUtil.customNumberParser(value);
        expect(typeof result).toBe('number');
        expect(result).toBe(parseInt(value, 10));
      });
    });

    it('should handle decimal numbers', () => {
      const testCases = ['123.45', '-456.78', '0.123'];

      testCases.forEach((value) => {
        const result = BigIntSerializationUtil.customNumberParser(value);
        expect(typeof result).toBe('number');
        expect(result).toBe(parseFloat(value));
      });
    });

    it('should handle edge cases around MAX_SAFE_INTEGER boundary', () => {
      // Exactly MAX_SAFE_INTEGER should be number
      const maxSafe = '9007199254740991';
      expect(typeof BigIntSerializationUtil.customNumberParser(maxSafe)).toBe('number');
      expect(BigIntSerializationUtil.customNumberParser(maxSafe)).toBe(9007199254740991);

      // MAX_SAFE_INTEGER + 1 should be BigInt
      const maxSafePlusOne = '9007199254740992';
      expect(typeof BigIntSerializationUtil.customNumberParser(maxSafePlusOne)).toBe('bigint');
      expect(BigIntSerializationUtil.customNumberParser(maxSafePlusOne)).toBe(9007199254740992n);
    });

    it('should handle zero', () => {
      const result = BigIntSerializationUtil.customNumberParser('0');
      expect(typeof result).toBe('number');
      expect(result).toBe(0);
    });
  });

  describe('stringify', () => {
    it('should stringify objects with BigInt values', () => {
      const obj = {
        id: 123n,
        name: 'test',
        count: 456,
      };

      const result = BigIntSerializationUtil.stringify(obj);
      expect(result).toBe('{"id":"123n","name":"test","count":456}');
    });

    it('should handle nested objects with BigInt values', () => {
      const obj = {
        user: {
          id: 999999999999999999n,
          settings: {
            limit: 100n,
          },
        },
        items: [{ id: 123n }, { id: 456n }],
      };

      const result = BigIntSerializationUtil.stringify(obj);
      const parsed = JSON.parse(result);
      expect(parsed.user.id).toBe('999999999999999999n');
      expect(parsed.user.settings.limit).toBe('100n');
      expect(parsed.items[0].id).toBe('123n');
      expect(parsed.items[1].id).toBe('456n');
    });

    it('should handle arrays with BigInt values', () => {
      const arr = [123n, 'test', 456, true, null];
      const result = BigIntSerializationUtil.stringify(arr);
      expect(result).toBe('["123n","test",456,true,null]');
    });

    it('should handle objects without BigInt values normally', () => {
      const obj = { name: 'test', count: 123, active: true };
      const result = BigIntSerializationUtil.stringify(obj);
      expect(result).toBe('{"name":"test","count":123,"active":true}');
    });

    it('should handle formatting with space parameter', () => {
      const obj = { id: 123n, name: 'test' };
      const result = BigIntSerializationUtil.stringify(obj, 2);
      expect(result).toContain('\n');
      expect(result).toContain('  '); // 2 spaces indentation
    });

    it('should handle circular references gracefully', () => {
      const obj: any = { name: 'test' };
      obj.self = obj; // Create circular reference

      const result = BigIntSerializationUtil.stringify(obj);
      expect(result).toContain('Serialization failed');
    });

    it('should handle unserializable objects', () => {
      const obj = { func: () => {}, symbol: Symbol('test') };
      const result = BigIntSerializationUtil.stringify(obj);
      // Should not throw, should return safe fallback
      expect(typeof result).toBe('string');
    });
  });

  describe('errorToString', () => {
    it('should handle Error objects with BigInt properties', () => {
      const error = new Error('Test error');
      (error as any).id = 123n;
      (error as any).metadata = { bigintValue: 456n };

      const result = BigIntSerializationUtil.errorToString(error);
      expect(result).toContain('Test error');
      expect(result).toContain('123n');
      expect(result).toContain('456n');
    });

    it('should handle standard Error objects', () => {
      const error = new Error('Standard error');
      const result = BigIntSerializationUtil.errorToString(error);

      const parsed = JSON.parse(result);
      expect(parsed.name).toBe('Error');
      expect(parsed.message).toBe('Standard error');
      expect(parsed.stack).toBeDefined();
    });

    it('should handle custom Error classes', () => {
      class CustomError extends Error {
        constructor(
          message: string,
          public code: number,
        ) {
          super(message);
          this.name = 'CustomError';
        }
      }

      const error = new CustomError('Custom error message', 500);
      const result = BigIntSerializationUtil.errorToString(error);

      const parsed = JSON.parse(result);
      expect(parsed.name).toBe('CustomError');
      expect(parsed.message).toBe('Custom error message');
      expect(parsed.code).toBe(500);
    });

    it('should handle non-Error objects', () => {
      const notAnError = 'Just a string';
      const result = BigIntSerializationUtil.errorToString(notAnError);
      expect(result).toBe('Just a string');
    });

    it('should handle complex objects as errors', () => {
      const complexError = { message: 'Error', id: 123n };
      const result = BigIntSerializationUtil.errorToString(complexError);
      expect(result).toBe('[object Object]');
    });

    it('should fallback gracefully for unserializable errors', () => {
      const error = new Error('Test');
      (error as any).circular = error; // Create circular reference

      const result = BigIntSerializationUtil.errorToString(error);
      expect(result).toContain('Serialization failed'); // Should contain error fallback
    });
  });

  describe('extractErrorInfo', () => {
    it('should extract basic info from Error objects', () => {
      const error = new Error('Test error');
      const result = BigIntSerializationUtil.extractErrorInfo(error);

      expect(result).toEqual({
        type: 'Error',
        message: 'Test error',
        hasStack: true,
      });
    });

    it('should extract info from custom Error classes', () => {
      class ValidationError extends Error {
        constructor(message: string) {
          super(message);
          this.name = 'ValidationError';
        }
      }

      const error = new ValidationError('Validation failed');
      const result = BigIntSerializationUtil.extractErrorInfo(error);

      expect(result).toEqual({
        type: 'ValidationError',
        message: 'Validation failed',
        hasStack: true,
      });
    });

    it('should handle errors without stack traces', () => {
      const error = new Error('No stack');
      delete (error as any).stack;

      const result = BigIntSerializationUtil.extractErrorInfo(error);
      expect(result).toEqual({
        type: 'Error',
        message: 'No stack',
        hasStack: false,
      });
    });

    it('should handle non-Error objects', () => {
      const testCases = [
        { input: 'string error', expected: { type: 'string', value: 'string error' } },
        { input: 123, expected: { type: 'number', value: '123' } },
        { input: true, expected: { type: 'boolean', value: 'true' } },
        { input: null, expected: { type: 'object', value: 'null' } },
        { input: undefined, expected: { type: 'undefined', value: 'undefined' } },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = BigIntSerializationUtil.extractErrorInfo(input);
        expect(result).toEqual(expected);
      });
    });

    it('should handle BigInt values in non-Error objects', () => {
      const bigintValue = 123n;
      const result = BigIntSerializationUtil.extractErrorInfo(bigintValue);
      expect(result).toEqual({
        type: 'bigint',
        value: '123',
      });
    });

    it('should handle complex objects', () => {
      const complexObject = { nested: { data: 'test' } };
      const result = BigIntSerializationUtil.extractErrorInfo(complexObject);
      expect(result).toEqual({
        type: 'object',
        value: '[object Object]',
      });
    });
  });

  describe('Integration scenarios', () => {
    it('should handle complete JSON round-trip with BigInt values', () => {
      const original = {
        id: 999999999999999999n,
        user: {
          id: 123n,
          name: 'John',
        },
        counts: [1n, 2n, 3n],
        regular: 456,
      };

      // Stringify with BigInt handling
      const serialized = BigIntSerializationUtil.stringify(original);

      // Parse back (BigInt values become strings with 'n' suffix)
      const parsed = JSON.parse(serialized);

      expect(parsed.id).toBe('999999999999999999n');
      expect(parsed.user.id).toBe('123n');
      expect(parsed.user.name).toBe('John');
      expect(parsed.counts).toEqual(['1n', '2n', '3n']);
      expect(parsed.regular).toBe(456);
    });

    it('should handle mixed data types in arrays', () => {
      const mixedArray = [123n, 'string', 456, true, null, { id: 789n }, [1n, 2, '3']];

      const result = BigIntSerializationUtil.stringify(mixedArray);
      const parsed = JSON.parse(result);

      expect(parsed[0]).toBe('123n');
      expect(parsed[1]).toBe('string');
      expect(parsed[2]).toBe(456);
      expect(parsed[3]).toBe(true);
      expect(parsed[4]).toBe(null);
      expect(parsed[5].id).toBe('789n');
      expect(parsed[6]).toEqual(['1n', 2, '3']);
    });
  });

  describe('bigIntReviver', () => {
    it('should convert valid n-suffixed strings back to BigInt', () => {
      const testCases = [
        { input: '123n', expected: 123n },
        { input: '0n', expected: 0n },
        { input: '9007199254740992n', expected: 9007199254740992n },
        { input: '11060329315062111n', expected: 11060329315062111n },
        { input: '-456n', expected: -456n },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = BigIntSerializationUtil.bigIntReviver('test', input);
        expect(result).toBe(expected);
        expect(typeof result).toBe('bigint');
      });
    });

    it('should preserve non-BigInt values unchanged', () => {
      const testCases = [
        { input: 'normal string', expected: 'normal string' },
        { input: 'n', expected: 'n' }, // Single 'n' should not be converted
        { input: '123', expected: '123' }, // No 'n' suffix
        { input: '123.45n', expected: '123.45n' }, // Invalid number format
        { input: 'abcn', expected: 'abcn' }, // Non-numeric before 'n'
        { input: 123, expected: 123 },
        { input: true, expected: true },
        { input: null, expected: null },
        { input: undefined, expected: undefined },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = BigIntSerializationUtil.bigIntReviver('test', input);
        expect(result).toBe(expected);
      });
    });

    it('should handle invalid BigInt conversion gracefully', () => {
      // Extreme case that might cause BigInt to throw
      const invalidButLooksValid = '99999999999999999999999999999999999999999999999999999999999n';

      expect(() => {
        BigIntSerializationUtil.bigIntReviver('test', invalidButLooksValid);
      }).not.toThrow();
    });

    it('should handle edge cases with n suffix', () => {
      const edgeCases = [
        { input: '0n', expected: 0n },
        { input: '1n', expected: 1n },
        { input: '-1n', expected: -1n },
        { input: '000123n', expected: 123n }, // Leading zeros
      ];

      edgeCases.forEach(({ input, expected }) => {
        const result = BigIntSerializationUtil.bigIntReviver('test', input);
        expect(result).toBe(expected);
      });
    });
  });

  describe('safeParse', () => {
    it('should parse JSON with BigInt values correctly', () => {
      const original = {
        id: 11060329315062111n,
        name: 'test',
        count: 42,
        nested: {
          bigId: 999999999999999999n,
          smallId: 123,
        },
      };

      // Stringify with replacer, then parse with reviver
      const jsonString = BigIntSerializationUtil.stringify(original);
      const parsed = BigIntSerializationUtil.safeParse(jsonString) as any;

      expect(parsed.id).toBe(11060329315062111n);
      expect(typeof parsed.id).toBe('bigint');
      expect(parsed.name).toBe('test');
      expect(parsed.count).toBe(42);
      expect(parsed.nested.bigId).toBe(999999999999999999n);
      expect(typeof parsed.nested.bigId).toBe('bigint');
      expect(parsed.nested.smallId).toBe(123);
      expect(typeof parsed.nested.smallId).toBe('number');
    });

    it('should handle arrays with BigInt values', () => {
      const original = [123n, 'string', 456, { id: 789n }];

      const jsonString = BigIntSerializationUtil.stringify(original);
      const parsed = BigIntSerializationUtil.safeParse(jsonString) as any[];

      expect(parsed[0]).toBe(123n);
      expect(typeof parsed[0]).toBe('bigint');
      expect(parsed[1]).toBe('string');
      expect(parsed[2]).toBe(456);
      expect(parsed[3].id).toBe(789n);
      expect(typeof parsed[3].id).toBe('bigint');
    });

    it('should throw descriptive error for invalid JSON', () => {
      const invalidJson = '{ invalid json }';

      expect(() => {
        BigIntSerializationUtil.safeParse(invalidJson);
      }).toThrow('Failed to parse JSON with BigInt values');
    });

    it('should complete full round-trip successfully', () => {
      const problematicValue = 11060329315062111n;
      const original = {
        id: problematicValue,
        description: 'Precision test',
        metadata: {
          created: new Date('2023-01-01'),
          largeId: 999999999999999999999n,
        },
      };

      // Full round-trip: object -> JSON string -> object
      const step1 = BigIntSerializationUtil.stringify(original);
      const step2 = BigIntSerializationUtil.safeParse(step1) as any;

      expect(step2.id).toBe(problematicValue);
      expect(step2.metadata.largeId).toBe(999999999999999999999n);
      expect(step2.description).toBe('Precision test');

      // Verify no precision loss occurred
      expect(step2.id.toString()).toBe('11060329315062111');
      expect(step2.metadata.largeId.toString()).toBe('999999999999999999999');
    });
  });

  describe('Integration with toJSON pattern', () => {
    it('should work seamlessly with class toJSON methods', () => {
      // Simulate the BaseBet toJSON pattern
      class TestClass {
        constructor(
          public id: bigint,
          public name: string,
        ) {}

        toJSON(): Record<string, unknown> {
          const result: Record<string, unknown> = {};
          for (const [key, value] of Object.entries(this)) {
            if (typeof key === 'string' && (typeof value === 'bigint' || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null || value === undefined)) {
              result[key] = BigIntSerializationUtil.bigIntReplacer(key, value);
            }
          }
          return result;
        }
      }

      const instance = new TestClass(11060329315062111n, 'test');

      // Serialize via toJSON
      const jsonString = JSON.stringify(instance.toJSON());

      // Parse back via safeParse
      const restored = BigIntSerializationUtil.safeParse(jsonString) as any;

      expect(restored.id).toBe(11060329315062111n);
      expect(typeof restored.id).toBe('bigint');
      expect(restored.name).toBe('test');
    });
  });
});
