import {
  DEFUALT_AUTOMATIC_RECOVERY_ENABLED,
  DEFUALT_AUTO_ACK,
  DEFUALT_DISPATCH_CONSUMERS,
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
  requestedHeartbeatSeconds: number = DEFUALT_REQUESTED_HEARTBEAT_SECONDS;
  networkRecoveryIntervalInMs: number = DEFUALT_NETWORK_RECOVERY_INTERVAL_IN_MS;
  dispatchConsumersAsync: boolean = DEFUALT_DISPATCH_CONSUMERS;
  automaticRecoveryEnabled: boolean = DEFUALT_AUTOMATIC_RECOVERY_ENABLED;
}
