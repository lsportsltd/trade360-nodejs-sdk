import { Logger, LoggerOptions, createLogger, format, transports } from 'winston';

import { ILogger, LogLevel } from 'trade360-nodejs-sdk';

export interface WinstonAdapterOptions extends LoggerOptions {}

// Winston adapter
export class WinstonAdapter implements ILogger {
  private logger: Logger;

  constructor(options?: LoggerOptions) {
    this.logger = createLogger(
      options || {
        level: 'info',
        // format: winston.format.json(),
        format: format.simple(),
        transports: [new transports.Console()],
      },
    );
  }

  log(level: LogLevel, message: string, ...meta: unknown[]): void {
    this.logger.log(level, message, ...meta);
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
