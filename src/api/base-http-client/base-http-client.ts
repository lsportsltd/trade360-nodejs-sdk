import { HttpRequestDto } from "../common";
import { AxiosService } from "./services";
import { RequestSettingsValidator } from "./vaildators";

export class BaseHttpClient {
  protected axiosService: AxiosService<HttpRequestDto> | undefined;

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
  public sendRequest = async <R>(route: string) => {
    const { PackageId, UserName, Password } = this.requestSettings;

    return await this.axiosService?.post<R>(route, {
      PackageId,
      UserName,
      Password,
    });
  };
}
