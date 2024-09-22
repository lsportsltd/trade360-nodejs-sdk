import pino, { Logger, LoggerOptions } from 'pino';

import { ILogger, LogLevel } from 'trade360-nodejs-sdk';

export interface PinoAdapterOptions extends LoggerOptions {}

// Pino adapter
export class PinoAdapter implements ILogger {
  private logger: Logger;

  constructor(options?: LoggerOptions) {
    this.logger = pino(options);
  }

  log(level: LogLevel, message: string, ...meta: unknown[]): void {
    this.logger[level](message, ...meta);
  }

  debug(message: string, ...meta: unknown[]): void {
    this.logger.debug(message, ...meta);
  }

  info(message: string, ...meta: unknown[]): void {
    this.logger.info(message, ...meta);
  }

  warn(message: string, ...meta: unknown[]): void {
    this.logger.warn(message, ...meta);
  }

  error(message: string, ...meta: unknown[]): void {
    this.logger.error(message, ...meta);
  }
}
