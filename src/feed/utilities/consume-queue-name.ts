export type ConsumeQueueSettings = {
  packageId: number;
  customQueueName?: string;
};

export const CONSUME_QUEUE_NAME_MAX_LENGTH = 255;
export const STANDARD_AMQP_PLAIN_PORT = 5672;
export const STANDARD_AMQP_TLS_PORT = 5671;

/**
 * Resolves the queue to consume: customQueueName (trimmed) when set,
 * otherwise _{packageId}_.
 */
export function resolveConsumeQueueName(settings: ConsumeQueueSettings): string {
  const customQueueName = settings.customQueueName?.trim();
  if (customQueueName) {
    return customQueueName;
  }

  return `_${settings.packageId}_`;
}
