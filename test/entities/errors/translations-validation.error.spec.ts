import { TranslationsValidationError } from '../../../src/entities/errors/translations-validation.error';
import { BaseError } from '../../../src/entities/errors/base.error';

describe('TranslationsValidationError', () => {
  it('should instantiate and inherit from BaseError', () => {
    const error = new TranslationsValidationError('Translation error');
    expect(error).toBeInstanceOf(TranslationsValidationError);
    expect(error).toBeInstanceOf(BaseError);
    expect(error.message).toBe('Translation error');
  });
});
