import { isNil } from 'lodash';

import {
  DistributionRequest,
  HttpRequestDto,
  HttpResponsePayloadDto,
  IStartResponseBody,
  IStatusResponseBody,
  IStopResponseBody,
} from '@api';
import { MQSettingsOptions } from '@feed';
import { ILogger } from '@logger';
import { TransformerUtil } from '@lsports/entities';

export class DistributionUtil {
  private static requestApi?: DistributionRequest;

  private static logger?: ILogger;

  private static delayMs = 2000;

  constructor(settings: MQSettingsOptions, logger: ILogger) {
    DistributionUtil.requestApi = new DistributionRequest(
      TransformerUtil.deserialize(settings, HttpRequestDto),
      (DistributionUtil.logger = logger),
    );
  }

  static async checkStatus(): Promise<
    | {
        httpStatusCode: number;
        isDistributionOn: boolean;
      }
    | undefined
  > {
    if (isNil(DistributionUtil.requestApi)) throw new Error('initialize distribution api first!');

    const distributionStatus: HttpResponsePayloadDto<IStatusResponseBody> | undefined =
      await DistributionUtil.requestApi.getDistributionStatus<IStatusResponseBody>();

    if (!isNil(distributionStatus) && !isNil(distributionStatus.Body)) {
      const {
        Header: { HttpStatusCode: httpStatusCode },
        Body: { IsDistributionOn: isDistributionOn },
      } = distributionStatus;

      return { httpStatusCode, isDistributionOn };
    }
  }

  static async start(): Promise<void> {
    if (isNil(DistributionUtil.requestApi)) throw new Error('initialize distribution api first!');

    const startRequest: HttpResponsePayloadDto<IStartResponseBody> | undefined =
      await DistributionUtil.requestApi.startDistribution<IStartResponseBody>();

    if (!isNil(startRequest) && !isNil(startRequest.Body))
      DistributionUtil.logger?.debug(startRequest.Body.Message);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        return resolve();
      }, DistributionUtil.delayMs);
    });
  }

  static async stop(): Promise<void> {
    if (isNil(DistributionUtil.requestApi)) throw new Error('initialize distribution api first!');

    const stopRequest: HttpResponsePayloadDto<IStopResponseBody> | undefined =
      await DistributionUtil.requestApi.stopDistribution<IStopResponseBody>();

    if (!isNil(stopRequest) && !isNil(stopRequest.Body))
      DistributionUtil.logger?.debug(stopRequest.Body.Message);
  }
}
