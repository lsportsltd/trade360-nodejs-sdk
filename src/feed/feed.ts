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
} from "../api";

/**
 * Class that represesnts all Feed requests
 */
export class Feed implements IFeed {
  private consumerMq: IFeed;
  private requestApi?: DistributionRequest;

  constructor(private mqSettings: MQSettings, private logger: Console) {
    MqConnectionSettingsValidator.validate(this.mqSettings);

    this.consumerMq = new MessageConsumerMQ(this.mqSettings, this.logger);

    // TODO: do we need to add initializer for distribution api?
  }

  public start = async (preConnectionAtStart?: boolean) => {
    if (!isNil(preConnectionAtStart)) {
      await this.preConnectionInitialization();
    }

    await this.consumerMq.start(preConnectionAtStart);
  };

  private preConnectionInitialization = async () => {
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
        const startRequest:
          | HttpResponsePayloadDto<IStartResponseBody>
          | undefined =
          await this.requestApi.startDistribution<IStartResponseBody>();

        if (!isNil(startRequest) && !isNil(startRequest.Body))
          this.logger.log(startRequest.Body.Message);
      }
    }
  };

  public stop = async () => {
    await this.consumerMq.stop();
  };

  public addEntityHandler = async <TEntity extends BaseEntity>(
    entityHandler: IEntityHandler<TEntity>,
    entityConstructor: new () => TEntity
  ) => {
    await this.consumerMq.addEntityHandler(entityHandler, entityConstructor);
  };
}
