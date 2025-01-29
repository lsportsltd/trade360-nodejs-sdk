import { readFileSync } from 'fs';
import path from 'path';

import { HttpAppConfig } from 'trade360-nodejs-sdk';

const appConfigPath = path.resolve(__dirname, 'app-config.json');

let cachedConfig: HttpAppConfig;

export function getConfig(): HttpAppConfig {
  if (!cachedConfig) {
    const configContent = readFileSync(appConfigPath, 'utf-8');
    cachedConfig = JSON.parse(configContent) as HttpAppConfig;
  }
  return cachedConfig;
}
