import {
  DistributionRequest,
  HttpRequestDto,
  HttpResponsePayloadDto,
  IStartResponseBody,
  IStatusResponseBody,
  IStopResponseBody,
} from "trade360-nodejs-sdk";

import _ from "lodash";

import { getConfig } from "./config";

// Load configuration
const config = getConfig();

let logger = console;

const initApiSample = async () => {
  const requestApi: DistributionRequest = new DistributionRequest(
    config.Trade360.InplayMQSettings as HttpRequestDto,
    logger
  );

  process.on("exit" || "SIGINT", async (err) => {
    await requestApi.stopDistribution();
    process.exit(1);
  });

  const distributionStatus:
    | HttpResponsePayloadDto<IStatusResponseBody>
    | undefined = await requestApi.getDistributionStatus<IStatusResponseBody>();

  if (!_.isNil(distributionStatus) && !_.isNil(distributionStatus.Body)) {
    const {
      Header: { HttpStatusCode: httpStatusCode },
      Body: { IsDistributionOn: isDistributionOn },
    } = distributionStatus;

    if (httpStatusCode >= 200 && httpStatusCode < 300 && !isDistributionOn) {
      const startRequest:
        | HttpResponsePayloadDto<IStartResponseBody>
        | undefined = await requestApi.startDistribution<IStartResponseBody>();

      if (!_.isNil(startRequest) && !_.isNil(startRequest.Body))
        logger.log(startRequest.Body.Message);
    }
  }

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      return resolve();
    }, 5 * 1000);
  });

  const stopRequest: HttpResponsePayloadDto<IStopResponseBody> | undefined =
    await requestApi.stopDistribution<IStopResponseBody>();

  if (!_.isNil(stopRequest) && !_.isNil(stopRequest.Body))
    logger.log(stopRequest.Body.Message);
};

initApiSample();
