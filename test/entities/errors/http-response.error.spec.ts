import { HttpResponseError } from '../../../src/entities/errors/http-response.error';
import { BaseError } from '../../../src/entities/errors/base.error';

describe('HttpResponseError', () => {
  it('should instantiate with a formatted message', (): void => {
    const error = new HttpResponseError('Extra info', { foo: 'bar' });
    expect(error).toBeInstanceOf(HttpResponseError);
    expect(error).toBeInstanceOf(BaseError);
    expect(error.message).toBe('API call failed, Extra info');
    expect((error as unknown as { foo?: unknown }).foo).toBeUndefined(); // only context is passed
    if (typeof error === 'object' && error !== null && 'context' in error) {
      expect((error as { context?: unknown }).context).toBeUndefined();
    }
  });

  describe('getHttpResponseErrorByStatusCode', () => {
    it('should return error with mapped message for known status code', (): void => {
      const error = HttpResponseError.getHttpResponseErrorByStatusCode(
        404,
        'raw',
        'Not Found',
        'Some message',
      );
      expect(error).toBeInstanceOf(HttpResponseError);
      expect(error.message).toBe('API call failed, Not Found');
      expect(error.context).toBe('raw');
    });

    it('should return error with custom message for unknown status code', (): void => {
      const error = HttpResponseError.getHttpResponseErrorByStatusCode(
        999,
        'raw',
        'Unknown',
        'Custom message',
      );
      expect(error).toBeInstanceOf(HttpResponseError);
      expect(error.message).toBe('API call failed, Unknown, Custom message');
      expect(error.context).toBe('raw');
    });

    it('should handle missing arguments gracefully', (): void => {
      const error = HttpResponseError.getHttpResponseErrorByStatusCode();
      expect(error).toBeInstanceOf(HttpResponseError);
      expect(error.message).toBe('API call failed, undefined, undefined');
      expect(error.context).toBeUndefined();
    });
  });
});
