import _ from 'lodash';
import moment from 'moment';

import {
  ChangeManualSuspensionsRequestDto,
  CompetitionsSubscriptionRequestBodyStructure,
  CompetitionsSubscriptionRequestDto,
  CustomersApiFactory,
  FixtureScheduleCollectionResponse,
  FixturesMetadataSubscriptionsCollectionResponse,
  FixturesMetadataSubscriptionsRequestDto,
  FixturesSubscriptionCollectionResponse,
  FixturesSubscriptionRequestDto,
  GetCompetitionsRequestDto,
  GetFixtureScheduleRequestDto,
  GetLeaguesRequestDto,
  GetManualSuspensionsResponse,
  GetMarketsRequestDto,
  SubscriptionsCollectionResponse,
  GetSubscriptionsRequestDto,
  GetTranslationsRequestDto,
  HttpResponseError,
  IMetadataHttpClient,
  ISubscriptionHttpClient,
  InvalidDateInRequestError,
  LeaguesSubscriptionCollectionResponse,
  LeaguesSubscriptionRequestBodyStructure,
  LeaguesSubscriptionRequestDto,
  ManualSuspensionsRequestBodyStructure,
  RequestSuspendedMarket,
  Sport,
  StartResponseBody,
  StatusResponseBody,
  StopResponseBody,
  SubscriptionState,
  TranslationsValidationError,
  ValidationError,
  IPackageDistributionHttpClient,
} from 'trade360-nodejs-sdk';

import { getConfig } from './config';

// Load configuration
const config = getConfig();

let logger = console;
const readline = require('readline');

const initApiSample = async () => {
  try {
    const customersApiFactory = new CustomersApiFactory();

    const subscriptionInplayHttpClient = customersApiFactory.createSubscriptionHttpClient({
      packageCredentials: config.trade360.inPlayMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });

    const subscriptionPremtachHttpClient = customersApiFactory.createSubscriptionHttpClient({
      packageCredentials: config.trade360.preMatchMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });

    const metadataInplayHttpClient = customersApiFactory.createMetadataHttpClient({
      packageCredentials: config.trade360.inPlayMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });

    const metadataPrematchHttpClient = customersApiFactory.createMetadataHttpClient({
      packageCredentials: config.trade360.preMatchMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });

    const packageDistributionHttpClient = customersApiFactory.createPackageDistributionHttpClient({
      packageCredentials: config.trade360.inPlayMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const showMenu = () => {
      console.log('\n=== API Operations Menu ===');
      console.log('1. Get Package Quota');
      console.log('2. Get Fixture Schedule');
      console.log('3. Subscribe by Fixtures');
      console.log('4. Unsubscribe from Fixture');
      console.log('5. Subscribe by Leagues');
      console.log('6. Unsubscribe from Leagues');
      console.log('7. Get Manual Suspensions');
      console.log('8. Add Manual Suspensions');
      console.log('9. Remove Manual Suspensions');
      console.log('10. Get Subscriptions');
      console.log('11. Subscribe by Competitions');
      console.log('12. Unsubscribe from Competitions');
      console.log('13. Get Fixtures Metadata Subscriptions');
      console.log('14. Get Locations');
      console.log('15. Get Sports');
      console.log('16. Get Leagues');
      console.log('17. Get Markets');
      console.log('18. Get Translations');
      console.log('19. Get Competitions');
      console.log('20. Get Distribution Status');
      console.log('21. Start Distribution');
      console.log('22. Stop Distribution');
      console.log('0. Exit');
      console.log('===========================');
    };

    const handleUserInput = async (choice: string) => {
      switch (choice) {
        case '1':
          await getPackageQuota(subscriptionInplayHttpClient);
          break;
        case '2':
          await getFixtureSchedule(subscriptionInplayHttpClient);
          break;
        case '3':
          await subscribeByFixtures(subscriptionInplayHttpClient);
          break;
        case '4':
          await unSubscribeFromFixture(subscriptionInplayHttpClient);
          break;
        case '5':
          await subscribeByLeagues(subscriptionInplayHttpClient);
          break;
        case '6':
          await unSubscribeFromLeagues(subscriptionInplayHttpClient);
          break;
        case '7':
          await getManualSuspensions(subscriptionInplayHttpClient);
          break;
        case '8':
          await addManualSuspensions(subscriptionInplayHttpClient);
          break;
        case '9':
          await removeManualSuspensions(subscriptionInplayHttpClient);
          break;
        case '10':
          await getSubscriptions(subscriptionInplayHttpClient);
          break;
        case '11':
          await subscribeByCompetitions(subscriptionPremtachHttpClient);
          break;
        case '12':
          await unSubscribeFromCompetitions(subscriptionPremtachHttpClient);
          break;
        case '13':
          await getFixturesMetadataSubscriptions(subscriptionInplayHttpClient);
          break;
        case '14':
          await getLocations(metadataInplayHttpClient);
          break;
        case '15':
          await getSports(metadataInplayHttpClient);
          break;
        case '16':
          await getLeagues(metadataInplayHttpClient);
          break;
        case '17':
          await getMarkets(metadataInplayHttpClient);
          break;
        case '18':
          await getTranslations(metadataPrematchHttpClient);
          break;
        case '19':
          await getCompetitions(metadataPrematchHttpClient);
          break;
        case '20':
          await getDistributionStatus(packageDistributionHttpClient);
          break;
        case '21':
          await startDistibution(packageDistributionHttpClient);
          break;
        case '22':
          await stopDistribution(packageDistributionHttpClient);
          break;
        case '0':
          console.log('Exiting...');
          rl.close();
          return;
        default:
          console.log('Invalid choice. Please try again.');
          break;
      }

      // Show the menu again after handling the choice
      promptUser();
    };

    const promptUser = () => {
      showMenu();
      rl.question('Select an option: ', (answer: string) => {
        handleUserInput(answer);
      });
    };
    promptUser();
  } catch (err: unknown) {
    // Error handling (same as original)
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
    } else {
      logger.error(`API sample got err: ${err}`);
    }
  }
};


const stopDistribution = async(packageDistributionHttpClient: IPackageDistributionHttpClient) => {
  const stopRequest: StopResponseBody | undefined = await packageDistributionHttpClient.stopDistribution<StopResponseBody>(StopResponseBody);
  console.log('Stop Distribution Response:', stopRequest);
}

const startDistibution = async(packageDistributionHttpClient: IPackageDistributionHttpClient)=> {
  const distributionStatus = await packageDistributionHttpClient.getDistributionStatus<StatusResponseBody>(StatusResponseBody);
  if (!_.isNil(distributionStatus)) {      
    const { isDistributionOn } = distributionStatus;
    if (!isDistributionOn) {
      const startRequest: StartResponseBody | undefined = await packageDistributionHttpClient.startDistribution<StartResponseBody>(
        StartResponseBody
      );
      console.log('Start Distribution Response:', startRequest);
        if (!_.isNil(startRequest)) logger.log(startRequest.message);
      }
    }
  }

const getDistributionStatus = async (packageDistributionHttpClient: IPackageDistributionHttpClient) => {
  const distributionStatus = await packageDistributionHttpClient.getDistributionStatus<StatusResponseBody>(
    StatusResponseBody
  );
  console.log('Distribution Status:', distributionStatus);
}

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

    logger.log(`Response returned ${response?.length} leagues:`);

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

  const response = await metadataHttpClient.getTranslations(request);

  logger.log(
    `Count of translations received Sports: ${_.keys(response?.sports).length} Translations retrieved.`,
  );

  logger.log(
    `Count of translations received Leagues: ${_.keys(response?.leagues).length} Translations retrieved.`,
  );

  logger.log(
    `Count of translations received Locations: ${_.keys(response?.locations).length} Translations retrieved.`,
  );
};

const getCompetitions = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  const request = new GetCompetitionsRequestDto({
    locationIds: [1],
    subscriptionStatus: SubscriptionState.All,
  });

  const response = await metadataHttpClient.getCompetitions(request);

  logger.log(`${response?.competitions?.length} Competitions retrieved.`);
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

  const response: FixtureScheduleCollectionResponse | undefined =
    await subscriptionHttpClient.getFixturesSchedule(request);

  logger.log(`${response?.fixtures?.length} Fixture schedule retrieved.`);
};

const subscribeByFixtures = async (
  subscriptionHttpClient: ISubscriptionHttpClient,
): Promise<void> => {
  const request = new FixturesSubscriptionRequestDto({
    fixtures: [23498963],
  });

  const response: FixturesSubscriptionCollectionResponse | undefined =
    await subscriptionHttpClient.subscribeByFixtures(request);

  logger.info(`Successfully subscribed to ${response?.fixtures?.length} fixtures`);
};

const unSubscribeFromFixture = async (
  subscriptionHttpClient: ISubscriptionHttpClient,
): Promise<void> => {
  const request = new FixturesSubscriptionRequestDto({
    fixtures: [23498963],
  });

  const response: FixturesSubscriptionCollectionResponse | undefined =
    await subscriptionHttpClient.unSubscribeByFixtures(request);

  logger.info(`Successfully unsubscribed from ${response?.fixtures?.length} fixtures`);
};

const subscribeByLeagues = async (
  subscriptionHttpClient: ISubscriptionHttpClient,
): Promise<void> => {
  const request = new LeaguesSubscriptionRequestDto({
    subscriptions: [
      new LeaguesSubscriptionRequestBodyStructure({
        sportId: 6046,
        locationId: 142,
        leagueId: 5,
      }),
    ],
  });

  const response: LeaguesSubscriptionCollectionResponse | undefined =
    await subscriptionHttpClient.subscribeByLeagues(request);

  logger.info(`Successfully subscribed to ${response?.subscription?.length} leagues`);
};

const unSubscribeFromLeagues = async (
  subscriptionHttpClient: ISubscriptionHttpClient,
): Promise<void> => {
  const request = new LeaguesSubscriptionRequestDto({
    subscriptions: [
      {
        sportId: 6046,
        locationId: 142,
        leagueId: 5,
      },
    ],
  });

  const response: LeaguesSubscriptionCollectionResponse | undefined =
    await subscriptionHttpClient.unSubscribeByLeagues(request);

  logger.info(`Successfully unsubscribed from ${response?.subscription?.length} leagues`);
};

const getManualSuspensions = async (
  subscriptionHttpClient: ISubscriptionHttpClient,
): Promise<void> => {
  const response: GetManualSuspensionsResponse | undefined =
    await subscriptionHttpClient.getAllManualSuspensions();

  if (_.isNil(response) || !response.succeeded || _.isEmpty(response.suspensions)) {
    logger.log(`No manual suspensions entities received.`);
    return;
  }

  logger.log('Manual suspensions entities received:');

  _.each(response.suspensions, (suspension, index) => {
    logger.log(`Suspension[${index}]: ${JSON.stringify(suspension)}`);
  });
};

const addManualSuspensions = async (
  subscriptionHttpClient: ISubscriptionHttpClient,
): Promise<void> => {
  const request = new ChangeManualSuspensionsRequestDto({
    suspensions: [
      new ManualSuspensionsRequestBodyStructure({
        fixtureId: 13176576,
        markets: [
          new RequestSuspendedMarket({
            marketId: 1439,
            line: '-0.25',
          }),
        ],
      }),
    ],
  });

  const response = await subscriptionHttpClient.addManualSuspensions(request);

  logger.log(`Manual suspensions added: ${response?.succeeded}`);
};

const removeManualSuspensions = async (
  subscriptionHttpClient: ISubscriptionHttpClient,
): Promise<void> => {
  const request = new ChangeManualSuspensionsRequestDto({
    suspensions: [
      new ManualSuspensionsRequestBodyStructure({
        fixtureId: 13176576,
        markets: [
          new RequestSuspendedMarket({
            marketId: 1439,
            line: '-0.25',
          }),
        ],
      }),
    ],
  });

  const response = await subscriptionHttpClient.removeManualSuspensions(request);

  logger.log(`Manual suspensions removed: ${response?.succeeded}`);
};

const getSubscriptions = async (subscriptionHttpClient: ISubscriptionHttpClient): Promise<void> => {
  const request = new GetSubscriptionsRequestDto({
    sportIds: [6046],
  });

  const response: SubscriptionsCollectionResponse | undefined =
    await subscriptionHttpClient.getSubscriptions(request);

  logger.log(`Subscriptions received: ${response?.fixtures?.length}`);
};

const subscribeByCompetitions = async (
  subscriptionHttpClient: ISubscriptionHttpClient,
): Promise<void> => {
  const request = new CompetitionsSubscriptionRequestDto({
    subscriptions: [
      new CompetitionsSubscriptionRequestBodyStructure({
        sportId: 6046,
        locationId: 142,
        leagueId: 5,
      }),
    ],
  });

  const response = await subscriptionHttpClient.subscribeByCompetitions(request);

  logger.log(`Subscribed to ${response?.subscription?.length} competitions`);
};

const unSubscribeFromCompetitions = async (subscriptionHttpClient: ISubscriptionHttpClient) => {
  const request = new CompetitionsSubscriptionRequestDto({
    subscriptions: [
      new CompetitionsSubscriptionRequestBodyStructure({
        sportId: 6046,
        locationId: 142,
        leagueId: 5,
      }),
    ],
  });

  const response = await subscriptionHttpClient.unSubscribeByCompetitions(request);

  logger.log(`Unsubscribed from ${response?.subscription?.length} competitions`);
};

const getFixturesMetadataSubscriptions = async (
  subscriptionHttpClient: ISubscriptionHttpClient,
): Promise<void> => {
  const request = new FixturesMetadataSubscriptionsRequestDto({
    fromDate: moment(),
    toDate: moment().add(10, 'days'),
  });

  const response: FixturesMetadataSubscriptionsCollectionResponse | undefined =
    await subscriptionHttpClient.getFixturesMetadataSubscriptions(request);

  logger.log(`Fixtures metadata subscriptions received: ${response?.subscribedFixtures?.length}`);
};

initApiSample();
