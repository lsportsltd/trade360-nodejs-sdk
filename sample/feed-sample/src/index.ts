import {
  ConversionError,
  Feed,
  FixtureMetadataUpdate,
  LivescoreUpdate,
  MarketUpdate,
  OutrightFixtureUpdate,
  SettlementUpdate,
  ValidationError,
} from "trade360-nodejs-sdk";

import { getConfig } from "./config";
import {
  FixtureMetadataUpdateHandler,
  LivescoreUpdateHandler,
  MarketUpdateHandler,
  OutrightFixtureUpdateHandler,
  SettlementUpdateHandler,
} from "./handler";

// Load configuration
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

    process.on("exit" || "SIGINT", async (err) => {
      await feedInplay.stop();
      process.exit(1);
    });

    await feedInplay.start();

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        return resolve();
      }, 120 * 1000);
    });

    await feedInplay.stop();
  } catch (err) {
    if (err instanceof ValidationError) {
      logger.error(`feed sample got err from ValidationError instance: ${err}`);
    }
    if (err instanceof ConversionError) {
      logger.error(`feed sample got err from ConversionError instance: ${err}`);
    }
  }
};

initSample();
