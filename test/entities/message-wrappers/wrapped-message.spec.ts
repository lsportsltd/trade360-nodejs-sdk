import { plainToInstance } from 'class-transformer';
import { WrappedMessage } from '../../../src/entities/message-wrappers/wrapped-message';
import { MessageHeader } from '../../../src/entities/message-wrappers/message-header';

describe('WrappedMessage', () => {
  describe('Basic functionality', () => {
    it('should create a WrappedMessage instance from plain object', () => {
      const plain = {
        Header: {
          Type: 101,
          MsgGuid: 'test-guid',
          ServerTimestamp: 1234567890,
        },
        Body: {
          id: 123,
          name: 'test',
        },
      };

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });

      expect(wrapped).toBeInstanceOf(WrappedMessage);
      expect(wrapped.header).toBeInstanceOf(MessageHeader);
      expect(wrapped.header.type).toBe(101);
      expect(wrapped.header.msgGuid).toBe('test-guid');
      expect(wrapped.body).toBe('{"id":123,"name":"test"}');
    });

    it('should handle missing header', () => {
      const plain = {
        Body: { id: 123 },
      };

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });
      expect(wrapped.header).toBeUndefined(); // Header should be undefined when missing
      expect(wrapped.body).toBe('{"id":123}');
    });

    it('should handle missing body', () => {
      const plain = {
        Header: {
          Type: 101,
          MsgGuid: 'test-guid',
          ServerTimestamp: 1234567890,
        },
      };

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });

      expect(wrapped.header).toBeDefined();
      expect(wrapped.body).toBeUndefined();
    });
  });

  describe('BigInt serialization in body transform', () => {
    it('should serialize BigInt values in body to strings', () => {
      const plain = {
        Header: {
          Type: 101,
          MsgGuid: 'test-guid',
          ServerTimestamp: 1234567890,
        },
        Body: {
          id: 123n,
          userId: 999999999999999999n,
          name: 'test',
          count: 456,
        },
      };

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });

      expect(wrapped.body).toBe(
        '{"id":"123n","userId":"999999999999999999n","name":"test","count":456}',
      );
    });

    it('should handle nested objects with BigInt values in body', () => {
      const plain = {
        Header: {
          Type: 102,
          MsgGuid: 'nested-guid',
          ServerTimestamp: 1234567890,
        },
        Body: {
          user: {
            id: 123n,
            profile: {
              score: 1000n,
            },
          },
          items: [
            { id: 1n, name: 'item1' },
            { id: 2n, name: 'item2' },
          ],
          metadata: {
            timestamp: 999999999999999999n,
            version: 1,
          },
        },
      };

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });

      const parsedBody = JSON.parse(wrapped.body!);
      expect(parsedBody.user.id).toBe('123n');
      expect(parsedBody.user.profile.score).toBe('1000n');
      expect(parsedBody.items[0].id).toBe('1n');
      expect(parsedBody.items[1].id).toBe('2n');
      expect(parsedBody.metadata.timestamp).toBe('999999999999999999n');
      expect(parsedBody.metadata.version).toBe(1);
    });

    it('should handle arrays with BigInt values in body', () => {
      const plain = {
        Header: {
          Type: 103,
          MsgGuid: 'array-guid',
          ServerTimestamp: 1234567890,
        },
        Body: {
          ids: [123n, 456n, 789n],
          mixedArray: [1n, 'text', 2, true, { nested: 3n }],
          data: {
            values: [100n, 200n, 300n],
          },
        },
      };

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });

      const parsedBody = JSON.parse(wrapped.body!);
      expect(parsedBody.ids).toEqual(['123n', '456n', '789n']);
      expect(parsedBody.mixedArray).toEqual(['1n', 'text', 2, true, { nested: '3n' }]);
      expect(parsedBody.data.values).toEqual(['100n', '200n', '300n']);
    });

    it('should handle edge cases with BigInt in body', () => {
      const plain = {
        Header: {
          Type: 104,
          MsgGuid: 'edge-guid',
          ServerTimestamp: 1234567890,
        },
        Body: {
          zero: 0n,
          negative: -123n,
          large: 999999999999999999999999n,
          mixed: {
            positive: 456n,
            negative: -789n,
            zero: 0n,
          },
        },
      };

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });

      const parsedBody = JSON.parse(wrapped.body!);
      expect(parsedBody.zero).toBe('0n');
      expect(parsedBody.negative).toBe('-123n');
      expect(parsedBody.large).toBe('999999999999999999999999n');
      expect(parsedBody.mixed.positive).toBe('456n');
      expect(parsedBody.mixed.negative).toBe('-789n');
      expect(parsedBody.mixed.zero).toBe('0n');
    });

    it('should handle body without BigInt values normally', () => {
      const plain = {
        Header: {
          Type: 105,
          MsgGuid: 'normal-guid',
          ServerTimestamp: 111,
        },
        Body: {
          name: 'test',
          count: 123,
          active: true,
          data: null,
          items: ['a', 'b', 'c'],
        },
      };

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });

      expect(wrapped.body).toBe(
        '{"name":"test","count":123,"active":true,"data":null,"items":["a","b","c"]}',
      );
    });
  });

  describe('Error handling in body transform', () => {
    it('should handle circular references in body gracefully', () => {
      const circularObj: any = { name: 'test' };
      circularObj.self = circularObj;

      const plain = {
        Header: {
          Type: 106,
          MsgGuid: 'circular-guid',
          ServerTimestamp: 222,
        },
        Body: circularObj,
      };

      // Class transformer fails on circular references during transformation
      expect(() => {
        plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });
      }).toThrow();
    });

    it('should handle body with functions and symbols', () => {
      const plain = {
        Header: {
          Type: 107,
          MsgGuid: 'complex-guid',
          ServerTimestamp: 333,
        },
        Body: {
          name: 'test',
          func: () => {},
          symbol: Symbol('test'),
          bigint: 123n,
        },
      };

      expect(() => {
        plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });
      }).not.toThrow();

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });
      expect(typeof wrapped.body).toBe('string');
      expect(wrapped.body).toBeDefined();
    });

    it('should handle completely unserializable body', () => {
      const unserializable = (() => {
        const obj: any = {};
        obj.circular = obj;
        obj.func = () => {};
        obj.symbol = Symbol('test');
        return obj;
      })();

      const plain = {
        Header: {
          Type: 108,
          MsgGuid: 'unserializable-guid',
          ServerTimestamp: 444,
        },
        Body: unserializable,
      };

      // Class transformer fails on circular references during transformation
      expect(() => {
        plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });
      }).toThrow();
    });
  });

  describe('Complex integration scenarios', () => {
    it('should handle real-world message structure with mixed data types', () => {
      const plain = {
        Header: {
          Type: 35, // Market update type
          MsgGuid: 'market-update-guid',
          ServerTimestamp: 12345,
        },
        Body: {
          Fixture: {
            Id: 11060329315062111n, // Large fixture ID
            Sport: {
              Id: 6046n,
              Name: 'Soccer',
            },
            League: {
              Id: 132n,
              Name: 'Premier League',
            },
          },
          Markets: [
            {
              Id: 1n,
              Name: '1X2',
              Bets: [
                {
                  Id: 123456789012345678n,
                  Name: '1',
                  Price: '2.50',
                  Status: 1,
                },
                {
                  Id: 987654321098765432n,
                  Name: 'X',
                  Price: '3.20',
                  Status: 1,
                },
              ],
            },
          ],
          Timestamp: 1609459200000n,
        },
      };

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });

      const parsedBody = JSON.parse(wrapped.body!);
      expect(parsedBody.Fixture.Id).toBe('11060329315062111n');
      expect(parsedBody.Fixture.Sport.Id).toBe('6046n');
      expect(parsedBody.Fixture.League.Id).toBe('132n');
      expect(parsedBody.Markets[0].Id).toBe('1n');
      expect(parsedBody.Markets[0].Bets[0].Id).toBe('123456789012345678n');
      expect(parsedBody.Markets[0].Bets[1].Id).toBe('987654321098765432n');
      expect(parsedBody.Timestamp).toBe('1609459200000n');
    });

    it('should preserve header data while transforming body', () => {
      const plain = {
        Header: {
          Type: 200,
          MsgGuid: 'preservation-test',
          ServerTimestamp: 555,

          CustomField: 'should-be-preserved',
        },
        Body: {
          id: 123n,
          data: 'test',
        },
        ExtraField: 'should-be-ignored',
      };

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });

      expect(wrapped.header.type).toBe(200);
      expect(wrapped.header.msgGuid).toBe('preservation-test');
      expect(wrapped.header.serverTimestamp).toBe(555);
      expect((wrapped.header as any).customField).toBeUndefined(); // Filtered out by excludeExtraneousValues
      expect(wrapped.body).toBe('{"id":"123n","data":"test"}');
      expect((wrapped as any).extraField).toBeUndefined();
    });

    it('should handle empty body object', () => {
      const plain = {
        Header: {
          Type: 201,
          MsgGuid: 'empty-body-test',
          ServerTimestamp: 666,
        },
        Body: {},
      };

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });

      expect(wrapped.body).toBe('{}');
    });

    it('should handle null body', () => {
      const plain = {
        Header: {
          Type: 202,
          MsgGuid: 'null-body-test',
          ServerTimestamp: 777,
        },
        Body: null,
      };

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });

      expect(wrapped.body).toBe('null');
    });
  });

  describe('Performance and edge cases', () => {
    it('should handle very large objects with many BigInt values', () => {
      const largeBody = {
        users: Array.from({ length: 100 }, (_, i) => ({
          id: BigInt(i + 1000000000000000000),
          name: `User ${i}`,
          score: BigInt(i * 1000),
        })),
        metadata: {
          totalCount: 100n,
          timestamp: 1234567890123456789n,
        },
      };

      const plain = {
        Header: {
          Type: 203,
          MsgGuid: 'large-object-test',
          ServerTimestamp: 888,
        },
        Body: largeBody,
      };

      const wrapped = plainToInstance(WrappedMessage, plain, { excludeExtraneousValues: true });

      expect(typeof wrapped.body).toBe('string');
      expect(wrapped.body!.length).toBeGreaterThan(0);

      const parsedBody = JSON.parse(wrapped.body!);
      expect(parsedBody.users).toHaveLength(100);
      expect(parsedBody.users[0].id).toBe('1000000000000000000n');
      expect(parsedBody.metadata.totalCount).toBe('100n');
    });
  });
});
