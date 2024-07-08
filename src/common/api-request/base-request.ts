import { AxiosService } from ".";
import { ITrade360RequestBody } from "..";

export class BaseRequest {
  protected axiosService: AxiosService<ITrade360RequestBody> | undefined;

  constructor(
    private baseUrl: string,
    protected requestSettings: ITrade360RequestBody,
    protected logger: Console
  ) {
    this.axiosService = new AxiosService(baseUrl);
  }

  public sendRequest = async <R>(route: string) => {
    const { PackageId, UserName, Password } = this.requestSettings;

    await this.axiosService?.post<R>(route, {
      PackageId,
      UserName,
      Password,
    });
  };
}
