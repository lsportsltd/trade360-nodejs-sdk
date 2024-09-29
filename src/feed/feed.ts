import { isNil } from 'lodash';

import { BaseEntity } from '@entities';
import { IEntityHandler, IFeed, MQSettingsOptions } from '@feed';
import { ConsoleAdapter, ILogger } from '@logger';
import { DistributionUtil, withRetry } from '@utilities';

import { MessageConsumerMQ } from './mq-feed';
import { MqConnectionSettingsValidator } from './vaildators';

/**
 * Class that represesnts all Feed requests
 */
export class Feed implements IFeed {
  private consumerMq: IFeed;

  private preConnectionAtStart: boolean = false;

  private mqSettings: MQSettingsOptions;

  constructor(
    mqSettings: unknown,
    private logger: ILogger = new ConsoleAdapter(),
  ) {
    this.mqSettings = MqConnectionSettingsValidator.validate(mqSettings);

    this.consumerMq = new MessageConsumerMQ(this.mqSettings, this.logger);
  }

  setLogger(logger: ILogger): void {
    this.logger = logger;
  }

  public async start(preConnectionAtStart: boolean = false): Promise<void> {
    this.preConnectionAtStart = preConnectionAtStart;

    if (this.preConnectionAtStart) await this.preConnectionInitialization();

    await this.consumerMq.start();
  }

  private async preConnectionInitialization(): Promise<void> {
    const options = { maxAttempts: 5, delayMs: 2000, backoffFactor: 2 };

    new DistributionUtil(this.mqSettings, this.logger);

    const distributionStatus = await DistributionUtil.checkStatus();

    if (!isNil(distributionStatus)) {
      const { httpStatusCode, isDistributionOn } = distributionStatus;

      if (httpStatusCode >= 200 && httpStatusCode < 300 && !isDistributionOn) {
        this.logger.info('Distribution flow is off, will trying to start the flow');

        return withRetry(
          async () => {
            await DistributionUtil.start();

            const distributionStatusAfterStartOperation = await DistributionUtil.checkStatus();

            if (
              !isNil(distributionStatusAfterStartOperation) &&
              distributionStatusAfterStartOperation.isDistributionOn
            ) {
              this.logger.info('Distribution is activated successfully');
              return;
            }
          },
          options,
          'Start distribution',
          this.logger,
        );
      } else if (isDistributionOn) {
        this.logger.info('Distribution flow is already on');
      }
    }
  }

  public async stop(): Promise<void> {
    await this.consumerMq.stop();

    if (this.preConnectionAtStart) await DistributionUtil.stop();
  }

  public async addEntityHandler<TEntity extends BaseEntity>(
    entityHandler: IEntityHandler<TEntity>,
    entityConstructor: new () => TEntity,
  ): Promise<void> {
    await this.consumerMq.addEntityHandler(entityHandler, entityConstructor);
  }
}
