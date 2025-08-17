import { Options } from 'amqplib';

import { MQSettings } from '@feed/validators';
import { BaseEntity } from '@lsports/entities';

/**
 * Application configuration interface for
 * the feed service settings for the package
 * types MQ settings for the feed service
 * to connect to the RabbitMQ server and the
 * feed service settings for the in-play and
 * pre-match feed services.
 */
export interface MQAppConfig {
  trade360: PackageTypesMQSettings;
}

/**
 * Package types MQ settings
 */
interface PackageTypesMQSettings {
  inPlayMQSettings?: MQSettingsOptions;
  preMatchMQSettings?: MQSettingsOptions;
}

/**
 * MQ settings options for the connection
 * settings and the MQ settings for the
 * feed service
 */
export type MQSettingsOptions = MQSettings & Options.Connect & BaseEntity;
