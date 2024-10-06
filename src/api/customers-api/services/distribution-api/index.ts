export * from './distribution.service';

export enum DistributionRoutesPrefixUrl {
  STATUS_PREFIX_URL = '/Package/GetDistributionStatus',
  START_PREFIX_URL = '/Distribution/Start',
  STOP_PREFIX_URL = '/Distribution/Stop',
}
