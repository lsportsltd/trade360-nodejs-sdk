import { PackageCredentials } from '@entities';
import { ILogger } from '@logger';

/**
 * HTTP service configuration interface. It contains
 * the base URL of the customers API, the package
 * credentials and the logger. The customers API base
 * URL is the base URL of the customers API. The package
 * credentials are the credentials of the package. The
 * logger is the logger to log messages.
 * @example customersApiBaseUrl: 'https://api.example.com'
 * @example packageCredentials: { packageId: 123,
 * username: '456', password: '789' }
 * @example logger: new Logger('HttpService')
 */
export interface IHttpServiceConfig {
  customersApiBaseUrl?: string;
  packageCredentials?: PackageCredentials;
  logger?: ILogger;
}
