import { BaseHttpClient } from '@httpClient';
import { IHttpServiceConfig, IMapper } from '@api/common';
import { ISubscriptionHttpClient } from '@customers-api/interfaces';
import { SubscriptionRoutesPrefixUrl } from '@customers-api/enums';
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
  ChangeManualSuspensionsRequest,
  CompetitionsSubscriptionRequest,
  FixturesMetadataSubscriptionsRequest,
  GetFixtureScheduleRequest,
  GetSubscriptionsRequest,
  LeaguesSubscriptionRequest,
} from '@subscription-api/requests';
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
 * SubscriptionHttpClient class is responsible for sending requests
 * to the subscription API. It is a HTTP client for the subscription API.
 * It contains the logic for sending requests to the subscription API.
 * @param customersApiBaseUrl The base URL of the customers API
 * @param packageCredentials The package credentials for the API
 * @param logger The logger instance
 * @param mapper The mapper instance
 * @returns A new instance of the SubscriptionHttpClient class with the
 * provided HTTP service configuration and mapper.
 * @implements ISubscriptionHttpClient interface for sending requests to
 * the subscription API and getting responses from the subscription API.
 * @see ISubscriptionHttpClient interface for sending requests to the
 * subscription API and getting responses from the subscription API.
 * @see BaseHttpClient class for sending requests to the customers API.
 *
 */
export class SubscriptionHttpClient extends BaseHttpClient implements ISubscriptionHttpClient {
  private readonly mapper: IMapper;

  constructor(
    { packageCredentials, customersApiBaseUrl, logger }: IHttpServiceConfig,
    mapper: IMapper,
  ) {
    super({ customersApiBaseUrl, packageCredentials, logger });
    this.mapper = mapper;
  }

  /**
   * Sends a request to the subscription API to get the package
   * quota information.
   * @returns A promise that resolves to a PackageQuotaResponse
   * object containing the package quota information.
   */
  public async getPackageQuota(): Promise<PackageQuotaResponse> {
    const packageQuota = await this.postRequest<PackageQuotaResponse>(
      SubscriptionRoutesPrefixUrl.GET_PACKAGE_QUOTA_PREFIX_URL,
      PackageQuotaResponse,
    );

    return packageQuota?.body || {};
  }

  /**
   * Sends a request to the subscription API to get the fixtures schedule.
   * @param requestDto The request DTO for getting the fixtures schedule.
   * @returns A promise that resolves to a
   * FixtureScheduleCollectionResponse object containing the fixture
   * schedule information.
   */
  public async getFixturesSchedule(
    requestDto: GetFixtureScheduleRequestDto,
  ): Promise<FixtureScheduleCollectionResponse> {
    const request = this.mapper.map<GetFixtureScheduleRequestDto, GetFixtureScheduleRequest>(
      requestDto,
      GetFixtureScheduleRequest,
    );

    const fixturesScheduleCollection = await this.postRequest<FixtureScheduleCollectionResponse>(
      SubscriptionRoutesPrefixUrl.GET_FIXTURES_SCHEDULE_PREFIX_URL,
      FixtureScheduleCollectionResponse,
      request,
    );

    return fixturesScheduleCollection?.body || {};
  }

  /**
   * Sends a request to the subscription API to subscribe to fixtures.
   * @param requestDto The request DTO for subscribing to fixtures.
   * @returns A promise that resolves to a
   * FixturesSubscriptionCollectionResponse object containing the
   * fixtures subscription information.
   */
  public async subscribeByFixtures(
    requestDto: FixturesSubscriptionRequestDto,
  ): Promise<FixturesSubscriptionCollectionResponse> {
    const request = this.mapper.map<GetFixtureScheduleRequestDto, GetFixtureScheduleRequest>(
      requestDto,
      GetFixtureScheduleRequest,
    );

    const fixturesSubscriptionResponse =
      await this.postRequest<FixturesSubscriptionCollectionResponse>(
        SubscriptionRoutesPrefixUrl.SUBSCRIBE_BY_FIXTURES_PREFIX_URL,
        FixturesSubscriptionCollectionResponse,
        request,
      );

    return fixturesSubscriptionResponse?.body || {};
  }

  /**
   * Sends a request to the subscription API to unsubscribe from fixtures.
   * @param requestDto The request DTO for unsubscribing from fixtures.
   * @returns A promise that resolves to a
   * FixturesSubscriptionCollectionResponse object containing the
   * fixtures unsubscription information.
   */
  public async unSubscribeByFixtures(
    requestDto: FixturesSubscriptionRequestDto,
  ): Promise<FixturesSubscriptionCollectionResponse> {
    const request = this.mapper.map<GetFixtureScheduleRequestDto, GetFixtureScheduleRequest>(
      requestDto,
      GetFixtureScheduleRequest,
    );

    const fixturesUnSubscriptionsResponse =
      await this.postRequest<FixturesSubscriptionCollectionResponse>(
        SubscriptionRoutesPrefixUrl.UNSUBSCRIBE_BY_FIXTURE_PREFIX_URL,
        FixturesSubscriptionCollectionResponse,
        request,
      );

    return fixturesUnSubscriptionsResponse?.body || {};
  }

  /**
   * Sends a request to the subscription API to subscribe to leagues.
   * @param requestDto The request DTO for subscribing to leagues.
   * @returns A promise that resolves to a
   * LeaguesSubscriptionCollectionResponse object containing the
   * leagues subscription information.
   */
  public async subscribeByLeagues(
    requestDto: LeaguesSubscriptionRequestDto,
  ): Promise<LeaguesSubscriptionCollectionResponse> {
    const request = this.mapper.map<LeaguesSubscriptionRequestDto, LeaguesSubscriptionRequest>(
      requestDto,
      LeaguesSubscriptionRequest,
    );

    const leaguesSubscriptionResponse =
      await this.postRequest<LeaguesSubscriptionCollectionResponse>(
        SubscriptionRoutesPrefixUrl.SUBSCRIBE_BY_LEAGUES_PREFIX_URL,
        LeaguesSubscriptionCollectionResponse,
        request,
      );

    return leaguesSubscriptionResponse?.body || {};
  }

  /**
   * Sends a request to the subscription API to unsubscribe from leagues.
   * @param requestDto The request DTO for unsubscribing from leagues.
   * @returns A promise that resolves to a
   * LeaguesSubscriptionCollectionResponse object containing the leagues
   * unsubscription information.
   */
  public async unSubscribeByLeagues(
    requestDto: LeaguesSubscriptionRequestDto,
  ): Promise<LeaguesSubscriptionCollectionResponse> {
    const request = this.mapper.map<LeaguesSubscriptionRequestDto, LeaguesSubscriptionRequest>(
      requestDto,
      LeaguesSubscriptionRequest,
    );

    const leaguesUnSubscriptionResponse =
      await this.postRequest<LeaguesSubscriptionCollectionResponse>(
        SubscriptionRoutesPrefixUrl.UNSUBSCRIBE_BY_LEAGUES_PREFIX_URL,
        LeaguesSubscriptionCollectionResponse,
        request,
      );

    return leaguesUnSubscriptionResponse?.body || {};
  }

  /**
   * Sends a request to the subscription API to get fixtures subscriptions.
   * @param requestDto The request DTO for getting fixtures subscriptions.
   * @returns A promise that resolves to a
   * GetSubscriptionsCollectionResponse object containing the fixtures
   * subscriptions information.
   */
  public async getSubscriptions(
    requestDto: GetSubscriptionsRequestDto,
  ): Promise<SubscriptionsCollectionResponse> {
    const request = this.mapper.map<GetSubscriptionsRequestDto, GetSubscriptionsRequest>(
      requestDto,
      GetSubscriptionsRequest,
    );

    const fixturesSubscriptionsCollection = await this.postRequest<SubscriptionsCollectionResponse>(
      SubscriptionRoutesPrefixUrl.GET_FIXTURES_SUBSCRIPTION_PREFIX_URL,
      SubscriptionsCollectionResponse,
      request,
    );

    return fixturesSubscriptionsCollection?.body || {};
  }

  /**
   * Sends a request to the subscription API to subscribe to competitions.
   * @param requestDto The request DTO for subscribing to competitions.
   * @returns A promise that resolves to a
   * CompetitionsSubscriptionCollectionResponse object containing the
   * competitions subscription information.
   */
  public async subscribeByCompetitions(
    requestDto: CompetitionsSubscriptionRequestDto,
  ): Promise<CompetitionsSubscriptionCollectionResponse> {
    const request = this.mapper.map<
      CompetitionsSubscriptionRequestDto,
      CompetitionsSubscriptionRequest
    >(requestDto, CompetitionsSubscriptionRequest);

    const competitionsSubscriptionResponse =
      await this.postRequest<CompetitionsSubscriptionCollectionResponse>(
        SubscriptionRoutesPrefixUrl.SUBSCRIBE_BY_COMPETITIONS_PREFIX_URL,
        CompetitionsSubscriptionCollectionResponse,
        request,
      );

    return competitionsSubscriptionResponse?.body || {};
  }

  /**
   * Sends a request to the subscription API to unsubscribe from
   * competitions.
   * @param requestDto The request DTO for unsubscribing from competitions.
   * @returns A promise that resolves to a
   * CompetitionsSubscriptionCollectionResponse object containing the
   * competitions unsubscription information from the subscription API.
   */
  public async unSubscribeByCompetitions(
    requestDto: CompetitionsSubscriptionRequestDto,
  ): Promise<CompetitionsSubscriptionCollectionResponse> {
    const request = this.mapper.map<
      CompetitionsSubscriptionRequestDto,
      CompetitionsSubscriptionRequest
    >(requestDto, CompetitionsSubscriptionRequest);

    const competitionsUnSubscriptionResponse =
      await this.postRequest<CompetitionsSubscriptionCollectionResponse>(
        SubscriptionRoutesPrefixUrl.UNSUBSCRIBE_BY_COMPETITIONS_PREFIX_URL,
        CompetitionsSubscriptionCollectionResponse,
        request,
      );

    return competitionsUnSubscriptionResponse?.body || {};
  }

  /**
   * Sends a request to the subscription API to get all manual suspensions.
   * @returns A promise that resolves to a GetManualSuspensionsResponse object
   * containing the manual suspensions information.
   */
  public async getAllManualSuspensions(): Promise<GetManualSuspensionsResponse> {
    const allManualSuspensionsCollection = await this.postRequest<GetManualSuspensionsResponse>(
      SubscriptionRoutesPrefixUrl.GET_ALL_MANUAL_SUSPENSIONS_PREFIX_URL,
      GetManualSuspensionsResponse,
    );

    return allManualSuspensionsCollection?.body || {};
  }

  /**
   * Sends a request to the subscription API to add manual suspensions.
   * @param requestDto The request DTO for adding manual suspensions.
   * @returns A promise that resolves to a ChangeManualSuspensionsResponse object
   * containing the manual suspensions information.
   */
  public async addManualSuspensions(
    requestDto: ChangeManualSuspensionsRequestDto,
  ): Promise<ChangeManualSuspensionsResponse> {
    const request = this.mapper.map<
      ChangeManualSuspensionsRequestDto,
      ChangeManualSuspensionsRequest
    >(requestDto, ChangeManualSuspensionsRequest);

    const activatedManualSuspensionsResponse =
      await this.postRequest<ChangeManualSuspensionsResponse>(
        SubscriptionRoutesPrefixUrl.ADD_MANUAL_SUSPENSIONS_PREFIX_URL,
        ChangeManualSuspensionsResponse,
        request,
      );

    return activatedManualSuspensionsResponse?.body || {};
  }

  /**
   * Sends a request to the subscription API to remove manual suspensions.
   * @param requestDto The request DTO for removing manual suspensions.
   * @returns A promise that resolves to a ChangeManualSuspensionsResponse object
   * containing the manual suspensions information.
   */
  public async removeManualSuspensions(
    requestDto: ChangeManualSuspensionsRequestDto,
  ): Promise<ChangeManualSuspensionsResponse> {
    const request = this.mapper.map<
      ChangeManualSuspensionsRequestDto,
      ChangeManualSuspensionsRequest
    >(requestDto, ChangeManualSuspensionsRequest);

    const deactivateManualSuspensionsResponse =
      await this.postRequest<ChangeManualSuspensionsResponse>(
        SubscriptionRoutesPrefixUrl.REMOVE_MANUAL_SUSPENSIONS_PREFIX_URL,
        ChangeManualSuspensionsResponse,
        request,
      );

    return deactivateManualSuspensionsResponse?.body || {};
  }

  /**
   * Sends a request to the subscription API to get fixtures metadata
   * subscriptions.
   * @returns A promise that resolves to a
   * FixturesMetadataSubscriptionsCollectionResponse object containing
   * the fixtures metadata subscriptions information.
   */
  public async getFixturesMetadataSubscriptions(
    requestDto: FixturesMetadataSubscriptionsRequestDto,
  ): Promise<FixturesMetadataSubscriptionsCollectionResponse> {
    const request = this.mapper.map<
      FixturesMetadataSubscriptionsRequestDto,
      FixturesMetadataSubscriptionsRequest
    >(requestDto, FixturesMetadataSubscriptionsRequest);

    const fixturesMetadataSubscriptionsCollection =
      await this.getRequest<FixturesMetadataSubscriptionsCollectionResponse>(
        SubscriptionRoutesPrefixUrl.GET_FIXTURES_METADATA_SUBSCRIPTION_PREFIX_URL,
        FixturesMetadataSubscriptionsCollectionResponse,
        request,
      );

    return fixturesMetadataSubscriptionsCollection?.body || {};
  }
}
