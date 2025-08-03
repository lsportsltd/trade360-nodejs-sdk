import { PrecisionJsonParser } from '../../src/utilities/precision-json-parser';

describe('PrecisionJsonParser', () => {
  const SAFE_INTEGER = Number.MAX_SAFE_INTEGER; // 9,007,199,254,740,991
  const LARGE_INTEGER = '18634250916001372'; // Larger than MAX_SAFE_INTEGER
  const MEDIUM_INTEGER = '123456789012345'; // 15 digits, within safe range
  const SMALL_INTEGER = '12345';

  describe('parse() - Primary method', () => {
    it('should preserve large ID numbers as strings in flat objects', () => {
      const json = `{"id": ${LARGE_INTEGER}, "name": "test"}`;
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(LARGE_INTEGER);
      expect(typeof result.id).toBe('string');
      expect(result.name).toBe('test');
    });

    it('should preserve large ID numbers in nested objects', () => {
      const json = `{"user": {"id": ${LARGE_INTEGER}, "profile": {"profileId": ${LARGE_INTEGER}}}}`;
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;
      const user = result.user as Record<string, unknown>;
      const profile = user.profile as Record<string, unknown>;

      expect(user.id).toBe(LARGE_INTEGER);
      expect(profile.profileId).toBe(LARGE_INTEGER);
      expect(typeof user.id).toBe('string');
      expect(typeof profile.profileId).toBe('string');
    });

    it('should keep small ID numbers as numbers for type consistency', () => {
      const json = `{"id": ${SMALL_INTEGER}, "userId": 999}`;
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(parseInt(SMALL_INTEGER));
      expect(result.userId).toBe(999);
      expect(typeof result.id).toBe('number');
      expect(typeof result.userId).toBe('number');
    });

    it('should handle medium-sized numbers correctly', () => {
      const json = `{"id": ${MEDIUM_INTEGER}}`;
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;

      // Should still be a number since it's within safe range
      expect(result.id).toBe(parseInt(MEDIUM_INTEGER));
      expect(typeof result.id).toBe('number');
    });

    it('should handle numbers exactly at MAX_SAFE_INTEGER boundary', () => {
      const json = `{"id": ${SAFE_INTEGER}}`;
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(SAFE_INTEGER);
      expect(typeof result.id).toBe('number');
    });

    it('should handle numbers just above MAX_SAFE_INTEGER', () => {
      const boundaryNumber = (SAFE_INTEGER + 1).toString();
      const json = `{"id": ${boundaryNumber}}`;
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;

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
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;

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
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;

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
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>[];

      expect(result[0].id).toBe(LARGE_INTEGER);
      expect(result[1].id).toBe(LARGE_INTEGER);
      expect(typeof result[0].id).toBe('string');
      expect(typeof result[1].id).toBe('string');
    });

    it('should preserve already quoted strings that look like numbers', () => {
      const json = `{"id": "${LARGE_INTEGER}", "userId": "12345"}`;
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;

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
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;
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

  describe('parseAllIdFieldsAsStrings()', () => {
    it('should convert ALL ID field numbers to strings regardless of size', () => {
      const json = `{
        "id": ${SMALL_INTEGER},
        "userId": ${MEDIUM_INTEGER},
        "memberId": ${LARGE_INTEGER}
      }`;
      const result = PrecisionJsonParser.parseAllIdFieldsAsStrings(json) as Record<string, unknown>;

      expect(result.id).toBe(SMALL_INTEGER);
      expect(result.userId).toBe(MEDIUM_INTEGER);
      expect(result.memberId).toBe(LARGE_INTEGER);

      // All should be strings
      expect(typeof result.id).toBe('string');
      expect(typeof result.userId).toBe('string');
      expect(typeof result.memberId).toBe('string');
    });
  });

  describe('parseWithReviver() - Legacy method', () => {
    it('should convert large numbers to strings using reviver function', () => {
      // Note: This test may fail for very large numbers due to precision loss
      const smallLargeNumber = (SAFE_INTEGER + 100).toString();
      const json = `{"id": ${smallLargeNumber}}`;
      const result = PrecisionJsonParser.parseWithReviver(json) as Record<string, unknown>;

      // This might not work perfectly due to precision loss during initial parsing
      expect(typeof result.id).toBe('string');
    });

    it('should keep safe numbers as numbers', () => {
      const json = `{"id": ${MEDIUM_INTEGER}}`;
      const result = PrecisionJsonParser.parseWithReviver(json) as Record<string, unknown>;

      expect(result.id).toBe(parseInt(MEDIUM_INTEGER));
      expect(typeof result.id).toBe('number');
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle empty objects', () => {
      const json = '{}';
      const result = PrecisionJsonParser.parse(json);

      expect(result).toEqual({});
    });

    it('should handle empty arrays', () => {
      const json = '[]';
      const result = PrecisionJsonParser.parse(json);

      expect(result).toEqual([]);
    });

    it('should handle null and undefined values', () => {
      const json = '{"id": null, "userId": 123}';
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBeNull();
      expect(result.userId).toBe(123);
    });

    it('should handle malformed JSON by throwing an error', () => {
      const malformedJson = '{"id": 123';

      expect(() => {
        PrecisionJsonParser.parse(malformedJson);
      }).toThrow();
    });

    it('should handle zero and negative numbers', () => {
      const json = `{"id": 0, "userId": -123}`;
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(0);
      expect(result.userId).toBe(-123);
      expect(typeof result.id).toBe('number');
      expect(typeof result.userId).toBe('number');
    });

    it('should handle decimal numbers in ID fields', () => {
      const json = '{"id": 123.456}';
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;

      expect(result.id).toBe(123.456);
      expect(typeof result.id).toBe('number');
    });

    it('should handle various whitespace patterns', () => {
      const json = `{
        "id"    :    ${LARGE_INTEGER}   ,
        "userId":${LARGE_INTEGER}
      }`;
      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;

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

      const result = PrecisionJsonParser.parse(json) as Record<string, unknown>;
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
});
