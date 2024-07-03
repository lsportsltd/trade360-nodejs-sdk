import { Feed } from "trade360-nodejs-sdk";

import { getConfig } from "./config";

// Load configuration
const config = getConfig();

let logger = console;

const initSample = async () => {
  const feedInplay = new Feed(config.Trade360.InplayMQSettings, logger);
  // const feedPrematch = Feed(config.Trade360.PrematchMQSettings, logger);

  feedInplay.addEntityHandler((msg: any) => {
    logger.log(`got new message:\n${JSON.stringify(msg)}\n`);
  });

  await feedInplay.start();

  process.on("exit" || "SIGINT", async () => {
    await feedInplay.stop();
    process.exit(1);
  });

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      return resolve();
    }, 30 * 1000);
  });

  await feedInplay.stop();
};

initSample();
