import {
  ChangeManualSuspensionsRequestDto,
  CompetitionsSubscriptionRequestDto,
  FixturesSubscriptionRequestDto,
  GetFixtureScheduleRequestDto,
  GetSubscriptionsRequestDto,
  LeaguesSubscriptionRequestDto,
} from '@subscription-api/dtos';
import {
  ChangeManualSuspensionsResponse,
  CompetitionsSubscriptionCollectionResponse,
  FixtureScheduleCollectionResponse,
  FixturesSubscriptionCollectionResponse,
  GetManualSuspensionsResponse,
  GetSubscriptionsCollectionResponse,
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
  getSubscriptions(
    requestDto: GetSubscriptionsRequestDto,
  ): Promise<GetSubscriptionsCollectionResponse>;
  getAllManualSuspensions(): Promise<GetManualSuspensionsResponse>;
  addManualSuspensions(
    requestDto: ChangeManualSuspensionsRequestDto,
  ): Promise<ChangeManualSuspensionsResponse>;
  removeManualSuspensions(
    requestDto: ChangeManualSuspensionsRequestDto,
  ): Promise<ChangeManualSuspensionsResponse>;
  subscribeByCompetitions(
    requestDto: CompetitionsSubscriptionRequestDto,
  ): Promise<CompetitionsSubscriptionCollectionResponse>;
}
