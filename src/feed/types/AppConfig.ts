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
  PrefetchCount: number = 1;
  AutoAck: boolean = false;
  RequestedHeartbeatSeconds: number = 30; // 30 seconds
  NetworkRecoveryIntervalInMs: number = 10 * 1000; // 5 seconds
  DispatchConsumersAsync: boolean = true;
  AutomaticRecoveryEnabled: boolean = true;
}
