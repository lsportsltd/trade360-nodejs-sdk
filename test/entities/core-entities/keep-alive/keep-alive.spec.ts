import { plainToInstance } from 'class-transformer';
import { KeepAlive } from '../../../../src/entities/core-entities/keep-alive/keep-alive';
import { NameValueRecord } from '../../../../src/entities/core-entities/common/name-value-record';

describe('KeepAlive', () => {
  it('should deserialize a plain object into a KeepAlive instance', (): void => {
    const plain = {
      ActiveEvents: [1, 2, 3],
      ExtraData: [{ Name: 'foo', Value: 'bar' }],
      ProviderId: 42,
    };
    const keepAlive = plainToInstance(KeepAlive, plain, { excludeExtraneousValues: true });
    expect(keepAlive).toBeInstanceOf(KeepAlive);
    expect(Array.isArray(keepAlive.activeEvents)).toBe(true);
    expect(keepAlive.activeEvents).toEqual([1, 2, 3]);
    expect(Array.isArray(keepAlive.extraData)).toBe(true);
    expect(keepAlive.extraData?.[0]).toBeInstanceOf(NameValueRecord);
    expect(keepAlive.providerId).toBe(42);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const keepAlive = plainToInstance(KeepAlive, plain, { excludeExtraneousValues: true });
    expect(keepAlive.activeEvents).toBeUndefined();
    expect(keepAlive.extraData).toBeUndefined();
    expect(keepAlive.providerId).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { ProviderId: 7, Extra: 'ignore me' };
    const keepAlive = plainToInstance(KeepAlive, plain, { excludeExtraneousValues: true });
    expect((keepAlive as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
