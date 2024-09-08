import { HttpRequestDto } from "@api/common";

import { AxiosService } from "./services";
import { RequestSettingsValidator } from "./vaildators";

export class BaseHttpClient {
  protected axiosService: AxiosService<HttpRequestDto>;

  constructor(
    private baseUrl: string,
    protected requestSettings: HttpRequestDto,
    protected logger: Console
  ) {
    RequestSettingsValidator.validate(this.requestSettings);

    this.axiosService = new AxiosService<HttpRequestDto>(this.baseUrl);
  }

  /**
   * basic POST request, with body contains packageId, userName and password.
   * The request expect getting generic type R which declare the expected response structure.
   * @param route string that represent the route expected to be sent to
   * @returns  promise with the R type response type
   */
  public sendRequest = async <TResponse>(route: string) => {
    const { packageId, userName, password } = this.requestSettings;

    return await this.axiosService?.post<TResponse>(route, {
      packageId,
      userName,
      password,
    });
  };
}
