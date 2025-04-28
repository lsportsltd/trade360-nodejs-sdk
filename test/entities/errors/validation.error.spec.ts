import { ValidationError } from '../../../src/entities/errors/validation.error';
import { BaseError } from '../../../src/entities/errors/base.error';

describe('ValidationError', () => {
  it('should instantiate with a formatted message', () => {
    const error = new ValidationError('saveUser');
    expect(error).toBeInstanceOf(ValidationError);
    expect(error).toBeInstanceOf(BaseError);
    expect(error.message).toBe('saveUser validation failed');
    expect(error.context).toBeUndefined();
  });

  it('should assign context if provided', () => {
    const context = { field: 'email' };
    const error = new ValidationError('updateEmail', context);
    expect(error.context).toEqual(context);
  });
});
