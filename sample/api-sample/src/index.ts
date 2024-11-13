import _ from 'lodash';
import moment from 'moment';

import {
  CustomersApiFactory,
  FixtureScheduleCollectionResponse,
  FixturesMetadataValidationError,
  FixturesSubscriptionCollectionResponse,
  FixturesSubscriptionRequestDto,
  GetCompetitionsRequestDto,
  GetFixtureScheduleRequestDto,
  GetFixturesMetadataRequestDto,
  GetLeaguesRequestDto,
  GetMarketsRequestDto,
  GetTranslationsRequestDto,
  HttpResponseError,
  HttpResponsePayloadDto,
  IMetadataHttpClient,
  ISubscriptionHttpClient,
  InvalidDateInRequestError,
  Sport,
  StartResponseBody,
  StatusResponseBody,
  StopResponseBody,
  SubscriptionState,
  TranslationsValidationError,
  ValidationError,
} from 'trade360-nodejs-sdk';

import { getConfig } from './config';

// Load configuration
const config = getConfig();

let logger = console;

const initApiSample = async () => {
  try {
    const customersApiFactory = new CustomersApiFactory();

    const subscriptionHttpClient = customersApiFactory.createSubscriptionHttpClient({
      packageCredentials: config.trade360.inPlayMQSettings,
      customersApiBaseUrl: config.trade360.customersApiBaseUrl,
      logger,
    });

    // await getPackageQuota(subscriptionHttpClient);

    // await getFixtureSchedule(subscriptionHttpClient);

    await subscribeByFixtures(subscriptionHttpClient);

    // const metadataHttpClient = customersApiFactory.createMetadataHttpClient({
    //   packageCredentials: config.trade360.inPlayMQSettings,
    //   customersApiBaseUrl: config.trade360.customersApiBaseUrl,
    //   logger,
    // });

    // await getLocations(metadataHttpClient);

    // await getSports(metadataHttpClient);

    // await getLeagues(metadataHttpClient);

    // await getMarkets(metadataHttpClient);

    // await getTranslations(metadataHttpClient);

    // await getCompetitions(metadataHttpClient);

    // await getFixturesMetadata(metadataHttpClient);

    // const packageDistributionHttpClient = customersApiFactory.createPackageDistributionHttpClient({
    //   packageCredentials: config.trade360.inPlayMQSettings,
    //   customersApiBaseUrl: config.trade360.customersApiBaseUrl,
    //   logger,
    // });

    process.on('exit' || 'SIGINT', async () => {
      process.exit(1);
    });

    // const distributionStatus: HttpResponsePayloadDto<StatusResponseBody> | undefined =
    //   await packageDistributionHttpClient.getDistributionStatus<StatusResponseBody>(
    //     StatusResponseBody,
    //   );

    // if (!_.isNil(distributionStatus) && !_.isNil(distributionStatus.body)) {
    //   const {
    //     header: { httpStatusCode },
    //     body: { isDistributionOn },
    //   } = distributionStatus;

    //   if (httpStatusCode >= 200 && httpStatusCode < 300 && !isDistributionOn) {
    //     const startRequest: HttpResponsePayloadDto<StartResponseBody> | undefined =
    //       await packageDistributionHttpClient.startDistribution<StartResponseBody>(
    //         StartResponseBody,
    //       );

    //     if (!_.isNil(startRequest) && !_.isNil(startRequest.body))
    //       logger.log(startRequest.body.message);
    //   }
    // }

    // await new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     return resolve();
    //   }, 5 * 1000);
    // });

    // const stopRequest: HttpResponsePayloadDto<StopResponseBody> | undefined =
    //   await packageDistributionHttpClient.stopDistribution<StopResponseBody>(StopResponseBody);

    // if (!_.isNil(stopRequest) && !_.isNil(stopRequest.body)) logger.log(stopRequest.body.message);
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      logger.error(`API sample got err from ValidationError instance: ${err}`);

      if (!_.isNil(err.context) && typeof err.context == 'object') {
        _.each(err.context, (value, key) => {
          logger.error(`Error [${key}]: ${JSON.stringify(value)}`);
        });
      }
    } else if (err instanceof TranslationsValidationError) {
      logger.error(`API sample got err from TranslationsValidationError instance: ${err}`);
    } else if (err instanceof HttpResponseError) {
      logger.error(`API sample got err from HttpResponseError instance: ${err}`);

      let errors = [];

      if (!_.isNil(err.context) && typeof err.context == 'string') {
        errors = [logger.error(`Error [${err.name}]: ${JSON.stringify(err.context)}`)];
      } else if (_.isArray(err.context)) {
        errors = err.context;
      }

      if (typeof err.context == 'object') {
        _.each(err.context, (value, key) => {
          logger.error(`Error [${key}]: ${JSON.stringify(value)}`);
        });
      }
    } else if (err instanceof InvalidDateInRequestError) {
      logger.error(`API sample got err from InvalidDateInRequestError instance: ${err}`);
    } else if (err instanceof FixturesMetadataValidationError) {
      logger.error(`API sample got err from FixturesMetadataValidationError instance: ${err}`);
    } else {
      logger.error(`API sample got err: ${err}`);
    }
  }
};

const getLocations = async (metadataHttpClient: IMetadataHttpClient) => {
  const response = await metadataHttpClient.getLocations();

  logger.log('Locations entities received:');

  _.each(response, (location) => {
    logger.log(`LocationId: ${location.id}, LocationName: ${location.name}`);
  });
};

const getSports = async (metadataHttpClient: IMetadataHttpClient) => {
  const response = await metadataHttpClient.getSports();

  logger.log('Sports entities received:');

  _.each(response, (sport) => {
    logger.log(`SportId: ${sport.id}, SportName: ${sport.name}`);
  });
};

const getLeagues = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  try {
    const sportsResults = await metadataHttpClient.getSports();
    const footballSportEntity = _.find(sportsResults, (x: Sport) => x.name === 'Football');

    if (_.isNil(footballSportEntity)) {
      logger.log('Football sport entity not found.');
      return;
    }

    const request = new GetLeaguesRequestDto({
      sportIds: footballSportEntity.id ? [footballSportEntity.id] : undefined,
    });

    const response = await metadataHttpClient.getLeagues(request);

    logger.log(`Response returned ${response.length} leagues:`);

    _.forEach(response, (league) => {
      logger.log(`LeagueId: ${league.id}, LeagueName: ${league.name}`);
    });
  } catch (error) {
    logger.error('Error fetching leagues:', error);
    throw error;
  }
};

const getMarkets = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  const request = new GetMarketsRequestDto({
    marketIds: [1, 2],
    isSettleable: true,
    sportIds: [6046],
  });

  const response = await metadataHttpClient.getMarkets(request);

  logger.log('Markets entities received:');

  _.each(response, (market) => {
    logger.log(`MarketId: ${market.id}, MarketName: ${market.name}`);
  });
};

const getTranslations = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  const request = new GetTranslationsRequestDto({
    sportIds: [6046],
    languages: [4, 5],
  });

  const { sports, leagues, locations } = await metadataHttpClient.getTranslations(request);

  logger.log(
    `Count of translations received Sports: ${_.keys(sports).length} Translations retrieved.`,
  );

  logger.log(
    `Count of translations received Leagues: ${_.keys(leagues).length} Translations retrieved.`,
  );

  logger.log(
    `Count of translations received Locations: ${_.keys(locations).length} Translations retrieved.`,
  );
};

const getCompetitions = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  const request = new GetCompetitionsRequestDto({
    locationIds: [1],
    subscriptionStatus: SubscriptionState.All,
  });

  const response = await metadataHttpClient.getCompetitions(request);

  logger.log(`${response.competitions?.length} Competitions retrieved.`);
};

const getFixturesMetadata = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  const request = new GetFixturesMetadataRequestDto({
    fromDate: moment(),
    toDate: moment().add(10, 'days'),
  });

  const response = await metadataHttpClient.getFixturesMetadata(request);

  logger.log(`${response.subscribedFixtures?.length} Fixture metadata retrieved.`);
};

const getPackageQuota = async (subscriptionHttpClient: ISubscriptionHttpClient): Promise<void> => {
  const packageQuota = await subscriptionHttpClient.getPackageQuota();

  logger.log(JSON.stringify(packageQuota));
};

const getFixtureSchedule = async (
  subscriptionHttpClient: ISubscriptionHttpClient,
): Promise<void> => {
  const request = new GetFixtureScheduleRequestDto({
    sportIds: [6046],
  });

  const response: FixtureScheduleCollectionResponse =
    await subscriptionHttpClient.getFixturesSchedule(request);

  logger.log(`${response.fixtures?.length} Fixture schedule retrieved.`);
};

const subscribeByFixtures = async (
  subscriptionHttpClient: ISubscriptionHttpClient,
): Promise<void> => {
  const request = new FixturesSubscriptionRequestDto({
    fixtures: [23498963],
  });

  const response: FixturesSubscriptionCollectionResponse =
    await subscriptionHttpClient.subscribeByFixtures(request);

  logger.info(`Successfully subscribed to ${response.fixtures?.length} fixtures`);
};

initApiSample();
