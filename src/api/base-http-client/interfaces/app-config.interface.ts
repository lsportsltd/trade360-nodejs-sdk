import { HttpRequestSettings } from '../validators';

/**
 * Application configuration interface for the API
 * service settings for the package types HTTP settings
 */
export interface HttpAppConfig {
  trade360: HttpSettings;
}

/**
 * Http settings interface for the API service settings
 * for the package types HTTP settings
 */
export interface HttpSettings {
  restApiBaseUrl: string;
  inPlayMQSettings?: HttpRequestSettings;
  preMatchMQSettings?: HttpRequestSettings;
}
