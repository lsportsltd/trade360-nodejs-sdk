import { IHttpServiceConfig, IMapper } from '@api/common';
import { SubscriptionRoutesPrefixUrl } from '@customers-api/enums';
import { ISubscriptionHttpClient } from '@customers-api/interfaces';
import { BaseHttpClient } from '@httpClient';
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
  LeaguesSubscriptionCollectionResponse,
  PackageQuotaResponse,
  SubscriptionsCollectionResponse,
} from '@subscription-api/responses';

const {
  GET_PACKAGE_QUOTA_PREFIX_URL,
  GET_FIXTURES_SCHEDULE_PREFIX_URL,
  SUBSCRIBE_BY_FIXTURES_PREFIX_URL,
  UNSUBSCRIBE_BY_FIXTURE_PREFIX_URL,
  SUBSCRIBE_BY_LEAGUES_PREFIX_URL,
  UNSUBSCRIBE_BY_LEAGUES_PREFIX_URL,
  GET_FIXTURES_SUBSCRIPTION_PREFIX_URL,
  SUBSCRIBE_BY_COMPETITIONS_PREFIX_URL,
  UNSUBSCRIBE_BY_COMPETITIONS_PREFIX_URL,
  GET_ALL_MANUAL_SUSPENSIONS_PREFIX_URL,
  ADD_MANUAL_SUSPENSIONS_PREFIX_URL,
  REMOVE_MANUAL_SUSPENSIONS_PREFIX_URL,
  GET_FIXTURES_METADATA_SUBSCRIPTIONS_PREFIX_URL,
} = SubscriptionRoutesPrefixUrl;

/**
 * SubscriptionHttpClient class is responsible for sending requests
 * to the subscription API. It is a HTTP client for the subscription
 * API. It contains the logic for sending requests to the subscription
 * API.
 * @param restApiBaseUrl The base URL of the customers API
 * @param packageCredentials The package credentials for the API
 * @param logger The logger instance
 * @param mapper The mapper instance
 * @returns A new instance of the SubscriptionHttpClient class with
 * the provided HTTP service configuration and mapper.
 * @implements ISubscriptionHttpClient interface for sending requests
 * to the subscription API and getting responses from the subscription
 * API.
 * @see ISubscriptionHttpClient interface for sending requests to the
 * subscription API and getting responses from the subscription API.
 * @see BaseHttpClient class for sending requests to the customers API.
 *
 */
export class SubscriptionHttpClient extends BaseHttpClient implements ISubscriptionHttpClient {
  private readonly mapper: IMapper;

  constructor(
    { packageCredentials, restApiBaseUrl, logger }: IHttpServiceConfig,
    mapper: IMapper,
  ) {
    super({ restApiBaseUrl, packageCredentials, logger });
    this.mapper = mapper;
  }

  /**
   * Sends a request to the subscription API to get the package
   * quota information.
   * @returns A promise that resolves to a PackageQuotaResponse
   * object containing the package quota information.
   */
  public async getPackageQuota(): Promise<PackageQuotaResponse | undefined> {
    const packageQuota = await this.postRequest<PackageQuotaResponse>({
      route: GET_PACKAGE_QUOTA_PREFIX_URL,
      responseBodyType: PackageQuotaResponse,
    });

    return packageQuota;
  }

  /**
   * Sends a request to the subscription API to get the fixtures schedule.
   * @param requestDto The request DTO for getting the fixtures schedule.
   * @returns A promise that resolves to a FixtureScheduleCollectionResponse
   *  object containing the fixture schedule information.
   */
  public async getFixturesSchedule(
    requestDto: GetFixtureScheduleRequestDto,
  ): Promise<FixtureScheduleCollectionResponse | undefined> {
    const request = this.mapper.map<GetFixtureScheduleRequestDto, GetFixtureScheduleRequest>(
      requestDto,
      GetFixtureScheduleRequest,
    );

    const fixturesScheduleCollection = await this.postRequest<FixtureScheduleCollectionResponse>({
      route: GET_FIXTURES_SCHEDULE_PREFIX_URL,
      responseBodyType: FixtureScheduleCollectionResponse,
      requestBody: request,
    });

    return fixturesScheduleCollection;
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
  ): Promise<FixturesSubscriptionCollectionResponse | undefined> {
    const request = this.mapper.map<GetFixtureScheduleRequestDto, GetFixtureScheduleRequest>(
      requestDto,
      GetFixtureScheduleRequest,
    );

    const fixturesSubscriptionResponse =
      await this.postRequest<FixturesSubscriptionCollectionResponse>({
        route: SUBSCRIBE_BY_FIXTURES_PREFIX_URL,
        responseBodyType: FixturesSubscriptionCollectionResponse,
        requestBody: request,
      });

    return fixturesSubscriptionResponse;
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
  ): Promise<FixturesSubscriptionCollectionResponse | undefined> {
    const request = this.mapper.map<GetFixtureScheduleRequestDto, GetFixtureScheduleRequest>(
      requestDto,
      GetFixtureScheduleRequest,
    );

    const fixturesUnSubscriptionsResponse =
      await this.postRequest<FixturesSubscriptionCollectionResponse>({
        route: UNSUBSCRIBE_BY_FIXTURE_PREFIX_URL,
        responseBodyType: FixturesSubscriptionCollectionResponse,
        requestBody: request,
      });

    return fixturesUnSubscriptionsResponse;
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
  ): Promise<LeaguesSubscriptionCollectionResponse | undefined> {
    const request = this.mapper.map<LeaguesSubscriptionRequestDto, LeaguesSubscriptionRequest>(
      requestDto,
      LeaguesSubscriptionRequest,
    );

    const leaguesSubscriptionResponse =
      await this.postRequest<LeaguesSubscriptionCollectionResponse>({
        route: SUBSCRIBE_BY_LEAGUES_PREFIX_URL,
        responseBodyType: LeaguesSubscriptionCollectionResponse,
        requestBody: request,
      });

    return leaguesSubscriptionResponse;
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
  ): Promise<LeaguesSubscriptionCollectionResponse | undefined> {
    const request = this.mapper.map<LeaguesSubscriptionRequestDto, LeaguesSubscriptionRequest>(
      requestDto,
      LeaguesSubscriptionRequest,
    );

    const leaguesUnSubscriptionResponse =
      await this.postRequest<LeaguesSubscriptionCollectionResponse>({
        route: UNSUBSCRIBE_BY_LEAGUES_PREFIX_URL,
        responseBodyType: LeaguesSubscriptionCollectionResponse,
        requestBody: request,
      });

    return leaguesUnSubscriptionResponse;
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
  ): Promise<SubscriptionsCollectionResponse | undefined> {
    const request = this.mapper.map<GetSubscriptionsRequestDto, GetSubscriptionsRequest>(
      requestDto,
      GetSubscriptionsRequest,
    );

    const fixturesSubscriptionsCollection = await this.postRequest<SubscriptionsCollectionResponse>(
      {
        route: GET_FIXTURES_SUBSCRIPTION_PREFIX_URL,
        responseBodyType: SubscriptionsCollectionResponse,
        requestBody: request,
      },
    );

    return fixturesSubscriptionsCollection;
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
  ): Promise<CompetitionsSubscriptionCollectionResponse | undefined> {
    const request = this.mapper.map<
      CompetitionsSubscriptionRequestDto,
      CompetitionsSubscriptionRequest
    >(requestDto, CompetitionsSubscriptionRequest);

    const competitionsSubscriptionResponse =
      await this.postRequest<CompetitionsSubscriptionCollectionResponse>({
        route: SUBSCRIBE_BY_COMPETITIONS_PREFIX_URL,
        responseBodyType: CompetitionsSubscriptionCollectionResponse,
        requestBody: request,
      });

    return competitionsSubscriptionResponse;
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
  ): Promise<CompetitionsSubscriptionCollectionResponse | undefined> {
    const request = this.mapper.map<
      CompetitionsSubscriptionRequestDto,
      CompetitionsSubscriptionRequest
    >(requestDto, CompetitionsSubscriptionRequest);

    const competitionsUnSubscriptionResponse =
      await this.postRequest<CompetitionsSubscriptionCollectionResponse>({
        route: UNSUBSCRIBE_BY_COMPETITIONS_PREFIX_URL,
        responseBodyType: CompetitionsSubscriptionCollectionResponse,
        requestBody: request,
      });

    return competitionsUnSubscriptionResponse;
  }

  /**
   * Sends a request to the subscription API to get all manual suspensions.
   * @returns A promise that resolves to a GetManualSuspensionsResponse object
   * containing the manual suspensions information.
   */
  public async getAllManualSuspensions(): Promise<GetManualSuspensionsResponse | undefined> {
    const allManualSuspensionsCollection = await this.postRequest<GetManualSuspensionsResponse>({
      route: GET_ALL_MANUAL_SUSPENSIONS_PREFIX_URL,
      responseBodyType: GetManualSuspensionsResponse,
    });

    return allManualSuspensionsCollection;
  }

  /**
   * Sends a request to the subscription API to add manual suspensions.
   * @param requestDto The request DTO for adding manual suspensions.
   * @returns A promise that resolves to a ChangeManualSuspensionsResponse
   * object containing the manual suspensions information.
   */
  public async addManualSuspensions(
    requestDto: ChangeManualSuspensionsRequestDto,
  ): Promise<ChangeManualSuspensionsResponse | undefined> {
    const request = this.mapper.map<
      ChangeManualSuspensionsRequestDto,
      ChangeManualSuspensionsRequest
    >(requestDto, ChangeManualSuspensionsRequest);

    const activatedManualSuspensionsResponse =
      await this.postRequest<ChangeManualSuspensionsResponse>({
        route: ADD_MANUAL_SUSPENSIONS_PREFIX_URL,
        responseBodyType: ChangeManualSuspensionsResponse,
        requestBody: request,
      });

    return activatedManualSuspensionsResponse;
  }

  /**
   * Sends a request to the subscription API to remove manual suspensions.
   * @param requestDto The request DTO for removing manual suspensions.
   * @returns A promise that resolves to a ChangeManualSuspensionsResponse
   * object containing the manual suspensions information.
   */
  public async removeManualSuspensions(
    requestDto: ChangeManualSuspensionsRequestDto,
  ): Promise<ChangeManualSuspensionsResponse | undefined> {
    const request = this.mapper.map<
      ChangeManualSuspensionsRequestDto,
      ChangeManualSuspensionsRequest
    >(requestDto, ChangeManualSuspensionsRequest);

    const deactivateManualSuspensionsResponse =
      await this.postRequest<ChangeManualSuspensionsResponse>({
        route: REMOVE_MANUAL_SUSPENSIONS_PREFIX_URL,
        responseBodyType: ChangeManualSuspensionsResponse,
        requestBody: request,
      });

    return deactivateManualSuspensionsResponse;
  }

  /**
   * Sends a request to the subscription API to get fixtures metadata
   * subscriptions. It sends a
   * GET request to API and FixturesMetadataCollectionResponse as the
   * response type. The request contains the properties for the
   * request to get fixture metadata from the API. The response will
   * automatically trim and provide data only for the configured
   * upcoming duration if the date range is more than configured max
   * duration.
   * @returns A promise that resolves to a
   * FixturesMetadataSubscriptionsCollectionResponse object containing
   * the fixtures metadata subscriptions information.
   */
  public async getFixturesMetadataSubscriptions(
    requestDto: FixturesMetadataSubscriptionsRequestDto,
  ): Promise<FixturesMetadataSubscriptionsCollectionResponse | undefined> {
    const request = this.mapper.map<
      FixturesMetadataSubscriptionsRequestDto,
      FixturesMetadataSubscriptionsRequest
    >(requestDto, FixturesMetadataSubscriptionsRequest);

    const fixturesMetadataSubscriptionsCollection =
      await this.getRequest<FixturesMetadataSubscriptionsCollectionResponse>({
        route: GET_FIXTURES_METADATA_SUBSCRIPTIONS_PREFIX_URL,
        responseBodyType: FixturesMetadataSubscriptionsCollectionResponse,
        requestBody: request,
      });

    return fixturesMetadataSubscriptionsCollection;
  }
}
