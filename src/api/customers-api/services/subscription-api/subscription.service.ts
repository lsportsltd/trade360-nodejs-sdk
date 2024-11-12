import { BaseHttpClient } from '@httpClient';
import { IHttpServiceConfig, IMapper } from '@api/common';
import { ISubscriptionHttpClient } from '@customers-api/interfaces';

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
}
