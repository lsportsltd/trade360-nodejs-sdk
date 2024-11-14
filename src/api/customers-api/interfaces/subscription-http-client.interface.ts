import {
  FixturesSubscriptionRequestDto,
  LeaguesSubscriptionRequestDto,
  GetFixtureScheduleRequestDto,
} from '@subscription-api/dtos';
import {
  FixtureScheduleCollectionResponse,
  FixturesSubscriptionCollectionResponse,
  GetManualSuspensionsResponse,
  LeaguesSubscriptionCollectionResponse,
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
  getFixturesSchedule(
    requestDto: GetFixtureScheduleRequestDto,
  ): Promise<FixtureScheduleCollectionResponse>;
  subscribeByFixtures(
    requestDto: FixturesSubscriptionRequestDto,
  ): Promise<FixturesSubscriptionCollectionResponse>;
  unSubscribeByFixtures(
    requestDto: FixturesSubscriptionRequestDto,
  ): Promise<FixturesSubscriptionCollectionResponse>;
  subscribeByLeagues(
    requestDto: LeaguesSubscriptionRequestDto,
  ): Promise<LeaguesSubscriptionCollectionResponse>;
  unSubscribeByLeagues(
    requestDto: LeaguesSubscriptionRequestDto,
  ): Promise<LeaguesSubscriptionCollectionResponse>;
  getAllManualSuspensions(): Promise<GetManualSuspensionsResponse>;
}
