import { plainToInstance } from 'class-transformer';
import { Result } from '../../../../src/entities/core-entities/livescore/result';

describe('Result Entity', () => {
  it('should deserialize a plain object into a Result instance', (): void => {
    const plain = {
      Position: '1st',
      Value: 'Win',
    };
    const result = plainToInstance(Result, plain, { excludeExtraneousValues: true });
    expect(result).toBeInstanceOf(Result);
    expect(result.position).toBe('1st');
    expect(result.value).toBe('Win');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const result = plainToInstance(Result, plain, { excludeExtraneousValues: true });
    expect(result.position).toBeUndefined();
    expect(result.value).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Position: '2nd',
      Extra: 'ignore me',
    };
    const result = plainToInstance(Result, plain, { excludeExtraneousValues: true });
    expect((result as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
