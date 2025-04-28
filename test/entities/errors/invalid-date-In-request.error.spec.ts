import { InvalidDateInRequestError } from '../../../src/entities/errors/invalid-date-In-request.error';
import { BaseError } from '../../../src/entities/errors/base.error';

describe('InvalidDateInRequestError', () => {
  it('should instantiate with a formatted message and correct name', () => {
    const error = new InvalidDateInRequestError('startDate');
    expect(error).toBeInstanceOf(InvalidDateInRequestError);
    expect(error).toBeInstanceOf(BaseError);
    expect(error.message).toBe(
      'Date startDate is required and was not provided for as fields of the request',
    );
    expect(error.name).toBe('InvalidDateInRequestError');
  });
});
