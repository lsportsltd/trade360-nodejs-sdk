import { isNil } from "lodash";

import { BaseEntity } from "../entities";
import { IEntityHandler } from "./IEntityHandler";
import { IFeed } from "./IFeed";
import { MessageConsumerMQ } from "./mq-feed";
import { MQSettings } from "./types";
import { MqConnectionSettingsValidator } from "./vaildators";

import { DistributionRequest } from "../api";
import { DistributionUtil, withRetry } from "./utilies";

/**
 * Class that represesnts all Feed requests
 */
export class Feed implements IFeed {
  private consumerMq: IFeed;
  private requestApi?: DistributionRequest;
  private preConnectionAtStart: boolean = false;

  constructor(private mqSettings: MQSettings, private logger: Console) {
    MqConnectionSettingsValidator.validate(this.mqSettings);

    this.consumerMq = new MessageConsumerMQ(this.mqSettings, this.logger);

    // TODO: do we need to add initializer for distribution api?
  }

  public start = async (preConnectionAtStart: boolean = false) => {
    this.preConnectionAtStart = preConnectionAtStart;

    if (!isNil(this.preConnectionAtStart))
      await this.preConnectionInitialization();

    await this.consumerMq.start();
  };

  private preConnectionInitialization = async () => {
    const options = { maxAttempts: 5, delayMs: 2000, backoffFactor: 2 };

    new DistributionUtil(this.mqSettings, this.logger);

    const distributionStatus = await DistributionUtil.checkStatus();

    if (!isNil(distributionStatus)) {
      const { httpStatusCode, isDistributionOn } = distributionStatus;

      if (httpStatusCode >= 200 && httpStatusCode < 300 && !isDistributionOn) {
        this.logger.log(
          "Distribution flow is off, will trying to start the flow"
        );

        return await withRetry(
          async () => {
            await DistributionUtil.start();

            const distributionStatusAfterStartOperation =
              await DistributionUtil.checkStatus();

            if (
              !isNil(distributionStatusAfterStartOperation) &&
              distributionStatusAfterStartOperation.isDistributionOn
            ) {
              this.logger.log("Distribution is activated successfully");
              return;
            }
          },
          options,
          "Start distribution",
          this.logger
        );
      } else if (isDistributionOn) {
        this.logger.log("Distribution flow is already on");
      }
    }
  };

  public stop = async () => {
    await this.consumerMq.stop();

    if (!isNil(this.preConnectionAtStart)) await DistributionUtil.stop();
  };

  public addEntityHandler = async <TEntity extends BaseEntity>(
    entityHandler: IEntityHandler<TEntity>,
    entityConstructor: new () => TEntity
  ) => {
    await this.consumerMq.addEntityHandler(entityHandler, entityConstructor);
  };
}
