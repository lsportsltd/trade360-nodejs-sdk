import { IdSafeJsonParser } from '../../src/utilities/id-safe-json-parser';

describe('IdSafeJsonParser', () => {
  const SAFE_INTEGER = Number.MAX_SAFE_INTEGER; // 9,007,199,254,740,991
  const LARGE_INTEGER = '18634250916001372'; // Larger than MAX_SAFE_INTEGER
  const MEDIUM_INTEGER = '123456789012345'; // 15 digits, within safe range
  const SMALL_INTEGER = '12345';

  describe('parse() - Primary method', () => {
    it('should preserve large ID numbers as strings in flat objects', () => {
      const json = `{"id": ${LARGE_INTEGER}, "name": "test"}`;
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(LARGE_INTEGER);
      expect(typeof result.id).toBe('string');
      expect(result.name).toBe('test');
    });

    it('should preserve large ID numbers in nested objects', () => {
      const json = `{"user": {"id": ${LARGE_INTEGER}, "profile": {"profileId": ${LARGE_INTEGER}}}}`;
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;
      const user = result.user as Record<string, unknown>;
      const profile = user.profile as Record<string, unknown>;

      expect(user.id).toBe(LARGE_INTEGER);
      expect(profile.profileId).toBe(LARGE_INTEGER);
      expect(typeof user.id).toBe('string');
      expect(typeof profile.profileId).toBe('string');
    });

    it('should keep small ID numbers as numbers for type consistency', () => {
      const json = `{"id": ${SMALL_INTEGER}, "userId": 999}`;
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(parseInt(SMALL_INTEGER));
      expect(result.userId).toBe(999);
      expect(typeof result.id).toBe('number');
      expect(typeof result.userId).toBe('number');
    });

    it('should handle medium-sized numbers correctly', () => {
      const json = `{"id": ${MEDIUM_INTEGER}}`;
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;

      // Should still be a number since it's within safe range
      expect(result.id).toBe(parseInt(MEDIUM_INTEGER));
      expect(typeof result.id).toBe('number');
    });

    it('should handle numbers exactly at MAX_SAFE_INTEGER boundary', () => {
      const json = `{"id": ${SAFE_INTEGER}}`;
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(SAFE_INTEGER);
      expect(typeof result.id).toBe('number');
    });

    it('should handle numbers just above MAX_SAFE_INTEGER', () => {
      const boundaryNumber = (SAFE_INTEGER + 1).toString();
      const json = `{"id": ${boundaryNumber}}`;
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(boundaryNumber);
      expect(typeof result.id).toBe('string');
    });

    it('should handle various ID field naming patterns', () => {
      const json = `{
        "id": ${LARGE_INTEGER},
        "userId": ${LARGE_INTEGER},
        "memberId": ${LARGE_INTEGER},
        "fixtureId": ${LARGE_INTEGER},
        "betID": ${LARGE_INTEGER},
        "ID": ${LARGE_INTEGER}
      }`;
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(LARGE_INTEGER);
      expect(result.userId).toBe(LARGE_INTEGER);
      expect(result.memberId).toBe(LARGE_INTEGER);
      expect(result.fixtureId).toBe(LARGE_INTEGER);
      expect(result.betID).toBe(LARGE_INTEGER);
      expect(result.ID).toBe(LARGE_INTEGER);

      // All should be strings
      expect(typeof result.id).toBe('string');
      expect(typeof result.userId).toBe('string');
      expect(typeof result.memberId).toBe('string');
      expect(typeof result.fixtureId).toBe('string');
      expect(typeof result.betID).toBe('string');
      expect(typeof result.ID).toBe('string');
    });

    it('should NOT convert large numbers in non-ID fields', () => {
      const json = `{
        "id": ${LARGE_INTEGER},
        "amount": ${LARGE_INTEGER},
        "timestamp": ${LARGE_INTEGER},
        "value": ${LARGE_INTEGER}
      }`;
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;

      expect(typeof result.id).toBe('string'); // Should be converted
      expect(typeof result.amount).toBe('number'); // Should NOT be converted
      expect(typeof result.timestamp).toBe('number'); // Should NOT be converted
      expect(typeof result.value).toBe('number'); // Should NOT be converted
    });

    it('should handle arrays of objects with ID fields', () => {
      const json = `[
        {"id": ${LARGE_INTEGER}, "name": "first"},
        {"id": ${LARGE_INTEGER}, "name": "second"}
      ]`;
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>[];

      expect(result[0].id).toBe(LARGE_INTEGER);
      expect(result[1].id).toBe(LARGE_INTEGER);
      expect(typeof result[0].id).toBe('string');
      expect(typeof result[1].id).toBe('string');
    });

    it('should preserve already quoted strings that look like numbers', () => {
      const json = `{"id": "${LARGE_INTEGER}", "userId": "12345"}`;
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(LARGE_INTEGER);
      expect(result.userId).toBe('12345');
      expect(typeof result.id).toBe('string');
      expect(typeof result.userId).toBe('string');
    });

    it('should handle complex nested structures', () => {
      const json = `{
        "users": [
          {
            "id": ${LARGE_INTEGER},
            "profile": {
              "profileId": ${LARGE_INTEGER},
              "settings": {
                "preferenceId": ${LARGE_INTEGER}
              }
            }
          }
        ],
        "metadata": {
          "requestId": ${LARGE_INTEGER}
        }
      }`;
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;
      const users = result.users as Record<string, unknown>[];
      const firstUser = users[0];
      const profile = firstUser.profile as Record<string, unknown>;
      const settings = profile.settings as Record<string, unknown>;
      const metadata = result.metadata as Record<string, unknown>;

      expect(firstUser.id).toBe(LARGE_INTEGER);
      expect(profile.profileId).toBe(LARGE_INTEGER);
      expect(settings.preferenceId).toBe(LARGE_INTEGER);
      expect(metadata.requestId).toBe(LARGE_INTEGER);

      // All should be strings
      expect(typeof firstUser.id).toBe('string');
      expect(typeof profile.profileId).toBe('string');
      expect(typeof settings.preferenceId).toBe('string');
      expect(typeof metadata.requestId).toBe('string');
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle empty objects', () => {
      const json = '{}';
      const result = IdSafeJsonParser.parse(json);

      expect(result).toEqual({});
    });

    it('should handle empty arrays', () => {
      const json = '[]';
      const result = IdSafeJsonParser.parse(json);

      expect(result).toEqual([]);
    });

    it('should handle null and undefined values', () => {
      const json = '{"id": null, "userId": 123}';
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBeNull();
      expect(result.userId).toBe(123);
    });

    it('should handle malformed JSON by throwing an error', () => {
      const malformedJson = '{"id": 123';

      expect(() => {
        IdSafeJsonParser.parse(malformedJson);
      }).toThrow();
    });

    it('should handle zero and negative numbers', () => {
      const json = `{"id": 0, "userId": -123}`;
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(0);
      expect(result.userId).toBe(-123);
      expect(typeof result.id).toBe('number');
      expect(typeof result.userId).toBe('number');
    });

    it('should handle decimal numbers in ID fields', () => {
      const json = '{"id": 123.456}';
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(123.456);
      expect(typeof result.id).toBe('number');
    });

    it('should handle various whitespace patterns', () => {
      const json = `{
        "id"    :    ${LARGE_INTEGER}   ,
        "userId":${LARGE_INTEGER}
      }`;
      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(LARGE_INTEGER);
      expect(result.userId).toBe(LARGE_INTEGER);
      expect(typeof result.id).toBe('string');
      expect(typeof result.userId).toBe('string');
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle typical API response with mixed field types', () => {
      const json = `{
        "status": "success",
        "data": {
          "id": ${LARGE_INTEGER},
          "userId": ${LARGE_INTEGER},
          "amount": 1250.50,
          "timestamp": 1640995200000,
          "items": [
            {
              "itemId": ${LARGE_INTEGER},
              "quantity": 2,
              "price": 25.99
            }
          ]
        },
        "metadata": {
          "requestId": "${LARGE_INTEGER}",
          "processingTime": 150
        }
      }`;

      const result = IdSafeJsonParser.parse(json) as Record<string, unknown>;
      const data = result.data as Record<string, unknown>;
      const items = data.items as Record<string, unknown>[];
      const firstItem = items[0];
      const metadata = result.metadata as Record<string, unknown>;

      // Large ID fields should be strings
      expect(typeof data.id).toBe('string');
      expect(typeof data.userId).toBe('string');
      expect(typeof firstItem.itemId).toBe('string');

      // Non-ID numbers should remain numbers
      expect(typeof data.amount).toBe('number');
      expect(typeof data.timestamp).toBe('number');
      expect(typeof firstItem.quantity).toBe('number');
      expect(typeof firstItem.price).toBe('number');
      expect(typeof metadata.processingTime).toBe('number');

      // Already quoted strings should remain strings
      expect(typeof metadata.requestId).toBe('string');
      expect(metadata.requestId).toBe(LARGE_INTEGER);
    });
  });

  describe('New Zod v4 Optimized Features', () => {
    it('should provide safeParse method for non-throwing validation', () => {
      const validJson = `{"id": ${LARGE_INTEGER}, "name": "test"}`;
      const result = IdSafeJsonParser.safeParse(validJson);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeDefined();
        const data = result.data as Record<string, unknown>;
        expect(data.id).toBe(LARGE_INTEGER);
        expect(typeof data.id).toBe('string');
        expect(data.name).toBe('test');
      }
    });

    it('should handle errors gracefully with safeParse', () => {
      const invalidJson = '{"id": 123, "name":}';
      const result = IdSafeJsonParser.safeParse(invalidJson);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeDefined();
        expect(typeof result.error).toBe('string');
        expect(result.error).toContain('JSON parsing failed');
      }
    });

    it('should handle empty string input with safeParse', () => {
      const result = IdSafeJsonParser.safeParse('');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Unexpected end of JSON input');
      }
    });

    it('should validate JSON strings before processing', () => {
      const validJson = '{"id": 123, "name": "test"}';
      const invalidJson = 'not valid json';
      const emptyJson = '';

      const validResult = IdSafeJsonParser.validateJsonString(validJson);
      const invalidResult = IdSafeJsonParser.validateJsonString(invalidJson);
      const emptyResult = IdSafeJsonParser.validateJsonString(emptyJson);

      expect(validResult.valid).toBe(true);
      
      expect(invalidResult.valid).toBe(false);
      if (!invalidResult.valid) {
        expect(invalidResult.error).toContain('Must be valid JSON string');
      }

      expect(emptyResult.valid).toBe(false);
      if (!emptyResult.valid) {
        expect(emptyResult.error).toContain('JSON string cannot be empty');
      }
    });

    it('should provide enhanced large number detection', () => {
      expect(IdSafeJsonParser.isLargeNumber(LARGE_INTEGER)).toBe(true);
      expect(IdSafeJsonParser.isLargeNumber(SMALL_INTEGER)).toBe(false);
      expect(IdSafeJsonParser.isLargeNumber(MEDIUM_INTEGER)).toBe(false);

      // Test boundary cases
      const justOverSafeInteger = (SAFE_INTEGER + 1).toString();
      expect(IdSafeJsonParser.isLargeNumber(justOverSafeInteger)).toBe(true);
      expect(IdSafeJsonParser.isLargeNumber(SAFE_INTEGER.toString())).toBe(false);

      // Test very large numbers
      expect(IdSafeJsonParser.isLargeNumber('999999999999999999')).toBe(true);
    });

    it('should handle non-numeric strings in isLargeNumber', () => {
      expect(IdSafeJsonParser.isLargeNumber('abc')).toBe(false);
      expect(IdSafeJsonParser.isLargeNumber('123.45')).toBe(false);
      expect(IdSafeJsonParser.isLargeNumber('-123')).toBe(false);
      expect(IdSafeJsonParser.isLargeNumber('')).toBe(false);
    });

    it('should provide better error messages with enhanced validation', () => {
      const malformedJson = '{"id": 123, "name": "test", "extra":}';
      
      // Test with parse (throws)
      expect(() => {
        IdSafeJsonParser.parse(malformedJson);
      }).toThrow(/JSON parsing failed/);

      // Test with safeParse (returns error)
      const result = IdSafeJsonParser.safeParse(malformedJson);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('JSON parsing failed');
        expect(result.error).toContain('Unexpected token'); // More specific JSON parse error
      }
    });

    it('should handle complex validation scenarios', () => {
      const complexJson = `{
        "users": [
          {"id": ${LARGE_INTEGER}, "profileId": ${LARGE_INTEGER}},
          {"id": ${SMALL_INTEGER}, "profileId": ${MEDIUM_INTEGER}}
        ],
        "metadata": {
          "sessionId": ${LARGE_INTEGER},
          "count": 42
        }
      }`;

      const result = IdSafeJsonParser.safeParse(complexJson);
      
      expect(result.success).toBe(true);
      if (result.success) {
        const data = result.data as any;
        expect(typeof data.users[0].id).toBe('string');
        expect(typeof data.users[0].profileId).toBe('string');
        expect(typeof data.users[1].id).toBe('number');
        expect(typeof data.users[1].profileId).toBe('number');
        expect(typeof data.metadata.sessionId).toBe('string');
        expect(typeof data.metadata.count).toBe('number');
      }
    });
  });

  describe('Performance and Compatibility', () => {
    it('should maintain backward compatibility with existing API', () => {
      const json = `{"id": ${LARGE_INTEGER}, "name": "test"}`;
      
      // All original methods should still work
      const parseResult = IdSafeJsonParser.parse(json);
      const preservingResult = IdSafeJsonParser.parsePreservingLargeIds(json);
      
      expect(parseResult).toEqual(preservingResult);
      
      const data = parseResult as Record<string, unknown>;
      expect(typeof data.id).toBe('string');
      expect(data.id).toBe(LARGE_INTEGER);
    });

    it('should handle large JSON objects efficiently', () => {
      const largeObject = {
        items: Array.from({ length: 100 }, (_, i) => ({
          id: parseInt(LARGE_INTEGER) + i,
          userId: parseInt(LARGE_INTEGER) + i * 2,
          name: `Item ${i}`,
        })),
      };

      const json = JSON.stringify(largeObject);
      
      const start = performance.now();
      const result = IdSafeJsonParser.parse(json);
      const end = performance.now();

      expect(result).toBeDefined();
      expect(end - start).toBeLessThan(100); // Should be reasonably fast

      // Verify large numbers are preserved as strings
      const parsedResult = result as any;
      expect(typeof parsedResult.items[0].id).toBe('string');
      expect(typeof parsedResult.items[0].userId).toBe('string');
      expect(typeof parsedResult.items[0].name).toBe('string');
    });

    it('should provide consistent results across different methods', () => {
      const testCases = [
        `{"id": ${LARGE_INTEGER}}`,
        `{"userId": ${SMALL_INTEGER}}`,
        `{"data": {"profileId": ${LARGE_INTEGER}, "count": 5}}`,
      ];

      testCases.forEach((json) => {
        const parseResult = IdSafeJsonParser.parse(json);
        const safeParseResult = IdSafeJsonParser.safeParse(json);
        const preservingResult = IdSafeJsonParser.parsePreservingLargeIds(json);

        expect(safeParseResult.success).toBe(true);
        if (safeParseResult.success) {
          expect(safeParseResult.data).toEqual(parseResult);
          expect(preservingResult).toEqual(parseResult);
        }
      });
    });
  });
});
