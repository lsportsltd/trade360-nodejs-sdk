import {
  DEFUALT_AUTOMATIC_RECOVERY_ENABLED,
  DEFUALT_AUTO_ACK,
  DEFUALT_DISPATCH_CONSUMERS,
  DEFUALT_NETWORK_RECOVERY_INTERVAL_IN_MS,
  DEFUALT_PREFETCH_COUNT,
  DEFUALT_REQUESTED_HEARTBEAT_SECONDS,
} from "./globals";

export interface AppConfig {
  Trade360: PackageTypesMQSettings;
}

export interface PackageTypesMQSettings {
  InplayMQSettings: MQSettings;
  PrematchMQSettings: MQSettings;
}

export class MQSettings {
  Host!: string;
  Port!: string;
  VirtualHost!: string;
  PackageId!: number;
  UserName!: string;
  Password!: string;
  PrefetchCount: number = DEFUALT_PREFETCH_COUNT;
  AutoAck: boolean = DEFUALT_AUTO_ACK;
  RequestedHeartbeatSeconds: number = DEFUALT_REQUESTED_HEARTBEAT_SECONDS;
  NetworkRecoveryIntervalInMs: number = DEFUALT_NETWORK_RECOVERY_INTERVAL_IN_MS; 
  DispatchConsumersAsync: boolean = DEFUALT_DISPATCH_CONSUMERS;
  AutomaticRecoveryEnabled: boolean = DEFUALT_AUTOMATIC_RECOVERY_ENABLED;
}
