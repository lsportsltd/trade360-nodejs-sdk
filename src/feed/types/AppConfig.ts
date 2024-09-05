import {
  DEFUALT_AUTOMATIC_RECOVERY_ENABLED,
  DEFUALT_AUTO_ACK,
  DEFUALT_CONSUMPTION_LATENCY_THRESHOLD,
  DEFUALT_DISPATCH_CONSUMERS,
  DEFUALT_LSPORTS_PROCESSING_LATENCY_THRESHOLD,
  DEFUALT_NETWORK_RECOVERY_INTERVAL_IN_MS,
  DEFUALT_PREFETCH_COUNT,
  DEFUALT_REQUESTED_HEARTBEAT_SECONDS,
} from "./globals";

export interface AppConfig {
  trade360: PackageTypesMQSettings;
}

export interface PackageTypesMQSettings {
  inPlayMQSettings?: MQSettings;
  preMatchMQSettings?: MQSettings;
}

export class MQSettings {
  host!: string;
  port!: string;
  virtualHost!: string;
  packageId!: number;
  userName!: string;
  password!: string;
  prefetchCount: number = DEFUALT_PREFETCH_COUNT;
  autoAck: boolean = DEFUALT_AUTO_ACK;
  networkRecoveryIntervalInMs: number = DEFUALT_NETWORK_RECOVERY_INTERVAL_IN_MS;
  consumptionLatencyThreshold: number = DEFUALT_CONSUMPTION_LATENCY_THRESHOLD;
  lsportsProcessingLatencyThreshold: number =
    DEFUALT_LSPORTS_PROCESSING_LATENCY_THRESHOLD;
  requestedHeartbeatSeconds: number = DEFUALT_REQUESTED_HEARTBEAT_SECONDS;
  dispatchConsumersAsync: boolean = DEFUALT_DISPATCH_CONSUMERS;
  automaticRecoveryEnabled: boolean = DEFUALT_AUTOMATIC_RECOVERY_ENABLED;
}
