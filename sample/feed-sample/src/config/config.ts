import path from 'path';
import { readFileSync } from 'fs';

import { AppConfig } from 'trade360-nodejs-sdk';

const appConfigPath = path.resolve(__dirname, 'app-config.json');

let cachedConfig: AppConfig;

export function getConfig(): AppConfig {
  if (!cachedConfig) {
    const configContent = readFileSync(appConfigPath, 'utf-8');
    cachedConfig = JSON.parse(configContent) as AppConfig;
  }
  return cachedConfig;
}
