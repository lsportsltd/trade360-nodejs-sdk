import { isNil } from "lodash";

import {
  DistributionRequest,
  HttpRequestDto,
  HttpResponsePayloadDto,
  IStartResponseBody,
  IStatusResponseBody,
  IStopResponseBody,
} from "@api";
import { TransformerUtil } from "@lsports/entities";

export class DistributionUtil {
  private static requestApi?: DistributionRequest;
  private static logger?: Console;

  private static delayMs = 2000;

  constructor(settings: HttpRequestDto, logger: Console) {
    DistributionUtil.requestApi = new DistributionRequest(
      TransformerUtil.deserialize(settings, HttpRequestDto),
      (DistributionUtil.logger = logger)
    );
  }

  static checkStatus = async () => {
    if (isNil(DistributionUtil.requestApi))
      throw new Error("initialize distribution api first!");

    const distributionStatus:
      | HttpResponsePayloadDto<IStatusResponseBody>
      | undefined =
      await DistributionUtil.requestApi.getDistributionStatus<IStatusResponseBody>();

    if (!isNil(distributionStatus) && !isNil(distributionStatus.Body)) {
      const {
        Header: { HttpStatusCode: httpStatusCode },
        Body: { IsDistributionOn: isDistributionOn },
      } = distributionStatus;

      return { httpStatusCode, isDistributionOn };
    }
  };

  static start = async () => {
    if (isNil(DistributionUtil.requestApi))
      throw new Error("initialize distribution api first!");

    const startRequest: HttpResponsePayloadDto<IStartResponseBody> | undefined =
      await DistributionUtil.requestApi.startDistribution<IStartResponseBody>();

    if (!isNil(startRequest) && !isNil(startRequest.Body))
      DistributionUtil.logger?.log(startRequest.Body.Message);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        return resolve();
      }, DistributionUtil.delayMs);
    });
  };

  static stop = async () => {
    if (isNil(DistributionUtil.requestApi))
      throw new Error("initialize distribution api first!");

    const stopRequest: HttpResponsePayloadDto<IStopResponseBody> | undefined =
      await DistributionUtil.requestApi.stopDistribution<IStopResponseBody>();

    if (!isNil(stopRequest) && !isNil(stopRequest.Body))
      DistributionUtil.logger?.log(stopRequest.Body.Message);
  };
}
