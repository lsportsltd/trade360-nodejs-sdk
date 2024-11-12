import { PackageQuotaResponse } from '@subscription-api/responses';

export interface ISubscriptionHttpClient {
  getPackageQuota(): Promise<PackageQuotaResponse>;
}
