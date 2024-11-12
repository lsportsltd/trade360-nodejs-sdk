import { GetFixtureScheduleRequestDto } from '@subscription-api/dtos';
import {
  FixtureScheduleCollectionResponse,
  PackageQuotaResponse,
} from '@subscription-api/responses';

/**
 * ISubscriptionHttpClient interface is responsible
 * for sending requests to the subscription API.
 * It contains the methods for sending requests to
 * the subscription API.
 */
export interface ISubscriptionHttpClient {
  getPackageQuota(): Promise<PackageQuotaResponse>;
  getFixtureSchedule(
    requestDto: GetFixtureScheduleRequestDto,
  ): Promise<FixtureScheduleCollectionResponse>;
}
