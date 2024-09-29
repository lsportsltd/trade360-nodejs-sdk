import { Options } from 'amqplib';

import { MQSettings } from '@feed/vaildators';

export interface AppConfig {
  trade360: PackageTypesMQSettings;
}

interface PackageTypesMQSettings {
  inPlayMQSettings?: MQSettingsOptions;
  preMatchMQSettings?: MQSettingsOptions;
}

export type MQSettingsOptions = MQSettings & Options.Connect;
