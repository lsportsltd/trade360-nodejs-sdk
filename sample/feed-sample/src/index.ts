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
  ProcessingMessageError,
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
    const feedInplay = new Feed(config.trade360.inplayMQSettings!, logger);
    // const feedPrematch = Feed(config.Trade360.PrematchMQSettings, logger);

    // feedInplay.addEntityHandler((msg: any) => {
    //   logger.log(`got new message:\n${JSON.stringify(msg)}\n`);
    // });

    feedInplay.addEntityHandler(
      new FixtureMetadataUpdateHandler(),
      FixtureMetadataUpdate
    );

    feedInplay.addEntityHandler(new LivescoreUpdateHandler(), LivescoreUpdate);

    feedInplay.addEntityHandler(new MarketUpdateHandler(), MarketUpdate);

    feedInplay.addEntityHandler(
      new SettlementUpdateHandler(),
      SettlementUpdate
    );

    feedInplay.addEntityHandler(
      new OutrightFixtureUpdateHandler(),
      OutrightFixtureUpdate
    );

    feedInplay.addEntityHandler(
      new OutrightScoreUpdateHandler(),
      OutrightScoreUpdate
    );

    feedInplay.addEntityHandler(
      new OutrightFixtureMarketUpdateHandler(),
      OutrightFixtureMarketUpdate
    );

    feedInplay.addEntityHandler(
      new OutrightSettlementsUpdateHandler(),
      OutrightSettlementsUpdate
    );

    feedInplay.addEntityHandler(new HeartbeatUpdateHandler(), HeartbeatUpdate);

    feedInplay.addEntityHandler(new KeepAliveUpdateHandler(), KeepAliveUpdate);

    feedInplay.addEntityHandler(
      new OutrightLeagueFixtureUpdateHandler(),
      OutrightLeagueFixtureUpdate
    );

    feedInplay.addEntityHandler(
      new OutrightLeagueMarketUpdateHandler(),
      OutrightLeagueMarketUpdate
    );

    process.on("exit" || "SIGINT", async (err) => {
      await feedInplay.stop();
      process.exit(1);
    });

    await feedInplay.start(true);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        return resolve();
      }, 5 * 1000);
    });

    await feedInplay.stop();
  } catch (err) {
    if (err instanceof ValidationError) {
      logger.error(`feed sample got err from ValidationError instance: ${err}`);
    }
    if (err instanceof ConversionError) {
      logger.error(`feed sample got err from ConversionError instance: ${err}`);
    }
    if (err instanceof ProcessingMessageError) {
      logger.error(
        `feed sample got err from ProcessingMessageError instance: ${err}`
      );
    }
    if (err instanceof RetryError) {
      logger.error(`feed sample got err from RetryError instance: ${err}`);
    }
  }
};

initSample();
