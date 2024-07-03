export interface AppConfig {
  Trade360: PackageTypesMQSettings;
}

export interface PackageTypesMQSettings {
  InplayMQSettings: MQSettings;
  PrematchMQSettings: MQSettings;
}

export interface MQSettings {
  Host: string;
  Port: string;
  VirtualHost: string;
  PackageId: number;
  UserName: string;
  Password: string;
  PrefetchCount?: number;
  AutoAck?: boolean;
  RequestedHeartbeatSeconds?: number;
  NetworkRecoveryInterval?: number;
  DispatchConsumersAsync?: boolean;
  AutomaticRecoveryEnabled?: boolean;
}
