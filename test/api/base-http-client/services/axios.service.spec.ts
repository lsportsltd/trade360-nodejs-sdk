import { parse, isInteger } from 'lossless-json';
import { plainToInstance } from 'class-transformer';
import { BaseBet } from '../../../../src/entities/core-entities/market/base-bet';

// Import the same customNumberParser logic from AxiosService for testing
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

describe('AxiosService CustomNumberParser', () => {
  describe('precision preservation for positive IDs', () => {
    it('should handle the original problematic number 11060329315062111', (): void => {
      const jsonString = '{"Id":11060329315062111,"Name":"Test"}';
      const parsed = parse(jsonString, undefined, customNumberParser) as {
        Id: bigint;
        Name: string;
      };
      
      expect(typeof parsed.Id).toBe('bigint');
      expect(parsed.Id).toBe(11060329315062111n);
      expect(parsed.Id.toString()).toBe('11060329315062111');
    });

    it('should convert large positive integers (> MAX_SAFE_INTEGER) to BigInt', (): void => {
      const testCases = [
        '9007199254740992', // MAX_SAFE_INTEGER + 1
        '9999999999999999', // Large 16-digit number
        '99999999999999999', // Large 17-digit number
        '11060329315062111', // Original problem number
      ];

      testCases.forEach((testValue) => {
        const result = customNumberParser(testValue);
        expect(typeof result).toBe('bigint');
        expect(result.toString()).toBe(testValue);
      });
    });

    it('should keep safe positive integers as regular numbers', (): void => {
      const testCases = [
        { input: '1', expected: 1 },
        { input: '123', expected: 123 },
        { input: '9007199254740991', expected: 9007199254740991 }, // MAX_SAFE_INTEGER
        { input: '1000000', expected: 1000000 },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = customNumberParser(input);
        expect(typeof result).toBe('number');
        expect(result).toBe(expected);
      });
    });

    it('should handle all negative numbers as regular numbers', (): void => {
      const testCases = [
        { input: '-1', expected: -1 },
        { input: '-123', expected: -123 },
        { input: '-9007199254740991', expected: -9007199254740991 }, // MIN_SAFE_INTEGER
        { input: '-9999999999999999', expected: -9999999999999999 }, // Would be BigInt if positive
      ];

      testCases.forEach(({ input, expected }) => {
        const result = customNumberParser(input);
        expect(typeof result).toBe('number');
        expect(result).toBe(expected);
      });
    });

    it('should handle floating point numbers correctly', (): void => {
      const testCases = [
        { input: '3.14159', expected: 3.14159 },
        { input: '0.5', expected: 0.5 },
        { input: '-2.71828', expected: -2.71828 },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = customNumberParser(input);
        expect(typeof result).toBe('number');
        expect(result).toBe(expected);
      });
    });

    it('should demonstrate the precision loss problem with parseInt approach', (): void => {
      const largeNumber = '11060329315062111';
      
      // This would be the buggy approach (what we fixed)
      const buggyResult = parseInt(largeNumber, 10);
      
      // Show that parseInt loses precision
      expect(buggyResult.toString()).not.toBe(largeNumber);
      expect(buggyResult).toBe(11060329315062112); // Precision loss!
      
      // Our fixed approach should work correctly
      const fixedResult = customNumberParser(largeNumber);
      expect(typeof fixedResult).toBe('bigint');
      expect(fixedResult.toString()).toBe(largeNumber);
    });
  });

  describe('edge cases', () => {
    it('should handle exact boundary values correctly', (): void => {
      // Test exact MAX_SAFE_INTEGER boundary
      expect(customNumberParser('9007199254740991')).toBe(9007199254740991);
      expect(typeof customNumberParser('9007199254740991')).toBe('number');
      
      // Test MAX_SAFE_INTEGER + 1
      expect(customNumberParser('9007199254740992')).toBe(9007199254740992n);
      expect(typeof customNumberParser('9007199254740992')).toBe('bigint');
    });

    it('should handle zero and small numbers', (): void => {
      expect(customNumberParser('0')).toBe(0);
      expect(customNumberParser('-0')).toBe(-0);
      expect(customNumberParser('1')).toBe(1);
      expect(customNumberParser('-1')).toBe(-1);
    });
  });

  describe('End-to-End Integration', () => {
    it('should handle complete JSON-to-Entity pipeline with large IDs', (): void => {
      // Simulate a JSON response from the API with the problematic large ID
      const apiJsonResponse = '{"Id":11060329315062111,"Name":"Large ID Bet","Status":1}';
      
      // Step 1: Parse JSON with lossless-json and custom parser (like AxiosService does)
      const parsedData = parse(apiJsonResponse, undefined, customNumberParser);
      
      // Verify the parsed data has the correct types
      expect(typeof (parsedData as any).Id).toBe('bigint');
      expect((parsedData as any).Id).toBe(11060329315062111n);
      
      // Step 2: Transform to BaseBet entity (like class-transformer does)
      const baseBet = plainToInstance(BaseBet, parsedData, { excludeExtraneousValues: true });
      
      // Step 3: Verify the final entity has the correct values
      expect(baseBet).toBeInstanceOf(BaseBet);
      expect(typeof baseBet.id).toBe('bigint');
      expect(baseBet.id).toBe(11060329315062111n);
      expect(baseBet.id?.toString()).toBe('11060329315062111');
      expect(baseBet.name).toBe('Large ID Bet');
    });

    it('should handle mixed data types in complete pipeline', (): void => {
      // Test with multiple data types to ensure we didn't break anything
      const apiJsonResponse = JSON.stringify({
        Id: 11060329315062111, // Large ID → BigInt
        Name: 'Mixed Data Bet',
        Status: 1, // Small integer → number
        Probability: 0.75, // Float → number
        ParticipantId: 42, // Regular integer → number
        Price: 1.85, // Decimal → number
      });
      
      const parsedData = parse(apiJsonResponse, undefined, customNumberParser);
      const baseBet = plainToInstance(BaseBet, parsedData, { excludeExtraneousValues: true });
      
      // Verify correct types for each field
      expect(typeof baseBet.id).toBe('bigint');
      expect(baseBet.id).toBe(11060329315062111n);
      expect(typeof baseBet.status).toBe('number');
      expect(baseBet.status).toBe(1);
      expect(typeof baseBet.probability).toBe('number');
      expect(baseBet.probability).toBe(0.75);
      expect(typeof baseBet.participantId).toBe('number');
      expect(baseBet.participantId).toBe(42);
      expect(typeof baseBet.price).toBe('number');
      expect(baseBet.price).toBe(1.85);
    });

    it('should demonstrate the before/after fix comparison', (): void => {
      const problemJson = '{"Id":11060329315062111}';
      
      // BEFORE: Standard JSON.parse (what would happen without our fix)
      const standardParsed = JSON.parse(problemJson);
      expect(standardParsed.Id).toBe(11060329315062112); // Precision lost!
      expect(standardParsed.Id.toString()).toBe('11060329315062112');
      
      // AFTER: Our lossless-json solution
      const losslessParsed = parse(problemJson, undefined, customNumberParser);
      expect((losslessParsed as any).Id).toBe(11060329315062111n); // Precision preserved!
      expect((losslessParsed as any).Id.toString()).toBe('11060329315062111');
      
      // Final transformation still works correctly
      const baseBet = plainToInstance(BaseBet, losslessParsed, { excludeExtraneousValues: true });
      expect(baseBet.id?.toString()).toBe('11060329315062111');
    });
  });
}); 