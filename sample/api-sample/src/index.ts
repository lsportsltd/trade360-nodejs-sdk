import {
  CustomersApiFactory,
  HttpResponsePayloadDto,
  IMetadataHttpClient,
  StartResponseBody,
  StatusResponseBody,
  StopResponseBody,
  ValidationError,
} from 'trade360-nodejs-sdk';

import _, { each } from 'lodash';

import { getConfig } from './config';

// Load configuration
const config = getConfig();

let logger = console;

const initApiSample = async () => {
  try {
    const customersApiFactory = new CustomersApiFactory();

    const metadataHttpClient = customersApiFactory.createMetadataHttpClient({
      packageCredentials: config.trade360.inPlayMQSettings,
      customersApiBaseUrl: config.trade360.customersApiBaseUrl,
      logger,
    });

    await getLocations(metadataHttpClient);

    await getSports(metadataHttpClient);

    const packageDistributionHttpClient = customersApiFactory.createPackageDistributionHttpClient({
      packageCredentials: config.trade360.inPlayMQSettings,
      customersApiBaseUrl: config.trade360.customersApiBaseUrl,
      logger,
    });

    process.on('exit' || 'SIGINT', async () => {
      process.exit(1);
    });

    const distributionStatus: HttpResponsePayloadDto<StatusResponseBody> | undefined =
      await packageDistributionHttpClient.getDistributionStatus<StatusResponseBody>(
        StatusResponseBody,
      );

    if (!_.isNil(distributionStatus) && !_.isNil(distributionStatus.body)) {
      const {
        header: { httpStatusCode },
        body: { isDistributionOn },
      } = distributionStatus;

      if (httpStatusCode >= 200 && httpStatusCode < 300 && !isDistributionOn) {
        const startRequest: HttpResponsePayloadDto<StartResponseBody> | undefined =
          await packageDistributionHttpClient.startDistribution<StartResponseBody>(
            StartResponseBody,
          );

        if (!_.isNil(startRequest) && !_.isNil(startRequest.body))
          logger.log(startRequest.body.message);
      }
    }

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        return resolve();
      }, 5 * 1000);
    });

    const stopRequest: HttpResponsePayloadDto<StopResponseBody> | undefined =
      await packageDistributionHttpClient.stopDistribution<StopResponseBody>(StopResponseBody);

    if (!_.isNil(stopRequest) && !_.isNil(stopRequest.body)) logger.log(stopRequest.body.message);
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      logger.error(`API sample got err from ValidationError instance: ${err}`);

      if (!_.isNil(err.context) && typeof err.context == 'object') {
        _.each(err.context, (value, key) => {
          logger.error(`Error [${key}]: ${JSON.stringify(value)}`);
        });
      }
    }
    logger.error(`API sample got err: ${err}`);
    throw err;
  }
};

const getLocations = async (metadataHttpClient: IMetadataHttpClient) => {
  const response = await metadataHttpClient.getLocations();

  logger.log('Locations entities received:');

  each(response, (location) => {
    logger.log(`LocationId: ${location.id}, LocationName: ${location.name}`);
  });
};

const getSports = async (metadataHttpClient: IMetadataHttpClient) => {
  const response = await metadataHttpClient.getSports();

  logger.log('Sports entities received:');

  each(response, (sport) => {
    logger.log(`SportId: ${sport.id}, SportName: ${sport.name}`);
  });
};

initApiSample();
