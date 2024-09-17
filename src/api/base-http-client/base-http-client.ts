import { HttpRequestDto } from '@api/common';

import { AxiosService } from './services';
import { RequestSettingsValidator } from './vaildators';
import { ILogger } from '@logger';

export class BaseHttpClient {
  protected axiosService: AxiosService<HttpRequestDto>;

  constructor(
    private baseUrl: string,
    protected requestSettings: HttpRequestDto,
    protected logger: ILogger,
  ) {
    RequestSettingsValidator.validate(this.requestSettings);

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
