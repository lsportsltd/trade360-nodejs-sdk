import { IdSafeJsonParser } from '../../src/utilities/id-safe-json-parser';

describe('IdSafeJsonParser', () => {
  const SAFE_INTEGER = Number.MAX_SAFE_INTEGER; // 9,007,199,254,740,991
  const LARGE_INTEGER_STRING = '9007199254740992'; // MAX_SAFE_INTEGER + 1
  const LARGE_INTEGER_STRING_2 = '18634250916001372';
  const MEDIUM_INTEGER_STRING = '123456789012345'; // 15 digits, within safe range
  const SMALL_INTEGER = 12345;

  describe('parse()', () => {
    it('should convert a large ID number to a string to preserve precision', () => {
      const json = `{"id": ${LARGE_INTEGER_STRING}, "name": "test"}`;
      const result = IdSafeJsonParser.parse(json) as { id: string | number; name: string };
      expect(result.id).toBe(LARGE_INTEGER_STRING);
      expect(typeof result.id).toBe('string');
    });

    it('should handle case-insensitive "ID" fields', () => {
      const json = `{"ID": ${LARGE_INTEGER_STRING_2}, "name": "case test"}`;
      const result = IdSafeJsonParser.parse(json) as { ID: string | number; name: string };
      expect(result.ID).toBe(LARGE_INTEGER_STRING_2);
      expect(typeof result.ID).toBe('string');
    });

    it('should keep a safe integer as a number', () => {
      const json = `{"id": ${MEDIUM_INTEGER_STRING}}`;
      const result = IdSafeJsonParser.parse(json) as { id: string | number };
      expect(result.id).toBe(Number(MEDIUM_INTEGER_STRING));
      expect(typeof result.id).toBe('number');
    });

    it('should keep a small integer as a number', () => {
      const json = `{"id": ${SMALL_INTEGER}}`;
      const result = IdSafeJsonParser.parse(json) as { id: string | number };
      expect(result.id).toBe(SMALL_INTEGER);
      expect(typeof result.id).toBe('number');
    });

    it('should correctly handle the MAX_SAFE_INTEGER boundary, keeping it as a number', () => {
      const json = `{"id": ${SAFE_INTEGER}}`;
      const result = IdSafeJsonParser.parse(json) as { id: number };
      expect(result.id).toBe(SAFE_INTEGER);
      expect(typeof result.id).toBe('number');
    });

    it('should not convert large numbers in fields not named "id"', () => {
      const json = `{"userId": ${LARGE_INTEGER_STRING}, "value": 123}`;
      const result = IdSafeJsonParser.parse(json) as { userId: number; value: number };
      // Note: precision loss is expected here for userId as it's not converted to a string.
      expect(result.userId).toBe(Number(LARGE_INTEGER_STRING));
      expect(typeof result.userId).toBe('number');
    });

    it('should not convert fields that contain "id" but are not exactly "id"', () => {
      const json = `{"betId": ${LARGE_INTEGER_STRING}}`;
      const result = IdSafeJsonParser.parse(json) as { betId: number };
      expect(result.betId).toBe(Number(LARGE_INTEGER_STRING));
      expect(typeof result.betId).toBe('number');
    });

    it('should handle nested objects with "id" fields', () => {
      const json = `{"data": {"id": ${LARGE_INTEGER_STRING}}, "meta": {"ID": ${LARGE_INTEGER_STRING_2}}}`;
      const result = IdSafeJsonParser.parse(json) as { data: { id: string }; meta: { ID: string } };
      expect(result.data.id).toBe(LARGE_INTEGER_STRING);
      expect(typeof result.data.id).toBe('string');
      expect(result.meta.ID).toBe(LARGE_INTEGER_STRING_2);
      expect(typeof result.meta.ID).toBe('string');
    });

    it('should handle arrays of objects with "id" fields', () => {
      const json = `{"data": [{"id": ${LARGE_INTEGER_STRING}}, {"ID": ${LARGE_INTEGER_STRING_2}}, {"uid": ${SMALL_INTEGER}}]}`;
      const result = IdSafeJsonParser.parse(json) as {
        data: { id: string; ID: string; uid: number }[];
      };
      expect(result.data[0].id).toBe(LARGE_INTEGER_STRING);
      expect(typeof result.data[0].id).toBe('string');
      expect(result.data[1].ID).toBe(LARGE_INTEGER_STRING_2);
      expect(typeof result.data[1].ID).toBe('string');
      expect(result.data[2].uid).toBe(SMALL_INTEGER);
      expect(typeof result.data[2].uid).toBe('number');
    });

    it('should throw an error for malformed JSON', () => {
      const malformedJson = '{"id": 123,';
      expect(() => IdSafeJsonParser.parse(malformedJson)).toThrow(/^JSON parsing failed:/);
    });

    it('should handle an empty object', () => {
      const json = '{}';
      const result = IdSafeJsonParser.parse(json);
      expect(result).toEqual({});
    });

    it('should handle an empty array', () => {
      const json = '[]';
      const result = IdSafeJsonParser.parse(json);
      expect(result).toEqual([]);
    });

    it('should handle a null value for an id field', () => {
      const json = '{"id": null}';
      const result = IdSafeJsonParser.parse(json) as { id: null };
      expect(result.id).toBeNull();
    });

    it('should handle various whitespace patterns around the id field', () => {
      const json = `{"id" \t : \n ${LARGE_INTEGER_STRING}}`;
      const result = IdSafeJsonParser.parse(json) as { id: string };
      expect(result.id).toBe(LARGE_INTEGER_STRING);
      expect(typeof result.id).toBe('string');
    });

    it('should not convert already-stringified numbers', () => {
      const json = `{"id": "${LARGE_INTEGER_STRING}"}`;
      const result = IdSafeJsonParser.parse(json) as { id: string };
      expect(result.id).toBe(LARGE_INTEGER_STRING);
      expect(typeof result.id).toBe('string');
    });
  });
});
