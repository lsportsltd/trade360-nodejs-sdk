import { PackageCredentials } from '@entities';
import { ILogger } from '@logger';

export interface IHttpServiceConfig {
  customersApiBaseUrl?: string;
  packageCredentials?: PackageCredentials;
  logger?: ILogger;
}
