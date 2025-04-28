import { ConsumptionMessageError } from '../../../src/entities/errors/consumption-message.error';
import { BaseError } from '../../../src/entities/errors/base.error';

describe('ConsumptionMessageError', () => {
  it('should instantiate with a formatted message', () => {
    const error = new ConsumptionMessageError('test');
    expect(error).toBeInstanceOf(ConsumptionMessageError);
    expect(error).toBeInstanceOf(BaseError);
    expect(error.message).toBe('Error processing message, Error: test');
  });

  it('should handle non-string errors', () => {
    const error = new ConsumptionMessageError({ foo: 'bar' });
    expect(error.message).toBe('Error processing message, Error: [object Object]');
  });
});
