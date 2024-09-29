import { RetryError } from '@lsports/errors';
import { ILogger } from '@logger';

/**
 * Retry options for retrying an operation with exponential backoff
 */
interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  backoffFactor?: number;
}

/**
 * Retry an operation with exponential backoff
 * @param operation the operation to retry
 * @param options the retry options based on the number of attempts and delay
 * @param operationName the name of the operation for logging
 * @param logger the logger to use for logging
 * @returns the result of the operation
 */
export async function withRetry<T>(
  operation: (...args: never[]) => Promise<T>,
  options: RetryOptions,
  operationName: string,
  logger: ILogger,
): Promise<T> {
  const { maxAttempts, delayMs, backoffFactor = 1 } = options;

  return new Promise<T>((resolve, reject) => {
    let attempts = 0;

    const executeRetry = async (): Promise<void> => {
      attempts++;

      try {
        const result = await operation();
        logger.debug(`${operationName} succeeded on attempt ${attempts}`);
        resolve(result);
      } catch (error) {
        logger.warn(`Attempt ${attempts} failed: ${error}`);

        if (attempts >= maxAttempts) {
          reject(new RetryError(`${operationName} failed after ${maxAttempts} attempts`, attempts));
        } else {
          const nextDelay = delayMs * Math.pow(backoffFactor, attempts - 1);
          logger.debug(`Retrying in ${nextDelay}ms...`);
          setTimeout(executeRetry, nextDelay);
        }
      }
    };

    executeRetry();
  });
}
