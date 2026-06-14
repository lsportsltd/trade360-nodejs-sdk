import { z } from 'zod';

import {
  DEFUALT_AUTOMATIC_RECOVERY_ENABLED,
  DEFUALT_AUTO_ACK,
  DEFUALT_CONSUMPTION_LATENCY_THRESHOLD,
  DEFUALT_DISPATCH_CONSUMERS,
  DEFUALT_DISTRIBUTION_PROPAGATION_DELAY_MS,
  DEFUALT_INITIAL_CONNECTION_MAX_ATTEMPTS,
  DEFUALT_INITIAL_CONNECTION_RETRY_INTERVAL_MS,
  DEFUALT_NETWORK_RECOVERY_INTERVAL_IN_MS,
  DEFUALT_PREFETCH_COUNT,
  DEFUALT_REQUESTED_HEARTBEAT_SECONDS,
  MIN_DISTRIBUTION_PROPAGATION_DELAY_MS,
  MIN_INITIAL_CONNECTION_MAX_ATTEMPTS,
  MIN_INITIAL_CONNECTION_RETRY_INTERVAL_MS,
  MIN_NETWORK_RECOVERY_INTERVAL_IN_MS,
  MIN_PREFETCH_COUNT,
  MIN_REQUESTED_HEARTBEAT_SECONDS,
} from '@feed/types';

import {
  CONSUME_QUEUE_NAME_MAX_LENGTH,
  resolveConsumeQueueName,
} from '../utilities/consume-queue-name';

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
  packageId: z.number().int().nonnegative(),
  customQueueName: z.string().optional(),
  sslEnabled: z.boolean().default(false),
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
  distributionPropagationDelayMs: z
    .number()
    .int()
    .nonnegative()
    .min(MIN_DISTRIBUTION_PROPAGATION_DELAY_MS)
    .default(DEFUALT_DISTRIBUTION_PROPAGATION_DELAY_MS),
  initialConnectionRetryIntervalMs: z
    .number()
    .int()
    .positive()
    .min(MIN_INITIAL_CONNECTION_RETRY_INTERVAL_MS)
    .default(DEFUALT_INITIAL_CONNECTION_RETRY_INTERVAL_MS),
  initialConnectionMaxAttempts: z
    .number()
    .int()
    .positive()
    .min(MIN_INITIAL_CONNECTION_MAX_ATTEMPTS)
    .default(DEFUALT_INITIAL_CONNECTION_MAX_ATTEMPTS),
  /** Required. Customers API base URL (e.g., "https://stm-api.lsports.eu/") used for distribution management. */
  customersApiBaseUrl: z.string().url(),
}).superRefine((settings, ctx) => {
  if (settings.packageId === 0 && !settings.customQueueName?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        'packageId is required when customQueueName is not set, or set customQueueName when packageId is omitted.',
      path: ['packageId'],
    });
  }

  if (
    settings.customQueueName?.trim() &&
    settings.customQueueName.trim().length > CONSUME_QUEUE_NAME_MAX_LENGTH
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `customQueueName must be at most ${CONSUME_QUEUE_NAME_MAX_LENGTH} characters.`,
      path: ['customQueueName'],
    });
  }

  const queueName = resolveConsumeQueueName(settings);
  if (!queueName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'The effective queue name is empty. Check customQueueName and packageId.',
      path: ['customQueueName'],
    });
  } else if (queueName.length > CONSUME_QUEUE_NAME_MAX_LENGTH) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `The effective queue name exceeds ${CONSUME_QUEUE_NAME_MAX_LENGTH} characters. Shorten customQueueName.`,
      path: ['customQueueName'],
    });
  }
});

// Type inference
export type MQSettings = z.infer<typeof MQSettingsSchema>;
