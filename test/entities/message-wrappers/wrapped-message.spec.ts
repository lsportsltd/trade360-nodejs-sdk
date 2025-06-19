import { plainToInstance } from 'class-transformer';
import { WrappedMessage } from '../../../src/entities/message-wrappers/wrapped-message';
import { MessageHeader } from '../../../src/entities/message-wrappers/message-header';

describe('WrappedMessage Entity', () => {
  it('should deserialize a plain object into a WrappedMessage instance', () => {
    const plain = {
      Header: {
        Type: 1,
        MsgSeq: 123,
        MsgGuid: 'test-guid',
        CreationDate: '2024-01-01T00:00:00Z',
        ServerTimestamp: 1609459200,
      },
      Body: { message: 'test body' },
    };

    const wrappedMessage = plainToInstance(WrappedMessage, plain, {
      excludeExtraneousValues: true,
    });

    expect(wrappedMessage).toBeInstanceOf(WrappedMessage);
    expect(wrappedMessage.header).toBeInstanceOf(MessageHeader);
    expect(wrappedMessage.body).toBe('{"message":"test body"}');
  });

  it('should handle Body with BigInt values without throwing serialization error', () => {
    const plain = {
      Header: {
        Type: 1,
        MsgSeq: 123,
        MsgGuid: 'test-guid',
        CreationDate: '2024-01-01T00:00:00Z',
        ServerTimestamp: 1609459200,
      },
      Body: {
        id: 123n,
        betId: 456n,
        name: 'test bet',
        amount: 100,
      },
    };

    const wrappedMessage = plainToInstance(WrappedMessage, plain, {
      excludeExtraneousValues: true,
    });

    expect(wrappedMessage).toBeInstanceOf(WrappedMessage);
    expect(wrappedMessage.body).toBe('{"id":"123","betId":"456","name":"test bet","amount":100}');
  });

  it('should handle Body with nested objects containing BigInt values', () => {
    const plain = {
      Header: {
        Type: 1,
        MsgSeq: 123,
        MsgGuid: 'test-guid',
        CreationDate: '2024-01-01T00:00:00Z',
        ServerTimestamp: 1609459200,
      },
      Body: {
        user: { id: 123n, name: 'John' },
        bet: { id: 456n, amount: 100 },
        metadata: {
          timestamp: Date.now(),
          largeId: BigInt('9007199254740992'),
        },
      },
    };

    const wrappedMessage = plainToInstance(WrappedMessage, plain, {
      excludeExtraneousValues: true,
    });

    expect(wrappedMessage).toBeInstanceOf(WrappedMessage);
    
    // Parse the body to verify correct serialization
    const parsedBody = JSON.parse(wrappedMessage.body!);
    expect(parsedBody.user.id).toBe('123');
    expect(parsedBody.bet.id).toBe('456');
    expect(parsedBody.metadata.largeId).toBe('9007199254740992');
  });

  it('should handle Body with arrays containing BigInt values', () => {
    const plain = {
      Header: {
        Type: 1,
        MsgSeq: 123,
        MsgGuid: 'test-guid',
        CreationDate: '2024-01-01T00:00:00Z',
        ServerTimestamp: 1609459200,
      },
      Body: {
        betIds: [123n, 456n, 789n],
        userIds: [111n, 222n],
        message: 'test with arrays',
      },
    };

    const wrappedMessage = plainToInstance(WrappedMessage, plain, {
      excludeExtraneousValues: true,
    });

    expect(wrappedMessage).toBeInstanceOf(WrappedMessage);
    
    // Parse the body to verify correct serialization
    const parsedBody = JSON.parse(wrappedMessage.body!);
    expect(parsedBody.betIds).toEqual(['123', '456', '789']);
    expect(parsedBody.userIds).toEqual(['111', '222']);
    expect(parsedBody.message).toBe('test with arrays');
  });

  it('should handle missing properties', () => {
    const plain = {};
    const wrappedMessage = plainToInstance(WrappedMessage, plain, {
      excludeExtraneousValues: true,
    });
    
    expect(wrappedMessage.body).toBeUndefined();
  });

  it('should ignore extraneous properties', () => {
    const plain = {
      Header: {
        Type: 1,
        MsgSeq: 123,
        MsgGuid: 'test-guid',
      },
      Body: { message: 'test' },
      Extra: 'ignore me',
    };

    const wrappedMessage = plainToInstance(WrappedMessage, plain, {
      excludeExtraneousValues: true,
    });

    expect((wrappedMessage as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
}); 