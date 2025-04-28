import { RetryError } from '../../../src/entities/errors/retry.error';
import { BaseError } from '../../../src/entities/errors/base.error';

describe('RetryError', () => {
  it('should instantiate with a formatted message', () => {
    const error = new RetryError('fetchData', 3);
    expect(error).toBeInstanceOf(RetryError);
    expect(error).toBeInstanceOf(BaseError);
    expect(error.message).toBe('fetchData failed after 3 attempts');
  });
});
