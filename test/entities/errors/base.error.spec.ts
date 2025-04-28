import { BaseError } from '../../../src/entities/errors/base.error';

describe('BaseError', () => {
  it('should instantiate with a message', () => {
    const error = new BaseError('Something went wrong');
    expect(error).toBeInstanceOf(BaseError);
    expect(error.message).toBe('Something went wrong');
    expect(error.name).toBe('BaseError');
    expect(error.context).toBeUndefined();
  });

  it('should assign context if provided', () => {
    const context = { foo: 'bar' };
    const error = new BaseError('With context', { context });
    expect(error.context).toEqual(context);
  });

  it('should allow context to be undefined', () => {
    const error = new BaseError('No context', {});
    expect(error.context).toBeUndefined();
  });
});
