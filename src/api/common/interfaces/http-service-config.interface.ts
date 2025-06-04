import { PackageCredentials } from '@entities';
import { ILogger } from '../../../logger/interfaces';

/**
 * HTTP service configuration interface. It contains
 * the base URL of the REST API, the package
 * credentials and the logger. The REST API base
 * URL is the base URL of the REST API. The package
 * credentials are the credentials of the package. The
 * logger is the logger to log messages.
 * @example restApiBaseUrl: 'https://api.example.com'
 * @example packageCredentials: { packageId: 123,
 * username: '456', password: '789' }
 * @example logger: new Logger('HttpService')
 */
export interface IHttpServiceConfig {
  restApiBaseUrl?: string;
  packageCredentials?: PackageCredentials;
  logger?: ILogger;
}
