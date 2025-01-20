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

// Load configuration
const config = getConfig();

let logger = console;

const initApiSample = async () => {
  try {
    const snapshotApiFactory = new SnapshotApiFactory();

    const inPlaySnapshotHttpClient = snapshotApiFactory.createSnapshotApiInPlayHttpClient({
      packageCredentials: config.trade360.inPlayMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });

 //    await getInPlayFixtures(inPlaySnapshotHttpClient);

//     await getInPlayLivescores(inPlaySnapshotHttpClient);

 //    await getInPlayFixtureMarkets(inPlaySnapshotHttpClient);

//     await getInPlayEvents(inPlaySnapshotHttpClient);

     const preMatchSnapshotHttpClient = snapshotApiFactory.createSnapshotApiPrematchHttpClient({
      packageCredentials: config.trade360.preMatchMQSettings,
      restApiBaseUrl: config.trade360.restApiBaseUrl,
      logger,
    });
//    await getPreMatchFixtures(preMatchSnapshotHttpClient);

//    await getPreMatchLivescores(preMatchSnapshotHttpClient);

 //   await getPreMatchFixtureMarkets(preMatchSnapshotHttpClient);

 //    await getPreMatchEvents(preMatchSnapshotHttpClient);

  //  await getOutrightEvents(preMatchSnapshotHttpClient);

 //   await getOutrightFixtures(preMatchSnapshotHttpClient);

  //  await getOutrightScores(preMatchSnapshotHttpClient);

 //   await getOutrightFixtureMarkets(preMatchSnapshotHttpClient);

   // await getOutrightLeagues(preMatchSnapshotHttpClient);

    await getOutrightLeagueMarkets(preMatchSnapshotHttpClient);
  }
  catch (err: unknown) {
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

const getInPlayFixtures = async (inplaySnapshotHttpClient: InPlaySnapshotApiClient): Promise<void> => {
  const request = new GetFixtureRequestDto({
    sportIds: [6046]
  });

  const response = await inplaySnapshotHttpClient.getFixtures(request);

  logger.log(`${response?.length} Fixtures retrieved.`);
};

const getInPlayLivescores = async (inplaySnapshotHttpClient: InPlaySnapshotApiClient): Promise<void> => {
  const request = new GetLivescoreRequestDto({
    sportIds: [6046]
  });

  const response = await inplaySnapshotHttpClient.getLivescores(request);

  logger.log(`${response?.length} Livescores retrieved.`);
};

const getInPlayFixtureMarkets = async (inplaySnapshotHttpClient: InPlaySnapshotApiClient): Promise<void> => {
  const request = new GetMarketRequestDto({
    sportIds: [6046]
  });

  const response = await inplaySnapshotHttpClient.getFixtureMarkets(request);

  logger.log(`${response?.length} Fixture Markets retrieved.`);
};

const getInPlayEvents = async (inplaySnapshotHttpClient: InPlaySnapshotApiClient): Promise<void> => {
  const request = new GetInPlayEventRequestDto({
    sportIds: [6046]
  });

  const response = await inplaySnapshotHttpClient.getEvents(request);

  logger.log(`${response?.length} Events retrieved.`);
};

const getPreMatchFixtures = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetFixtureRequestDto({
    sportIds: [6046]
  });

  const response = await prematchSnapshotHttpClient.getFixtures(request);

  logger.log(`${response?.length} Fixtures retrieved.`);
};

const getPreMatchLivescores = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetLivescoreRequestDto({
    sportIds: [6046]
  });

  const response = await prematchSnapshotHttpClient.getLivescores(request);

  logger.log(`${response?.length} Livescores retrieved.`);
};

const getPreMatchFixtureMarkets = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetMarketRequestDto({
    sportIds: [6046]
  });

  const response = await prematchSnapshotHttpClient.getFixtureMarkets(request);

  logger.log(`${response?.length} Fixture Markets retrieved.`);
};

const getPreMatchEvents = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetEventRequestDto({
    sportIds: [6046]
  });

  const response = await prematchSnapshotHttpClient.getEvents(request);

  logger.log(`${response?.length} Events retrieved.`);
};


const getOutrightEvents = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetOutrightEventRequestDto({
    sportIds: [6046]
  });

  const response = await prematchSnapshotHttpClient.getOutrightEvents(request);

  logger.log(`${response?.length} Outright Events retrieved.`);
};


const getOutrightFixtures = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetOutrightFixtureRequestDto({
    sportIds: [6046]
  });

  const response = await prematchSnapshotHttpClient.getOutrightFixtures(request);

  logger.log(`${response?.length} Outright Fixtures retrieved.`);
};

const getOutrightScores = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetOutrightLivescoreRequestDto({
    sportIds: [6046]
  });

  const response = await prematchSnapshotHttpClient.getOutrightScores(request);

  logger.log(`${response?.length} Outright Scores retrieved.`);
};

const getOutrightFixtureMarkets = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetOutrightMarketRequestDto({
    sportIds: [6046]
  });

  const response = await prematchSnapshotHttpClient.getOutrightFixtureMarkets(request);

  logger.log(`${response?.length} Outright Fixture Markets retrieved.`);
};


const getOutrightLeagues = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetOutrightLeaguesRequestDto({
    sportIds: [6046]
  });

  const response = await prematchSnapshotHttpClient.getOutrightLeagues(request);

  logger.log(`${response?.length} Outright Leagues retrieved.`);
};

const getOutrightLeagueMarkets = async (prematchSnapshotHttpClient: PreMatchSnapshotApiClient): Promise<void> => {
  const request = new GetOutrightLeagueMarketRequestDto({
    sportIds: [6046]
  });

  const response = await prematchSnapshotHttpClient.getOutrightLeagueMarkets(request);

  logger.log(`${response?.length} Outright League Markets retrieved.`);
};

initApiSample();
