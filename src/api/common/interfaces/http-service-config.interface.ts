import { PackageCredentials } from '@entities';
import { ILogger } from '@logger';

export interface IHttpServiceConfig {
  baseUrl?: string;
  packageCredentials?: PackageCredentials;
  logger?: ILogger;
}
