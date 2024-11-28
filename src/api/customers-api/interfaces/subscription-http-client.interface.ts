import {
  ChangeManualSuspensionsRequestDto,
  CompetitionsSubscriptionRequestDto,
  FixturesMetadataSubscriptionsRequestDto,
  FixturesSubscriptionRequestDto,
  GetFixtureScheduleRequestDto,
  GetSubscriptionsRequestDto,
  LeaguesSubscriptionRequestDto,
} from '@subscription-api/dtos';
import {
  ChangeManualSuspensionsResponse,
  CompetitionsSubscriptionCollectionResponse,
  FixtureScheduleCollectionResponse,
  FixturesMetadataSubscriptionsCollectionResponse,
  FixturesSubscriptionCollectionResponse,
  GetManualSuspensionsResponse,
  SubscriptionsCollectionResponse,
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
  getPackageQuota(): Promise<PackageQuotaResponse | undefined>;
  getFixturesSchedule(
    requestDto: GetFixtureScheduleRequestDto,
  ): Promise<FixtureScheduleCollectionResponse | undefined>;
  subscribeByFixtures(
    requestDto: FixturesSubscriptionRequestDto,
  ): Promise<FixturesSubscriptionCollectionResponse | undefined>;
  unSubscribeByFixtures(
    requestDto: FixturesSubscriptionRequestDto,
  ): Promise<FixturesSubscriptionCollectionResponse | undefined>;
  subscribeByLeagues(
    requestDto: LeaguesSubscriptionRequestDto,
  ): Promise<LeaguesSubscriptionCollectionResponse | undefined>;
  unSubscribeByLeagues(
    requestDto: LeaguesSubscriptionRequestDto,
  ): Promise<LeaguesSubscriptionCollectionResponse | undefined>;
  subscribeByCompetitions(
    requestDto: CompetitionsSubscriptionRequestDto,
  ): Promise<CompetitionsSubscriptionCollectionResponse | undefined>;
  unSubscribeByCompetitions(
    requestDto: CompetitionsSubscriptionRequestDto,
  ): Promise<CompetitionsSubscriptionCollectionResponse | undefined>;
  getSubscriptions(
    requestDto: GetSubscriptionsRequestDto,
  ): Promise<SubscriptionsCollectionResponse | undefined>;
  getFixturesMetadataSubscriptions(
    requestDto: FixturesMetadataSubscriptionsRequestDto,
  ): Promise<FixturesMetadataSubscriptionsCollectionResponse | undefined>;
  getAllManualSuspensions(): Promise<GetManualSuspensionsResponse | undefined>;
  addManualSuspensions(
    requestDto: ChangeManualSuspensionsRequestDto,
  ): Promise<ChangeManualSuspensionsResponse | undefined>;
  removeManualSuspensions(
    requestDto: ChangeManualSuspensionsRequestDto,
  ): Promise<ChangeManualSuspensionsResponse | undefined>;
}
