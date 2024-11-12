import path from 'path';
import { readFileSync } from 'fs';

import { MQAppConfig } from 'trade360-nodejs-sdk';

const appConfigPath = path.resolve(__dirname, 'app-config.json');

let cachedConfig: MQAppConfig;

export function getConfig(): MQAppConfig {
  if (!cachedConfig) {
    const configContent = readFileSync(appConfigPath, 'utf-8');
    cachedConfig = JSON.parse(configContent) as MQAppConfig;
  }
  return cachedConfig;
}
