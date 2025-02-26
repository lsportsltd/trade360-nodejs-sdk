/**
 * Enum for subscription routes prefix url.
 */
export enum SubscriptionRoutesPrefixUrl {
  GET_PACKAGE_QUOTA_PREFIX_URL = '/package/GetPackageQuota',
  GET_FIXTURES_SCHEDULE_PREFIX_URL = '/Fixtures/InPlaySchedule',
  SUBSCRIBE_BY_FIXTURES_PREFIX_URL = '/Fixtures/Subscribe',
  UNSUBSCRIBE_BY_FIXTURE_PREFIX_URL = '/Fixtures/UnSubscribe',
  SUBSCRIBE_BY_LEAGUES_PREFIX_URL = '/Leagues/Subscribe',
  UNSUBSCRIBE_BY_LEAGUES_PREFIX_URL = '/Leagues/UnSubscribe',
  GET_FIXTURES_SUBSCRIPTION_PREFIX_URL = '/Fixtures/Get',
  SUBSCRIBE_BY_COMPETITIONS_PREFIX_URL = '/Outright/Subscribe',
  UNSUBSCRIBE_BY_COMPETITIONS_PREFIX_URL = '/Outright/UnSubscribe',
  GET_ALL_MANUAL_SUSPENSIONS_PREFIX_URL = '/Markets/ManualSuspension/GetAll',
  ADD_MANUAL_SUSPENSIONS_PREFIX_URL = '/Markets/ManualSuspension/Activate',
  REMOVE_MANUAL_SUSPENSIONS_PREFIX_URL = '/Markets/ManualSuspension/Deactivate',
  GET_FIXTURES_METADATA_SUBSCRIPTIONS_PREFIX_URL = '/Fixtures/GetSubscribedMetadata',
}
