export const DEFUALT_PREFETCH_COUNT: number = 1;
export const DEFUALT_AUTO_ACK: boolean = false;
/** Recommended sample value (5 seconds). Not applied as a schema default — set via configuration. */
export const DEFUALT_NETWORK_RECOVERY_INTERVAL_IN_MS: number = 5 * 1000;
export const DEFUALT_AUTOMATIC_RECOVERY_ENABLED: boolean = true;
export const DEFUALT_CONSUMPTION_LATENCY_THRESHOLD: number = 5; // 5 seconds
export const DEFUALT_REQUESTED_HEARTBEAT_SECONDS: number = 10; // 10 seconds
export const DEFUALT_DISPATCH_CONSUMERS: boolean = true;

export const DEFUALT_DISTRIBUTION_PROPAGATION_DELAY_MS: number = 2 * 1000; // 2 seconds
export const DEFUALT_INITIAL_CONNECTION_RETRY_INTERVAL_MS: number = 1 * 1000; // 1 second
export const DEFUALT_INITIAL_CONNECTION_MAX_ATTEMPTS: number = 5;

export const MIN_PREFETCH_COUNT: number = 1;
export const MIN_REQUESTED_HEARTBEAT_SECONDS: number = 5; // 5 seconds
export const MIN_DISTRIBUTION_PROPAGATION_DELAY_MS: number = 0;
export const MIN_INITIAL_CONNECTION_RETRY_INTERVAL_MS: number = 500; // 500 ms
export const MIN_INITIAL_CONNECTION_MAX_ATTEMPTS: number = 1;
