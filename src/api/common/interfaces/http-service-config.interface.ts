import { PackageCredentials } from '@entities';
import { ILogger } from '@logger';

/**
 * HTTP service configuration interface.
 */
export interface IHttpServiceConfig {
  customersApiBaseUrl?: string;
  packageCredentials?: PackageCredentials;
  logger?: ILogger;
}
