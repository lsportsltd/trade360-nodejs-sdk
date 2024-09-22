import bunyan, { LoggerOptions, createLogger } from 'bunyan';

import { ILogger } from '../interfaces';
import { LogLevel } from '../enums';

export interface BunyanAdapterOptions extends LoggerOptions {}

// Bunyan adapter
export class BunyanAdapter implements ILogger {
  private logger: bunyan;

  constructor(options?: LoggerOptions) {
    this.logger = createLogger(options || { name: 'default' });
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
