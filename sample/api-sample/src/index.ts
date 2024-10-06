import {
  CustomersApiFactory,
  HttpResponsePayloadDto,
  IStartResponseBody,
  IStatusResponseBody,
  IStopResponseBody,
  ValidationError,
} from 'trade360-nodejs-sdk';

import _ from 'lodash';

import { getConfig } from './config';

// Load configuration
const config = getConfig();

let logger = console;

const initApiSample = async () => {
  try {
    const customersApiFactory = new CustomersApiFactory();

    const packageDistributionApi = customersApiFactory.createPackageDistributionHttpClient({
      packageCredentials: config.trade360.inPlayMQSettings,
      baseUrl: config.trade360.customersApiBaseUrl,
      logger,
    });

    process.on('exit' || 'SIGINT', async (err) => {
      process.exit(1);
    });

    const distributionStatus: HttpResponsePayloadDto<IStatusResponseBody> | undefined =
      await packageDistributionApi.getDistributionStatus<IStatusResponseBody>();

    if (!_.isNil(distributionStatus) && !_.isNil(distributionStatus.Body)) {
      const {
        Header: { HttpStatusCode: httpStatusCode },
        Body: { IsDistributionOn: isDistributionOn },
      } = distributionStatus;

      if (httpStatusCode >= 200 && httpStatusCode < 300 && !isDistributionOn) {
        const startRequest: HttpResponsePayloadDto<IStartResponseBody> | undefined =
          await packageDistributionApi.startDistribution<IStartResponseBody>();

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
      await packageDistributionApi.stopDistribution<IStopResponseBody>();

    if (!_.isNil(stopRequest) && !_.isNil(stopRequest.Body)) logger.log(stopRequest.Body.Message);
  } catch (err: any) {
    if (err instanceof ValidationError) {
      logger.error(`API sample got err from ValidationError instance: ${err}`);

      if (!_.isNil(err.context) && typeof err.context == 'object') {
        _.each(err.context, (value, key) => {
          logger.error(`Error [${key}]: ${JSON.stringify(value)}`);
        });
      }
    }
  }
};

initApiSample();
