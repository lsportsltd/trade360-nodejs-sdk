'use strict';

import { ILogger, LogLevel } from '../';
import { BigIntSerializationUtil } from '@utilities';

/**
 * ConsoleAdapter class to log messages with different
 * levels to the console.
 * */
export class ConsoleAdapter implements ILogger {
  log(level: LogLevel, message: string, ...meta: unknown[]): void {
    if (meta.length > 0) {
      // Convert BigInt values to strings in metadata to prevent serialization errors
      const safeMeta = meta.map((item) => {
        try {
          return JSON.parse(BigIntSerializationUtil.stringify(item));
        } catch {
          return item;
        }
      });
      console[level](message, ...safeMeta);
    } else {
      console[level](message);
    }
  }

  debug(message: string, ...meta: unknown[]): void {
    this.log(LogLevel.DEBUG, message, ...meta);
  }

  info(message: string, ...meta: unknown[]): void {
    this.log(LogLevel.INFO, message, ...meta);
  }

  warn(message: string, ...meta: unknown[]): void {
    this.log(LogLevel.WARN, message, ...meta);
  }

  error(message: string, ...meta: unknown[]): void {
    this.log(LogLevel.ERROR, message, ...meta);
  }
}
