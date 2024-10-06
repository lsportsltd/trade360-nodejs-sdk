import { HttpRequestDto, IHttpServiceConfig } from '@api/common';

import { AxiosService } from '@httpClient/services';
import { RequestSettingsValidator } from '@httpClient/vaildators';

import { ILogger } from '@logger';

export class BaseHttpClient {
  protected axiosService: AxiosService<HttpRequestDto>;

  protected baseUrl: string;

  protected requestSettings: HttpRequestDto;

  protected logger?: ILogger;

  constructor({ baseUrl, packageCredentials, logger }: IHttpServiceConfig) {
    this.requestSettings = RequestSettingsValidator.validate({ baseUrl, ...packageCredentials });

    this.logger = logger;

    this.baseUrl = encodeURI(baseUrl!);

    this.axiosService = new AxiosService<HttpRequestDto>(this.baseUrl);
  }

  /**
   * basic POST request, with body contains packageId, userName and password.
   * The request expect getting generic type R which declare the expected response structure.
   * @param route string that represent the route expected to be sent to
   * @returns  promise with the TResponse type response type
   */
  public async sendRequest<TResponse>(route: string): Promise<TResponse> {
    const { packageId, username, password } = this.requestSettings;

    return this.axiosService?.post<TResponse>(route, {
      packageId,
      username,
      password,
    });
  }
}
