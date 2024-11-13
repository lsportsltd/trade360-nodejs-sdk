import { BaseHttpClient } from '@httpClient';
import { IHttpServiceConfig, IMapper } from '@api/common';
import { ISubscriptionHttpClient } from '@customers-api/interfaces';
import { SubscriptionRoutesPrefixUrl } from '@customers-api/enums';
import {
  FixturesSubscriptionRequestDto,
  GetFixtureScheduleRequestDto,
} from '@subscription-api/dtos';
import { GetFixtureScheduleRequest } from '@subscription-api/requests';
import {
  FixtureScheduleCollectionResponse,
  FixturesSubscriptionCollectionResponse,
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
   * Sends a request to the subscription API to get the package quota information.
   * @returns A promise that resolves to a PackageQuotaResponse object
   * containing the package quota information.
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
   * @returns A promise that resolves to a FixtureScheduleCollectionResponse object
   * containing the fixture schedule information.
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
   * @returns A promise that resolves to a FixturesSubscriptionCollectionResponse object
   * containing the fixtures subscription information.
   */
  public async subscribeByFixtures(
    requestDto: FixturesSubscriptionRequestDto,
  ): Promise<FixturesSubscriptionCollectionResponse> {
    const request = this.mapper.map<GetFixtureScheduleRequestDto, GetFixtureScheduleRequest>(
      requestDto,
      GetFixtureScheduleRequest,
    );

    const fixturesSubscriptionCollection =
      await this.postRequest<FixturesSubscriptionCollectionResponse>(
        SubscriptionRoutesPrefixUrl.SUBSCRIBE_BY_FIXTURES_PREFIX_URL,
        FixturesSubscriptionCollectionResponse,
        request,
      );

    return fixturesSubscriptionCollection?.body || {};
  }
}
