import _ from 'lodash';
import moment from 'moment';
import { instanceToPlain } from 'class-transformer';

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
  GetSubscriptionsRequestDto,
  SubscriptionsCollectionResponse,
  GetIncidentsRequestDto,
  IncidentsFilterDto,
  GetVenuesRequestDto,
  VenueFilterDto,
  GetCitiesRequestDto,
  CityFilterDto,
  GetStatesRequestDto,
  StateFilterDto,
  GetParticipantsRequestDto,
  ParticipantFilterDto,
  GetSeasonsRequestDto,
  GetToursRequestDto,
} from 'trade360-nodejs-sdk';

import { getConfig } from './config';

// Load configuration
const config = getConfig();

let logger = console;
const readline = require('readline');

// Helper function to safely get array data from response (handles both camelCase and PascalCase)
const getResponseArray = (response: any, propertyName: string): any[] | undefined => {
  if (!response) return undefined;
  const camelCase = response[propertyName];
  const pascalCase = response[propertyName.charAt(0).toUpperCase() + propertyName.slice(1)];
  const array = camelCase ?? pascalCase;
  return Array.isArray(array) ? array : undefined;
};

// Helper function to safely get value from response (handles both camelCase and PascalCase)
const getResponseValue = (response: any, propertyName: string): any => {
  if (!response) return undefined;
  return response[propertyName] ?? response[propertyName.charAt(0).toUpperCase() + propertyName.slice(1)];
};

// Helper function to log API response with data count
const logApiResponse = (
  response: any,
  dataPropertyName: string,
  successMessage: string,
  totalItemsPropertyName?: string
): void => {
  logger.info('Raw response from API:');
  logger.info(JSON.stringify(response, null, 2));
  
  const data = getResponseArray(response, dataPropertyName);
  if (data?.length) {
    const totalItems = totalItemsPropertyName ? getResponseValue(response, totalItemsPropertyName) : undefined;
    const totalMsg = totalItems !== undefined ? `, total count: ${totalItems}` : '';
    logger.info(`${successMessage} ${data.length}${totalMsg}`);
  } else {
    logger.warn(`Response received but ${dataPropertyName} is undefined or empty`);
  }
};

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

    // Define menu options as an array of objects without explicit keys
    const menuOptions = [
      { label: 'Metadata API - Get Locations', handler: async () => await getLocations(metadataInplayHttpClient) },
      { label: 'Metadata API - Get Sports', handler: async () => await getSports(metadataInplayHttpClient) },
      { label: 'Metadata API - Get Leagues', handler: async () => await getLeagues(metadataInplayHttpClient) },
      { label: 'Metadata API - Get Markets', handler: async () => await getMarkets(metadataInplayHttpClient) },
      { label: 'Metadata API - Get Translations', handler: async () => await getTranslations(metadataPrematchHttpClient) },
      { label: 'Metadata API - Get Competitions', handler: async () => await getCompetitions(metadataPrematchHttpClient) },
      { label: 'Metadata API - Get Incidents', handler: async () => await getIncidents(metadataPrematchHttpClient) },
      { label: 'Metadata API - Get Venues', handler: async () => await getVenues(metadataPrematchHttpClient) },
      { label: 'Metadata API - Get Cities', handler: async () => await getCities(metadataPrematchHttpClient) },
      { label: 'Metadata API - Get States', handler: async () => await getStates(metadataPrematchHttpClient) },
      { label: 'Metadata API - Get Participants', handler: async () => await getParticipants(metadataPrematchHttpClient) },
      { label: 'Metadata API - Get Seasons', handler: async () => await getSeasons(metadataPrematchHttpClient) },
      { label: 'Metadata API - Get Tours', handler: async () => await getTours(metadataPrematchHttpClient) },
      { label: 'Subscription API - Get Package Quota', handler: async () => await getPackageQuota(subscriptionInplayHttpClient) },
      { label: 'Subscription API - Get Fixture Schedule', handler: async () => await getFixtureSchedule(subscriptionInplayHttpClient) },
      { label: 'Subscription API - Subscribe by Fixtures', handler: async () => await subscribeByFixtures(subscriptionInplayHttpClient) },
      { label: 'Subscription API - Unsubscribe from Fixture', handler: async () => await unSubscribeFromFixture(subscriptionInplayHttpClient) },
      { label: 'Subscription API - Subscribe by Leagues', handler: async () => await subscribeByLeagues(subscriptionInplayHttpClient) },
      { label: 'Subscription API - Unsubscribe from Leagues', handler: async () => await unSubscribeFromLeagues(subscriptionInplayHttpClient) },
      { label: 'Subscription API - Get Manual Suspensions', handler: async () => await getManualSuspensions(subscriptionInplayHttpClient) },
      { label: 'Subscription API - Add Manual Suspensions', handler: async () => await addManualSuspensions(subscriptionInplayHttpClient) },
      { label: 'Subscription API - Remove Manual Suspensions', handler: async () => await removeManualSuspensions(subscriptionInplayHttpClient) },
      { label: 'Subscription API - Get Subscriptions', handler: async () => await getSubscriptions(subscriptionInplayHttpClient) },
      { label: 'Subscription API - Subscribe by Competitions', handler: async () => await subscribeByCompetitions(subscriptionPremtachHttpClient) },
      { label: 'Subscription API - Unsubscribe from Competitions', handler: async () => await unSubscribeFromCompetitions(subscriptionPremtachHttpClient) },
      { label: 'Subscription API - Get Fixtures Metadata Subscriptions', handler: async () => await getFixturesMetadataSubscriptions(subscriptionInplayHttpClient) },
      { label: 'Package Distribution API - Get Distribution Status', handler: async () => await getDistributionStatus(packageDistributionHttpClient) },
      { label: 'Package Distribution API - Start Distribution', handler: async () => await startDistibution(packageDistributionHttpClient) },
      { label: 'Package Distribution API - Stop Distribution', handler: async () => await stopDistribution(packageDistributionHttpClient) },
      { label: 'Exit', handler: async () => { console.log('Exiting...'); rl.close(); } },
    ];

    // Show the menu dynamically with auto-generated keys
    const showMenu = () => {
      console.log('\n=== API Operations Menu ===');
      menuOptions.forEach((opt, idx) => console.log(`${idx}. ${opt.label}`));
      console.log('===========================');
    };

    // Handle user input using the index
    const handleUserInput = async (choice: string) => {
      const idx = parseInt(choice, 10);
      const option = menuOptions[idx];
      if (option) {
        await option.handler();
        if (idx !== menuOptions.length - 1) promptUser(); // last option is Exit
      } else {
        console.log('Invalid choice. Please try again.');
        promptUser();
      }
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

//region Subscription API
const getPackageQuota = async (
  subscriptionHttpClient: ISubscriptionHttpClient
): Promise<void> => {
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

  const fixtures = getResponseArray(response, 'fixtures');
  logger.log(`${fixtures?.length ?? 0} Fixture schedule retrieved.`);
};

const subscribeByFixtures = async (
  subscriptionHttpClient: ISubscriptionHttpClient,
): Promise<void> => {
  const request = new FixturesSubscriptionRequestDto({
    fixtures: [23498963],
  });

  const response: FixturesSubscriptionCollectionResponse | undefined =
    await subscriptionHttpClient.subscribeByFixtures(request);

  const fixtures = getResponseArray(response, 'fixtures');
  logger.info(`Successfully subscribed to ${fixtures?.length ?? 0} fixtures`);
};

const unSubscribeFromFixture = async (
  subscriptionHttpClient: ISubscriptionHttpClient,
): Promise<void> => {
  const request = new FixturesSubscriptionRequestDto({
    fixtures: [23498963],
  });

  const response: FixturesSubscriptionCollectionResponse | undefined =
    await subscriptionHttpClient.unSubscribeByFixtures(request);

  const fixtures = getResponseArray(response, 'fixtures');
  logger.info(`Successfully unsubscribed from ${fixtures?.length ?? 0} fixtures`);
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

  const subscription = getResponseArray(response, 'subscription');
  logger.info(`Successfully subscribed to ${subscription?.length ?? 0} leagues`);
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

  const subscription = getResponseArray(response, 'subscription');
  logger.info(`Successfully unsubscribed from ${subscription?.length ?? 0} leagues`);
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

const getSubscriptions = async (
  subscriptionHttpClient: ISubscriptionHttpClient
): Promise<void> => {
  try {
    const request = new GetSubscriptionsRequestDto({
      sportIds: [6046],
    });

    const requestPayload = instanceToPlain(request);
    logger.info('Request Payload being sent:');
    logger.info(JSON.stringify(requestPayload, null, 2));

    const response: SubscriptionsCollectionResponse | undefined =
      await subscriptionHttpClient.getSubscriptions(request);

    logger.info('Raw response from API:');
    logger.info(JSON.stringify(response, null, 2));

    const fixtures = getResponseArray(response, 'fixtures');
    if (fixtures?.length) {
      logger.info(`Successfully retrieved ${fixtures.length} subscriptions`);
    } else {
      logger.warn('Response received but fixtures is undefined or empty');
    }
  } catch (error) {
    logger.error(`Error getting subscriptions: ${error}`);
    if (error instanceof HttpResponseError && error.context) {
      logger.error(`Error context: ${JSON.stringify(error.context)}`);
    }
  }
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

  const subscription = getResponseArray(response, 'subscription');
  logger.log(`Subscribed to ${subscription?.length ?? 0} competitions`);
};

const unSubscribeFromCompetitions = async (
  subscriptionHttpClient: ISubscriptionHttpClient
) => {
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

  const subscription = getResponseArray(response, 'subscription');
  logger.log(`Unsubscribed from ${subscription?.length ?? 0} competitions`);
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

  const subscribedFixtures = getResponseArray(response, 'subscribedFixtures');
  logger.log(`Fixtures metadata subscriptions received: ${subscribedFixtures?.length ?? 0}`);
};
//endregion

//region Distribution API
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
//endregion

//region Metadata API
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

  const competitions = getResponseArray(response, 'competitions');
  logger.log(`${competitions?.length ?? 0} Competitions retrieved.`);
};

const getIncidents = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  logger.info('Getting incidents...');

  const incidentsFilter = new IncidentsFilterDto({
    sports: [6046],
    // from: moment("2023-10-07 10:00:37"),
    // searchText : ["Pen", "ste"],
    // ids: [2166],
  });

  const request = new GetIncidentsRequestDto({
    filter: incidentsFilter,
  });

  const requestPayload = instanceToPlain(request);
  logger.info('Request Payload being sent (should have PascalCase, e.g., Filter.From, Filter.Sports):');
  logger.info(JSON.stringify(requestPayload, null, 2));

  try {
    const response = await metadataHttpClient.getIncidents(request);
    logApiResponse(response, 'data', 'Successfully retrieved incidents', 'totalItems');
  } catch (error) {
    logger.error(`Error getting incidents: ${error}`);
    if (error instanceof HttpResponseError && error.context) {
      logger.error(`Error context: ${JSON.stringify(error.context)}`);
    }
  }
};

const getVenues = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  logger.info('Getting venues...');

  const venuesFilter = new VenueFilterDto({
    // countryIds: [1],
    // venueIds: [123, 456],
    // stateIds: [10],
    // cityIds: [100],
  });

  const request = new GetVenuesRequestDto({
    filter: venuesFilter,
  });

  const requestPayload = instanceToPlain(request);
  logger.info('Request Payload being sent (should have PascalCase, e.g., Filter.CountryIds):');
  logger.info(JSON.stringify(requestPayload, null, 2));

  try {
    const response = await metadataHttpClient.getVenues(request);
    logApiResponse(response, 'data', 'Successfully retrieved venues');
  } catch (error) {
    logger.error(`Error getting venues: ${error}`);
    if (error instanceof HttpResponseError && error.context) {
      logger.error(`Error context: ${JSON.stringify(error.context)}`);
    }
  }
};

const getCities = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  logger.info('Getting cities...');

  const citiesFilter = new CityFilterDto({
    countryIds: [1], // Example: Filter by country ID
    // stateIds: [10],
    // cityIds: [100, 200],
  });

  const request = new GetCitiesRequestDto({
    filter: citiesFilter,
  });

  const requestPayload = instanceToPlain(request);
  logger.info('Request Payload being sent (should have PascalCase, e.g., Filter.CountryIds):');
  logger.info(JSON.stringify(requestPayload, null, 2));

  try {
    const response = await metadataHttpClient.getCities(request);
    logApiResponse(response, 'data', 'Successfully retrieved cities');
  } catch (error) {
    logger.error(`Error getting cities: ${error}`);
    if (error instanceof HttpResponseError && error.context) {
      logger.error(`Error context: ${JSON.stringify(error.context)}`);
    }
  }
};

const getStates = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  logger.info('Getting states...');

  const statesFilter = new StateFilterDto({
   // countryIds: [1], // Example: Filter by country ID
    // stateIds: [10, 20],
  });

  const request = new GetStatesRequestDto({
    filter: statesFilter,
  });

  const requestPayload = instanceToPlain(request);
  logger.info('Request Payload being sent (should have PascalCase, e.g., Filter.CountryIds):');
  logger.info(JSON.stringify(requestPayload, null, 2));

  try {
    const response = await metadataHttpClient.getStates(request);
    logApiResponse(response, 'data', 'Successfully retrieved states');
  } catch (error) {
    logger.error(`Error getting states: ${error}`);
    if (error instanceof HttpResponseError && error.context) {
      logger.error(`Error context: ${JSON.stringify(error.context)}`);
    }
  }
};

const getParticipants = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  logger.info('Getting participants...');

  const participantsFilter = new ParticipantFilterDto({
    sportIds: [6046], // Example: Filter by sport ID (Football)
    // ids: [123, 456],
    // locationIds: [1, 2],
    // name: "United",
    // gender: 1, // Men
    // ageCategory: 0, // Regular
    // type: 1, // Club
  });

  const request = new GetParticipantsRequestDto({
    filter: participantsFilter,
    page: 1,
    pageSize: 50,
  });

  const requestPayload = instanceToPlain(request);
  logger.info('Request Payload being sent (should have PascalCase, e.g., Filter.SportIds):');
  logger.info(JSON.stringify(requestPayload, null, 2));

  try {
    const response = await metadataHttpClient.getParticipants(request);
    logApiResponse(response, 'data', 'Successfully retrieved participants', 'totalItems');
  } catch (error) {
    logger.error(`Error getting participants: ${error}`);
    if (error instanceof HttpResponseError && error.context) {
      logger.error(`Error context: ${JSON.stringify(error.context)}`);
    }
  }
};

const getSeasons = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  logger.info('Getting seasons...');

  const request = new GetSeasonsRequestDto({
    seasonId: undefined, // Optional filter by season ID
  });

  const requestPayload = instanceToPlain(request);
  logger.info('Request Payload being sent:');
  logger.info(JSON.stringify(requestPayload, null, 2));

  try {
    const response = await metadataHttpClient.getSeasons(request);
    logger.info('Raw response from API:');
    logger.info(JSON.stringify(response, null, 2));
    logger.info(`Successfully retrieved ${response?.seasons?.length} seasons`);
  } catch (error) {
    logger.error(`Error getting seasons: ${error}`);
    if (error instanceof HttpResponseError && error.context) {
      logger.error(`Error context: ${JSON.stringify(error.context)}`);
    }
  }
};

const getTours = async (metadataHttpClient: IMetadataHttpClient): Promise<void> => {
  logger.info('Getting tours...');

  const request = new GetToursRequestDto({
    tourId: undefined,
    sportId: undefined,
  });

  const requestPayload = instanceToPlain(request);
  logger.info('Request Payload being sent:');
  logger.info(JSON.stringify(requestPayload, null, 2));

  try {
    const response = await metadataHttpClient.getTours(request);
    logger.info('Raw response from API:');
    logger.info(JSON.stringify(response, null, 2));
    logger.info(`Successfully retrieved ${response?.tours?.length} tours`);
  } catch (error) {
    logger.error(`Error getting tours: ${error}`);
    if (error instanceof HttpResponseError && error.context) {
      logger.error(`Error context: ${JSON.stringify(error.context)}`);
    }
  }
};
//endregion

initApiSample();