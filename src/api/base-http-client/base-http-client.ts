import { HttpRequestDto, HttpResponsePayloadDto, IHttpServiceConfig } from '@api/common';
import { BaseEntity } from '@entities';

import { AxiosService } from '@httpClient/services';
import { RequestSettingsValidator } from '@httpClient/vaildators';

import { ILogger } from '@logger';

/**
 * BaseHttpClient class is responsible for sending requests to the customers API.
 * It is a base class for all HTTP clients. It contains the basic logic for sending requests.
 */
export class BaseHttpClient {
  protected axiosService: AxiosService<HttpRequestDto>;

  protected baseUrl: string;

  protected requestSettings: HttpRequestDto;

  protected logger?: ILogger;

  constructor({ customersApiBaseUrl, packageCredentials, logger }: IHttpServiceConfig) {
    this.requestSettings = RequestSettingsValidator.validate({
      customersApiBaseUrl,
      ...packageCredentials,
    });

    this.logger = logger;

    this.baseUrl = encodeURI(customersApiBaseUrl!);

    this.axiosService = new AxiosService<HttpRequestDto>(this.baseUrl);
  }

  /**
   * basic POST request, with body contains packageId, userName and password.
   * The request expect getting generic type R which declare the expected response structure.
   * @param route string that represent the route expected to be sent to
   * @returns  promise with the TResponse type response type
   */
  public async sendRequest<TResponse extends BaseEntity>(
    route: string,
    responseBodyType: new () => TResponse,
  ): Promise<HttpResponsePayloadDto<TResponse>> {
    // TODO: check if the request settings are looks good and can be sent without destructuring
    const { packageId, username, password } = this.requestSettings;

    const statusResponsePayloadDto = HttpResponsePayloadDto.createDto(responseBodyType);

    return this.axiosService?.post<TResponse>(
      route,
      {
        packageId,
        username,
        password,
      },
      statusResponsePayloadDto,
    );
  }
}
