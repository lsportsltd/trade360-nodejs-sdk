import { ILogger } from '..';
import { LogLevel } from '../enums';

// Example implementation for console logger
export class ConsoleLogger implements ILogger {
  log(level: LogLevel, message: string, ...meta: unknown[]): void {
    console[level](message, ...meta);
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
