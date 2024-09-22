import { ILogger, LogLevel } from 'trade360-nodejs-sdk';

// Example implementation for console logger
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
