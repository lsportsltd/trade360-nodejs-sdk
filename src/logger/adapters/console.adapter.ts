'use strict';

import { ILogger, LogLevel } from '../';
import { BigIntSerializationUtil } from '@utilities';

/**
 * ConsoleAdapter class to log messages with different
 * levels to the console.
 * */
export class ConsoleAdapter implements ILogger {
  log(level: LogLevel, message: string, ...meta: unknown[]): void {
    // Validate log level to prevent object injection attacks
    const validLevels = ['log', 'debug', 'info', 'warn', 'error'] as const;
    const safeLevel = validLevels.includes(level as any) ? level : 'log';

    if (meta.length > 0) {
      // Convert BigInt values to strings in metadata to prevent serialization errors
      const safeMeta = meta.map((item) => {
        try {
          return JSON.parse(BigIntSerializationUtil.stringify(item));
        } catch {
          return item;
        }
      });
      // Additional validation before console call
      if (validLevels.includes(safeLevel as any)) {
        console[safeLevel](message, ...safeMeta);
      }
    } else {
      // Additional validation before console call
      if (validLevels.includes(safeLevel as any)) {
        console[safeLevel](message);
      }
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
