import { BaseRequest } from ".";
import {
  ITrade360Request,
  ITrade360RequestBody,
  ITrade360ResponsePayload,
} from "..";
import {
  AxiosService,
  START_PREFIX_URL,
  STATUS_PREFIX_URL,
  STOP_PREFIX_URL,
  TRADE360_BASE_URL,
} from "../../feed/entities";

export class Trade360Request extends BaseRequest implements ITrade360Request {
  constructor(requestSettings: ITrade360RequestBody, logger: Console) {
    super(TRADE360_BASE_URL, requestSettings, logger);
  }

  postRequest = async () => {
    this.logger.log("run post request...");
  };

  startDistribution = async () => {
    this.logger.log("run start request...");
    // await this.sendRequest<ITrade360ResponsePayload>(START_PREFIX_URL);
  };

  stopDistribution = async () => {
    this.logger.log("run stop request...");
    // await this.sendRequest<ITrade360ResponsePayload>(STOP_PREFIX_URL);
  };

  getDistributionStatus = async () => {
    this.logger.log("run status request...");

    // return;
    const res = await this.sendRequest<ITrade360ResponsePayload>(STATUS_PREFIX_URL);

    const {
      Header: { HttpStatusCode: httpStatusCode },
    } = res!;

    if (httpStatusCode >= 200 && httpStatusCode < 300) {
      const {
        Body: { IsDistributionOn: isDistributionOn },
      } = res!;

      return isDistributionOn;
    }
    // handle errors
    else return false;
  };
}
