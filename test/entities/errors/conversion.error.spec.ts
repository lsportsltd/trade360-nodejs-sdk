import { ConversionError } from '../../../src/entities/errors/conversion.error';
import { BaseError } from '../../../src/entities/errors/base.error';

describe('ConversionError', () => {
  it('should instantiate with a formatted message and correct name', () => {
    const error = new ConversionError('MyClass', 'bad data');
    expect(error).toBeInstanceOf(ConversionError);
    expect(error).toBeInstanceOf(BaseError);
    expect(error.message).toBe('failed converting object to MyClass instance!, err: bad data');
    expect(error.name).toBe('ConversionError');
  });

  it('should handle non-string errors', () => {
    const error = new ConversionError('OtherClass', { foo: 'bar' });
    expect(error.message).toBe(
      'failed converting object to OtherClass instance!, err: [object Object]',
    );
  });
});
