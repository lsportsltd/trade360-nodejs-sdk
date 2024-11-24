import { LogLevel } from '../enums';

/**
 * Define the Logger interface to log messages
 * with different levels.
 */
export interface ILogger {
  log(level: LogLevel, message: string, ...meta: unknown[]): void;
  debug(message: string, ...meta: unknown[]): void;
  info(message: string, ...meta: unknown[]): void;
  warn(message: string, ...meta: unknown[]): void;
  error(message: string, ...meta: unknown[]): void;
}
