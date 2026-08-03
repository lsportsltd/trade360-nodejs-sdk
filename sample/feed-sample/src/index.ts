import _ from 'lodash';

import {
  ConsumptionMessageError,
  ConversionError,
  Feed,
  FixtureMetadataUpdate,
  HeartbeatUpdate,
  KeepAliveUpdate,
  LivescoreUpdate,
  MarketUpdate,
  OutrightFixtureMarketUpdate,
  OutrightFixtureUpdate,
  OutrightLeagueFixtureUpdate,
  OutrightLeagueMarketUpdate,
  OutrightLeagueSettlementUpdate,
  OutrightScoreUpdate,
  OutrightSettlementsUpdate,
  RetryError,
  SettlementUpdate,
  ValidationError,
} from 'trade360-nodejs-sdk';

import { getConfig } from './config';
import {
  FixtureMetadataUpdateHandler,
  HeartbeatUpdateHandler,
  KeepAliveUpdateHandler,
  LivescoreUpdateHandler,
  MarketUpdateHandler,
  OutrightFixtureMarketUpdateHandler,
  OutrightFixtureUpdateHandler,
  OutrightLeagueFixtureUpdateHandler,
  OutrightLeagueMarketUpdateHandler,
  OutrightScoreUpdateHandler,
  OutrightSettlementsUpdateHandler,
  SettlementUpdateHandler
} from './handler';
import { BunyanAdapter, ConsoleAdapter, PinoAdapter, WinstonAdapter } from './logger';
import { OutrightLeagueSettlementUpdateHandler } from './handler/prematch/outright-league-settlement-update.handler';

// Load configuration from appConfig file
const config = getConfig();

// Using Console
let logger = new ConsoleAdapter();

// Using Bunyan
const bunyanLogger = new BunyanAdapter({ name: 'FeedSample' });

// Using Pino
const pinoLogger = new PinoAdapter();

// Using Winston
const winstonLogger = new WinstonAdapter();

const initSample = async () => {
  try {
    const feedInPlay = new Feed(config.trade360.inPlayMQSettings!, logger);
    const feedPreMatch = new Feed(config.trade360.preMatchMQSettings!, logger); 

    feedInPlay.addEntityHandler(new FixtureMetadataUpdateHandler(), FixtureMetadataUpdate);
    feedInPlay.addEntityHandler(new LivescoreUpdateHandler(), LivescoreUpdate);
    feedInPlay.addEntityHandler(new MarketUpdateHandler(), MarketUpdate);
    feedInPlay.addEntityHandler(new SettlementUpdateHandler(), SettlementUpdate);
    feedInPlay.addEntityHandler(new HeartbeatUpdateHandler('InPlay'), HeartbeatUpdate);
    feedInPlay.addEntityHandler(new KeepAliveUpdateHandler(), KeepAliveUpdate);
    feedInPlay.addEntityHandler(new OutrightLeagueFixtureUpdateHandler(),OutrightLeagueFixtureUpdate);
    feedInPlay.addEntityHandler(new OutrightLeagueMarketUpdateHandler(), OutrightLeagueMarketUpdate);
    feedInPlay.addEntityHandler(new OutrightLeagueSettlementUpdateHandler(), OutrightLeagueSettlementUpdate);

    feedPreMatch.addEntityHandler(new FixtureMetadataUpdateHandler(), FixtureMetadataUpdate);
    feedPreMatch.addEntityHandler(new LivescoreUpdateHandler(), LivescoreUpdate);
    feedPreMatch.addEntityHandler(new MarketUpdateHandler(), MarketUpdate);
    feedPreMatch.addEntityHandler(new SettlementUpdateHandler(), SettlementUpdate);
    feedPreMatch.addEntityHandler(new OutrightFixtureUpdateHandler(), OutrightFixtureUpdate);
    feedPreMatch.addEntityHandler(new OutrightScoreUpdateHandler(), OutrightScoreUpdate);
    feedPreMatch.addEntityHandler(new OutrightFixtureMarketUpdateHandler(),OutrightFixtureMarketUpdate);
    feedPreMatch.addEntityHandler(new OutrightSettlementsUpdateHandler(), OutrightSettlementsUpdate);
    feedPreMatch.addEntityHandler(new HeartbeatUpdateHandler('PreMatch'), HeartbeatUpdate);
    feedPreMatch.addEntityHandler(new OutrightLeagueFixtureUpdateHandler(),OutrightLeagueFixtureUpdate);
    feedPreMatch.addEntityHandler(new OutrightLeagueMarketUpdateHandler(), OutrightLeagueMarketUpdate);
    feedPreMatch.addEntityHandler(new OutrightLeagueSettlementUpdateHandler(), OutrightLeagueSettlementUpdate);

  
    const shutdown = async () => {
      await feedInPlay.stop();
      await feedPreMatch.stop();
      process.exit(1);
    };

    process.on('SIGINT', shutdown);
    process.on('exit', shutdown);

    // FIH_IP_ONLY=1 / FIH_PM_ONLY=1 for single-product live checks.
    if (process.env.FIH_PM_ONLY !== '1') {
      await feedInPlay.start(true);
    } else {
      logger.info('[FIH] InPlay skipped (FIH_PM_ONLY=1)');
    }
    if (process.env.FIH_IP_ONLY !== '1') {
      await feedPreMatch.start(true);
    } else {
      logger.info('[FIH] PreMatch skipped (FIH_IP_ONLY=1)');
    }

    const runMs = Number(process.env.FIH_RUN_SECONDS || 60) * 1000;
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        return resolve();
      }, runMs);
    });
    shutdown();
    
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      logger.error(`feed sample got err from ValidationError instance: ${err}`);
      if (!_.isNil(err.context) && typeof err.context == 'object') {
        _.each(err.context, (value: any, key: any) => {
          logger.error(`Error [${key}]: ${JSON.stringify(value)}`);
        });
      }
    }
    if (err instanceof ConversionError) {
      logger.error(`feed sample got err from ConversionError instance: ${err}`);
    }
    if (err instanceof ConsumptionMessageError) {
      logger.error(`feed sample got err from ConsumptionMessageError instance: ${err}`);
    }
    if (err instanceof RetryError) {
      logger.error(`feed sample got err from RetryError instance: ${err}`);
    }
  }
};

initSample();
