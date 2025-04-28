import { plainToInstance } from 'class-transformer';
import { NameValueRecord } from '../../../../src/entities/core-entities/common/name-value-record';

describe('NameValueRecord', () => {
  it('should deserialize a plain object into a NameValueRecord instance', (): void => {
    const plain = { Name: 'foo', Value: 'bar' };
    const record = plainToInstance(NameValueRecord, plain, { excludeExtraneousValues: true });
    expect(record).toBeInstanceOf(NameValueRecord);
    expect(record.name).toBe('foo');
    expect(record.value).toBe('bar');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const record = plainToInstance(NameValueRecord, plain, { excludeExtraneousValues: true });
    expect(record.name).toBeUndefined();
    expect(record.value).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { Name: 'foo', Extra: 'ignore me' };
    const record = plainToInstance(NameValueRecord, plain, { excludeExtraneousValues: true });
    expect((record as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
