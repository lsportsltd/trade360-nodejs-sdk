import { isNil } from 'lodash';

import {
  DistributionRequest,
  HttpRequestDto,
  HttpResponsePayloadDto,
  IStartResponseBody,
  IStatusResponseBody,
  IStopResponseBody,
} from '@api';
import { TransformerUtil } from '@lsports/entities';
import { MQSettings } from '@feed';
import { ILogger } from '@logger';

export class DistributionUtil {
  private static requestApi?: DistributionRequest;

  private static logger?: ILogger;

  private static delayMs = 2000;

  constructor(settings: MQSettings, logger: ILogger) {
    DistributionUtil.requestApi = new DistributionRequest(
      TransformerUtil.deserialize(settings, HttpRequestDto),
      (DistributionUtil.logger = logger),
    );
  }

  static checkStatus = async (): Promise<
    | {
        httpStatusCode: number;
        isDistributionOn: boolean;
      }
    | undefined
  > => {
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
  };

  static start = async (): Promise<void> => {
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
  };

  static stop = async (): Promise<void> => {
    if (isNil(DistributionUtil.requestApi)) throw new Error('initialize distribution api first!');

    const stopRequest: HttpResponsePayloadDto<IStopResponseBody> | undefined =
      await DistributionUtil.requestApi.stopDistribution<IStopResponseBody>();

    if (!isNil(stopRequest) && !isNil(stopRequest.Body))
      DistributionUtil.logger?.debug(stopRequest.Body.Message);
  };
}
