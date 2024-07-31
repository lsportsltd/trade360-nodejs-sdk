import { Feed, FixtureMetadataUpdate } from "trade360-nodejs-sdk";

import { getConfig } from "./config";
import { FixtureMetadataUpdateHandler } from "./handler";

// Load configuration
const config = getConfig();

let logger = console;

const initSample = async () => {
  const feedInplay = new Feed(config.Trade360.InplayMQSettings!, logger);
  // const feedPrematch = Feed(config.Trade360.PrematchMQSettings, logger);

  // feedInplay.addEntityHandler((msg: any) => {
  //   logger.log(`got new message:\n${JSON.stringify(msg)}\n`);
  // });

  feedInplay.addEntityHandler(
    new FixtureMetadataUpdateHandler(),
    FixtureMetadataUpdate
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
};

initSample();
