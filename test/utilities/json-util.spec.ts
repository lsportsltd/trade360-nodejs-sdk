import { JsonUtil } from '../../src/utilities/json-util';

describe('JsonUtil', () => {
  describe('stringify', () => {
    it('should serialize regular objects without BigInt', () => {
      const obj = { name: 'test', number: 42, nested: { value: 'hello' } };
      const result = JsonUtil.stringify(obj);
      expect(result).toBe('{"name":"test","number":42,"nested":{"value":"hello"}}');
    });

    it('should serialize BigInt values as strings', () => {
      const obj = { id: 123n, name: 'test' };
      const result = JsonUtil.stringify(obj);
      expect(result).toBe('{"id":"123","name":"test"}');
    });

    it('should serialize objects with nested BigInt values', () => {
      const obj = {
        user: { id: 123n, name: 'John' },
        bet: { id: 456n, amount: 100 },
      };
      const result = JsonUtil.stringify(obj);
      expect(result).toBe('{"user":{"id":"123","name":"John"},"bet":{"id":"456","amount":100}}');
    });

    it('should serialize arrays containing BigInt values', () => {
      const obj = { ids: [123n, 456n, 789n] };
      const result = JsonUtil.stringify(obj);
      expect(result).toBe('{"ids":["123","456","789"]}');
    });

    it('should handle very large BigInt values', () => {
      const largeId = BigInt('9007199254740992'); // MAX_SAFE_INTEGER + 1
      const obj = { id: largeId };
      const result = JsonUtil.stringify(obj);
      expect(result).toBe('{"id":"9007199254740992"}');
    });

    it('should handle null and undefined values', () => {
      const obj = { id: null, value: undefined, name: 'test' };
      const result = JsonUtil.stringify(obj);
      expect(result).toBe('{"id":null,"name":"test"}');
    });

    it('should support formatting with spaces', () => {
      const obj = { id: 123n, name: 'test' };
      const result = JsonUtil.stringify(obj, 2);
      const expected = `{\n  "id": "123",\n  "name": "test"\n}`;
      expect(result).toBe(expected);
    });
  });

  describe('parse', () => {
    it('should parse JSON strings normally', () => {
      const jsonString = '{"name":"test","number":42}';
      const result = JsonUtil.parse(jsonString);
      expect(result).toEqual({ name: 'test', number: 42 });
    });

    it('should parse JSON strings with stringified BigInt values', () => {
      const jsonString = '{"id":"123","name":"test"}';
      const result = JsonUtil.parse(jsonString) as { id: string; name: string };
      expect(result.id).toBe('123');
      expect(result.name).toBe('test');
    });
  });

  describe('getBigIntReplacer', () => {
    it('should return a function that converts BigInt to string', () => {
      const replacer = JsonUtil.getBigIntReplacer();
      expect(typeof replacer).toBe('function');

      // Test the replacer function directly
      expect(replacer('key', 123n)).toBe('123');
      expect(replacer('key', 'string')).toBe('string');
      expect(replacer('key', 42)).toBe(42);
    });
  });
}); 