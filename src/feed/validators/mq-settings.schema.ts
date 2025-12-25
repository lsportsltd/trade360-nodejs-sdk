import { z } from 'zod';

import {
  DEFUALT_AUTOMATIC_RECOVERY_ENABLED,
  DEFUALT_AUTO_ACK,
  DEFUALT_CONSUMPTION_LATENCY_THRESHOLD,
  DEFUALT_DISPATCH_CONSUMERS,
  DEFUALT_NETWORK_RECOVERY_INTERVAL_IN_MS,
  DEFUALT_PREFETCH_COUNT,
  DEFUALT_REQUESTED_HEARTBEAT_SECONDS,
  MIN_NETWORK_RECOVERY_INTERVAL_IN_MS,
  MIN_PREFETCH_COUNT,
  MIN_REQUESTED_HEARTBEAT_SECONDS,
} from '@feed/types';

/**
 * Schema for the MQ settings object. This schema is
 * used to parse and validate the MQ settings object.
 * The MQ settings object is used to configure the
 * connection to the RabbitMQ server.
 * 
 * @remarks The `customersApiBaseUrl` field is required for all MQ settings.
 *          It is used by the DistributionUtil for distribution management operations.
 */
export const MQSettingsSchema = z.object({
  hostname: z.string(),
  port: z.number().int().positive(),
  vhost: z.string(),
  username: z.string(),
  password: z.string(),
  packageId: z.number().int().positive(),
  prefetchCount: z
    .number()
    .int()
    .positive()
    .min(MIN_PREFETCH_COUNT)
    .default(DEFUALT_PREFETCH_COUNT),
  autoAck: z.boolean().default(DEFUALT_AUTO_ACK),
  networkRecoveryIntervalInMs: z
    .number()
    .int()
    .positive()
    .min(MIN_NETWORK_RECOVERY_INTERVAL_IN_MS)
    .default(DEFUALT_NETWORK_RECOVERY_INTERVAL_IN_MS),
  maxRetryAttempts: z.number().int().positive(),
  consumptionLatencyThreshold: z
    .number()
    .int()
    .nonnegative()
    .default(DEFUALT_CONSUMPTION_LATENCY_THRESHOLD),
  requestedHeartbeatSeconds: z
    .number()
    .int()
    .nonnegative()
    .min(MIN_REQUESTED_HEARTBEAT_SECONDS)
    .default(DEFUALT_REQUESTED_HEARTBEAT_SECONDS),
  dispatchConsumersAsync: z.boolean().default(DEFUALT_DISPATCH_CONSUMERS),
  automaticRecoveryEnabled: z.boolean().default(DEFUALT_AUTOMATIC_RECOVERY_ENABLED),
  /** Required. Customers API base URL (e.g., "https://stm-api.lsports.eu/") used for distribution management. */
  customersApiBaseUrl: z.string().url(),
});

// Type inference
export type MQSettings = z.infer<typeof MQSettingsSchema>;
