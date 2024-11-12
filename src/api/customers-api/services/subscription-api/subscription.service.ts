import { BaseHttpClient } from '@httpClient';
import { GetFixtureScheduleRequest, IHttpServiceConfig, IMapper } from '@api/common';
import { ISubscriptionHttpClient } from '@customers-api/interfaces';
import { SubscriptionRoutesPrefixUrl } from '@customers-api/enums';
import { GetFixtureScheduleRequestDto } from '@subscription-api/dtos';
import {
  FixtureScheduleCollectionResponse,
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
   * Sends a request to the subscription API to get the fixture schedule.
   * @param requestDto The request DTO for getting the fixture schedule.
   * @returns A promise that resolves to a FixtureScheduleCollectionResponse object
   * containing the fixture schedule information.
   */
  public async getFixtureSchedule(
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
}
