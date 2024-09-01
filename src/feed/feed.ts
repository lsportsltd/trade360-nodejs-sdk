import { plainToInstance } from "class-transformer";
import { isNil } from "lodash";

import { BaseEntity } from "../entities";
import { IEntityHandler } from "./IEntityHandler";
import { IFeed } from "./IFeed";
import { MessageConsumerMQ } from "./mq-feed";
import { MQSettings } from "./types";
import { MqConnectionSettingsValidator } from "./vaildators";

import {
  DistributionRequest,
  HttpRequestDto,
  HttpResponsePayloadDto,
  IStartResponseBody,
  IStatusResponseBody,
  IStopResponseBody,
} from "../api";

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
    const delayMilliseconds = 2000;

    this.requestApi = new DistributionRequest(
      plainToInstance(HttpRequestDto, this.mqSettings, {
        excludeExtraneousValues: true, // Change this to false if you want to keep all properties
        exposeUnsetFields: false,
      }),
      // this.mqSettings as HttpRequestDto,
      this.logger
    );

    const distributionStatus:
      | HttpResponsePayloadDto<IStatusResponseBody>
      | undefined =
      await this.requestApi.getDistributionStatus<IStatusResponseBody>();

    if (!isNil(distributionStatus) && !isNil(distributionStatus.Body)) {
      const {
        Header: { HttpStatusCode: httpStatusCode },
        Body: { IsDistributionOn: isDistributionOn },
      } = distributionStatus;

      if (httpStatusCode >= 200 && httpStatusCode < 300 && !isDistributionOn) {
        this.logger.log(
          "Distribution flow is off, will trying to start the flow"
        );

        const startRequest:
          | HttpResponsePayloadDto<IStartResponseBody>
          | undefined =
          await this.requestApi.startDistribution<IStartResponseBody>();

        if (!isNil(startRequest) && !isNil(startRequest.Body))
          this.logger.log(startRequest.Body.Message);

        await new Promise<void>((resolve) => {
          setTimeout(() => {
            return resolve();
          }, delayMilliseconds);
        });
      } else if (isDistributionOn) {
        this.logger.log("Distribution flow is already on");
      }
    }
  };

  public stop = async () => {
    await this.consumerMq.stop();

    if (!isNil(this.preConnectionAtStart)) await this.closeDistributionFlow();
  };

  private closeDistributionFlow = async () => {
    const stopRequest: HttpResponsePayloadDto<IStopResponseBody> | undefined =
      await this.requestApi?.stopDistribution<IStopResponseBody>();

    if (!isNil(stopRequest) && !isNil(stopRequest.Body))
      this.logger.log(stopRequest.Body.Message);
  };

  public addEntityHandler = async <TEntity extends BaseEntity>(
    entityHandler: IEntityHandler<TEntity>,
    entityConstructor: new () => TEntity
  ) => {
    await this.consumerMq.addEntityHandler(entityHandler, entityConstructor);
  };
}
