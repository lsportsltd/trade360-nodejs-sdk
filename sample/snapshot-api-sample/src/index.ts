import 'reflect-metadata';
import 'module-alias/register';
import _ from 'lodash';

import {
  GetFixtureRequestDto,
  GetLivescoreRequestDto,
  GetInPlayEventRequestDto,
  GetEventRequestDto,
  GetOutrightEventRequestDto, 
  GetOutrightFixtureRequestDto, 
  GetOutrightLeagueMarketRequestDto,
  GetOutrightLeagueEventsRequestDto,
  GetOutrightLeaguesRequestDto, 
  GetOutrightLivescoreRequestDto, 
  GetOutrightMarketRequestDto,
  GetMarketRequestDto,
} from '@api/common/snapshot';

import { SnapshotApiFactory } from '@api/snapshot-api/snapshot-api';

import {
  InPlaySnapshotApiClient,
  PreMatchSnapshotApiClient,
} from '@api/snapshot-api/interfaces';

import {
  ValidationError,
  TranslationsValidationError,
  HttpResponseError,
  InvalidDateInRequestError
} from '@lsports/errors';

import { getConfig } from './config';
import readline from 'readline';

// Load configuration
const config = getConfig();

let logger = console;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const initApiSample = async () => {
  try {
    const snapshotApiFactory = new SnapshotApiFactory();

    // Create Snapshot API clients
    const inPlaySnapshotHttpClient = snapshotApiFactory.createSnapshotApiInPlayHttpClient({
      packageCredentials: config.trade360.inPlayMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });

    const preMatchSnapshotHttpClient = snapshotApiFactory.createSnapshotApiPrematchHttpClient({
      packageCredentials: config.trade360.preMatchMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });

    const showMenu = () => {
      console.log('\n=== Snapshot API Operations Menu ===');
      console.log('1. Get In-Play Fixtures');
      console.log('2. Get In-Play Livescores');
      console.log('3. Get In-Play Fixture Markets');
      console.log('4. Get In-Play Events');
      console.log('5. Get Pre-Match Fixtures');
      console.log('6. Get Pre-Match Livescores');
      console.log('7. Get Pre-Match Fixture Markets');
      console.log('8. Get Pre-Match Events');
      console.log('9. Get Pre-Match Outright Events');
      console.log('10. Get Pre-Match Outright Fixtures');
      console.log('11. Get Pre-Match Outright Scores');
      console.log('12. Get Pre-Match Outright Fixture Markets');
      console.log('13. Get Pre-Match Outright Leagues');
      console.log('14. Get Pre-Match Outright League Markets');
      console.log('15. Get Pre-Match Outright League Events');
      console.log('16. Get In-Play Outright Leagues');
      console.log('17. Get In-Play Outright League Markets');
      console.log('18. Get In-Play Outright League Events');
      console.log('0. Exit');
      console.log('==============================');
    };

    const handleUserInput = async (choice: string) => {
      switch (choice) {
        case '1':
          await getInPlayFixtures(inPlaySnapshotHttpClient);
          break;
        case '2':
          await getInPlayLivescores(inPlaySnapshotHttpClient);
          break;
        case '3':
          await getInPlayFixtureMarkets(inPlaySnapshotHttpClient);
          break;
        case '4':
          await getInPlayEvents(inPlaySnapshotHttpClient);
          break;
        case '5':
          await getPreMatchFixtures(preMatchSnapshotHttpClient);
          break;
        case '6':
          await getPreMatchLivescores(preMatchSnapshotHttpClient);
          break;
        case '7':
          await getPreMatchFixtureMarkets(preMatchSnapshotHttpClient);
          break;
        case '8':
          await getPreMatchEvents(preMatchSnapshotHttpClient);
          break;
        case '9':
          await getOutrightEvents(preMatchSnapshotHttpClient);
          break;
        case '10':
          await getOutrightFixtures(preMatchSnapshotHttpClient);
          break;
        case '11':
          await getOutrightScores(preMatchSnapshotHttpClient);
          break;
        case '12':
          await getOutrightFixtureMarkets(preMatchSnapshotHttpClient);
          break;
        case '13':
          await getOutrightLeagues(preMatchSnapshotHttpClient);
          break;
        case '14':
          await getOutrightLeagueMarkets(preMatchSnapshotHttpClient);
          break;
        case '15':
          await getOutrightLeagueEvents(preMatchSnapshotHttpClient);
          break;
        case '16':
          await getInPlayOutrightLeagues(inPlaySnapshotHttpClient);
          break;
        case '17':
          await getInPlayOutrightLeagueMarkets(inPlaySnapshotHttpClient);
          break;
        case '18':
          await getInPlayOutrightLeagueEvents(inPlaySnapshotHttpClient);
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
      showMenu(); // Display the menu
      rl.question('Select an option: ', (answer: string) => {
        handleUserInput(answer); // Call the appropriate handler based on user input
      });
    };

    // Start the prompt
    promptUser();

  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      logger.error(`API sample got err from ValidationError instance: ${err}`);
      if (!_.isNil(err.context) && typeof err.context === 'object') {
        _.each(err.context, (value, key) => {
          logger.error(`Error [${key}]: ${JSON.stringify(value)}`);
        });
      }
    } else if (err instanceof TranslationsValidationError) {
      logger.error(`API sample got err from TranslationsValidationError instance: ${err}`);
    } else if (err instanceof HttpResponseError) {
      logger.error(`API sample got err from HttpResponseError instance: ${err}`);
      let errors = [];
      if (!_.isNil(err.context) && typeof err.context === 'string') {
        errors = [logger.error(`Error [${err.name}]: ${JSON.stringify(err.context)}`)];
      } else if (_.isArray(err.context)) {
        errors = err.context;
      }
      if (typeof err.context === 'object') {
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

const getInPlayFixtures = async (inplaySnapshotHttpClient: InPlaySnapshotApiClient): Promise<void> => {
  const request = new GetFixtureRequestDto({
    sports: [6046]
  });

  const response = await inplaySnapshotHttpClient.getFixtures(request);

  logger.log(`${response?.length} Fixtures retrieved.`);
};

const getInPlayLivescores = async (inplaySnapshotHttpClient: InPlaySnapshotApiClient): Promise<void> => {
  const request = new GetLivescoreRequestDto({
    sports: [6046]
  });

  const response = await inplaySnapshotHttpClient.getLivescores(request);

  logger.log(`${response?.length} Livescores retrieved.`);
};

const getInPlayFixtureMarkets = async (inplaySnapshotHttpClient: InPlaySnapshotApiClient): Promise<void> => {
  const request = new GetMarketRequestDto({
    sports: [6046]
  });

  const response = await inplaySnapshotHttpClient.getFixtureMarkets(request);

  logger.log(`${response?.length} Fixture Markets retrieved.`);
};

const getInPlayEvents = async (inplaySnapshotHttpClient: InPlaySnapshotApiClient): Promise<void> => {
  const request = new GetInPlayEventRequestDto({
    sports: [6046]
  });

  const response = await inplaySnapshotHttpClient.getEvents(request);

  logger.log(`${response?.length} Events retrieved.`);
};

const getPreMatchFixtures = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetFixtureRequestDto({
    sports: [6046]
  });

  const response = await prematchSnapshotHttpClient.getFixtures(request);

  logger.log(`${response?.length} Fixtures retrieved.`);
};

const getPreMatchLivescores = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetLivescoreRequestDto({
    sports: [6046]
  });

  const response = await prematchSnapshotHttpClient.getLivescores(request);

  logger.log(`${response?.length} Livescores retrieved.`);
};

const getPreMatchFixtureMarkets = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetMarketRequestDto({
    sports: [6046]
  });

  const response = await prematchSnapshotHttpClient.getFixtureMarkets(request);

  logger.log(`${response?.length} Fixture Markets retrieved.`);
};

const getPreMatchEvents = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetEventRequestDto({
    sports : [6046]
  });

  const response = await prematchSnapshotHttpClient.getEvents(request);

  logger.log(`${response?.length} Events retrieved.`);
};


const getOutrightEvents = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetOutrightEventRequestDto({
    sports: [6046]
  });

  const response = await prematchSnapshotHttpClient.getOutrightEvents(request);

  logger.log(`${response?.length} Outright Events retrieved.`);
};


const getOutrightFixtures = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetOutrightFixtureRequestDto({
    sports: [6046]
  });

  const response = await prematchSnapshotHttpClient.getOutrightFixtures(request);

  logger.log(`${response?.length} Outright Fixtures retrieved.`);
};

const getOutrightScores = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetOutrightLivescoreRequestDto({
    sports: [6046]
  });

  const response = await prematchSnapshotHttpClient.getOutrightScores(request);

  logger.log(`${response?.length} Outright Scores retrieved.`);
};

const getOutrightFixtureMarkets = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetOutrightMarketRequestDto({
    sports: [6046]
  });

  const response = await prematchSnapshotHttpClient.getOutrightFixtureMarkets(request);

  logger.log(`${response?.length} Outright Fixture Markets retrieved.`);
};


const getOutrightLeagues = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetOutrightLeaguesRequestDto({
    sports: [6046]
  });

  const response = await prematchSnapshotHttpClient.getOutrightLeagues(request);

  logger.log(`${response?.length} Outright Leagues retrieved.`);
};

const getOutrightLeagueMarkets = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetOutrightLeagueMarketRequestDto({
    sports: [6046]
  });

  const response = await prematchSnapshotHttpClient.getOutrightLeagueMarkets(request);

  logger.log(`${response?.length} Outright League Markets retrieved.`);
};

const getOutrightLeagueEvents = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetOutrightLeagueEventsRequestDto({
    sports: [6046]
  });

  const response = await prematchSnapshotHttpClient.getOutrightLeagueEvents(request);

  logger.log(`${response?.length} Outright League Events retrieved.`);
};

const getInPlayOutrightLeagues = async (inplaySnapshotHttpClient: InPlaySnapshotApiClient): Promise<void> => {
  const request = new GetOutrightLeaguesRequestDto({
  });

  const response = await inplaySnapshotHttpClient.getOutrightLeagues(request);

  logger.log(`${response?.length} In-Play Outright Leagues retrieved.`);
};

const getInPlayOutrightLeagueMarkets = async (inplaySnapshotHttpClient: InPlaySnapshotApiClient): Promise<void> => {
  const request = new GetOutrightLeagueMarketRequestDto({
  });

  const response = await inplaySnapshotHttpClient.getOutrightLeagueMarkets(request);

  logger.log(`${response?.length} In-Play Outright League Markets retrieved.`);
};

const getInPlayOutrightLeagueEvents = async (inplaySnapshotHttpClient: InPlaySnapshotApiClient): Promise<void> => {
  const request = new GetOutrightLeagueEventsRequestDto({
  });

  const response = await inplaySnapshotHttpClient.getOutrightLeagueEvents(request);

  logger.log(`${response?.length} In-Play Outright League Events retrieved.`);
};

initApiSample();
