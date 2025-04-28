import { withRetry } from '../../src/utilities/retry-util';
import { RetryError } from '../../src/entities/errors/retry.error';

describe('withRetry', () => {
  const operationName = 'testOperation';
  let logger: {
    log: jest.Mock;
    debug: jest.Mock;
    info: jest.Mock;
    warn: jest.Mock;
    error: jest.Mock;
  };

  beforeEach(() => {
    jest.useFakeTimers();
    logger = {
      log: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should resolve on first success', async () => {
    const op = jest.fn().mockResolvedValue('ok');
    const resultPromise = withRetry(op, { maxAttempts: 3, delayMs: 100 }, operationName, logger);
    await expect(resultPromise).resolves.toBe('ok');
    expect(op).toHaveBeenCalledTimes(1);
    expect(logger.debug).toHaveBeenCalledWith(`${operationName} succeeded on attempt 1`);
  });

  it('should retry on failure and succeed', async () => {
    const op = jest.fn().mockRejectedValueOnce(new Error('fail1')).mockResolvedValueOnce('ok');
    const resultPromise = withRetry(op, { maxAttempts: 3, delayMs: 100 }, operationName, logger);
    jest.runAllTimers();
    await expect(resultPromise).resolves.toBe('ok');
    expect(op).toHaveBeenCalledTimes(2);
    expect(logger.warn).toHaveBeenCalledWith('Attempt 1 failed: Error: fail1');
    expect(logger.debug).toHaveBeenCalledWith('Retrying in 100ms...');
    expect(logger.debug).toHaveBeenCalledWith(`${operationName} succeeded on attempt 2`);
  });

  it('should retry with exponential backoff', async () => {
    const op = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail1'))
      .mockRejectedValueOnce(new Error('fail2'))
      .mockResolvedValueOnce('ok');
    const resultPromise = withRetry(
      op,
      { maxAttempts: 3, delayMs: 100, backoffFactor: 2 },
      operationName,
      logger,
    );
    for (let i = 0; i < 3; i++) {
      jest.runOnlyPendingTimers();
    }
    await expect(resultPromise).resolves.toBe('ok');
    expect(op).toHaveBeenCalledTimes(3);
    expect(logger.debug).toHaveBeenCalledWith('Retrying in 100ms...');
    expect(logger.debug).toHaveBeenCalledWith('Retrying in 200ms...');
  });

  it('should throw RetryError after max attempts', async () => {
    const op = jest.fn().mockRejectedValue(new Error('fail'));
    const resultPromise = withRetry(op, { maxAttempts: 2, delayMs: 100 }, operationName, logger);
    jest.runAllTimers();
    await expect(resultPromise).rejects.toThrow(RetryError);
    await expect(resultPromise).rejects.toThrow(`${operationName} failed after 2 attempts`);
    expect(op).toHaveBeenCalledTimes(2);
    expect(logger.warn).toHaveBeenCalledTimes(2);
  });
});
