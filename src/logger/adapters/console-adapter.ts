import { LogLevel } from '../enums';
import { ILogger } from '../interfaces';

/**
 * ConsoleAdapter class to log messages with different levels to the console.
 * */
export class ConsoleAdapter implements ILogger {
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
