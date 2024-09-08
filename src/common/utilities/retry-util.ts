import { RetryError } from "@common";

interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  backoffFactor?: number;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions,
  operationName: string,
  logger: Console
): Promise<T> {
  const { maxAttempts, delayMs, backoffFactor = 1 } = options;

  return new Promise<T>((resolve, reject) => {
    let attempts = 0;

    const executeRetry = async () => {
      attempts++;

      try {
        const result = await operation();
        logger.log(`${operationName} succeeded on attempt ${attempts}`);
        resolve(result);
      } catch (error) {
        logger.warn(`Attempt ${attempts} failed: ${error}`);

        if (attempts >= maxAttempts) {
          reject(
            new RetryError(
              `${operationName} failed after ${maxAttempts} attempts`,
              attempts
            )
          );
        } else {
          const nextDelay = delayMs * Math.pow(backoffFactor, attempts - 1);
          logger.log(`Retrying in ${nextDelay}ms...`);
          setTimeout(executeRetry, nextDelay);
        }
      }
    };

    executeRetry();
  });
}
