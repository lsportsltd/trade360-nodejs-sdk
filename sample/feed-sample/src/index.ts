import {
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
  OutrightScoreUpdate,
  OutrightSettlementsUpdate,
  SettlementUpdate,
  ValidationError,
  ConversionError,
  ConsumptionMessageError,
  RetryError,
} from "trade360-nodejs-sdk";

import { getConfig } from "./config";
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
  SettlementUpdateHandler,
} from "./handler";

// Load configuration from appConfig file
const config = getConfig();

let logger = console;

const initSample = async () => {
  try {
    const feedInPlay = new Feed(config.trade360.inPlayMQSettings!, logger);
    // const feedPreMatch = Feed(config.Trade360.PreMatchMQSettings, logger);

    // feedInPlay.addEntityHandler((msg: any) => {
    //   logger.log(`got new message:\n${JSON.stringify(msg)}\n`);
    // });

    feedInPlay.addEntityHandler(
      new FixtureMetadataUpdateHandler(),
      FixtureMetadataUpdate
    );

    feedInPlay.addEntityHandler(new LivescoreUpdateHandler(), LivescoreUpdate);

    feedInPlay.addEntityHandler(new MarketUpdateHandler(), MarketUpdate);

    feedInPlay.addEntityHandler(
      new SettlementUpdateHandler(),
      SettlementUpdate
    );

    feedInPlay.addEntityHandler(
      new OutrightFixtureUpdateHandler(),
      OutrightFixtureUpdate
    );

    feedInPlay.addEntityHandler(
      new OutrightScoreUpdateHandler(),
      OutrightScoreUpdate
    );

    feedInPlay.addEntityHandler(
      new OutrightFixtureMarketUpdateHandler(),
      OutrightFixtureMarketUpdate
    );

    feedInPlay.addEntityHandler(
      new OutrightSettlementsUpdateHandler(),
      OutrightSettlementsUpdate
    );

    feedInPlay.addEntityHandler(new HeartbeatUpdateHandler(), HeartbeatUpdate);

    feedInPlay.addEntityHandler(new KeepAliveUpdateHandler(), KeepAliveUpdate);

    feedInPlay.addEntityHandler(
      new OutrightLeagueFixtureUpdateHandler(),
      OutrightLeagueFixtureUpdate
    );

    feedInPlay.addEntityHandler(
      new OutrightLeagueMarketUpdateHandler(),
      OutrightLeagueMarketUpdate
    );

    process.on("exit" || "SIGINT", async (err) => {
      await feedInPlay.stop();
      process.exit(1);
    });

    await feedInPlay.start(true);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        return resolve();
      }, 120 * 1000);
    });

    await feedInPlay.stop();
  } catch (err) {
    if (err instanceof ValidationError) {
      logger.error(`feed sample got err from ValidationError instance: ${err}`);
    }
    if (err instanceof ConversionError) {
      logger.error(`feed sample got err from ConversionError instance: ${err}`);
    }
    if (err instanceof ConsumptionMessageError) {
      logger.error(
        `feed sample got err from ConsumptionMessageError instance: ${err}`
      );
    }
    if (err instanceof RetryError) {
      logger.error(`feed sample got err from RetryError instance: ${err}`);
    }
  }
};

initSample();
