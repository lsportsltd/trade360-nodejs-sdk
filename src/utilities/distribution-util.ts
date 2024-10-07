import { isNil } from 'lodash';

import { MQSettingsOptions } from '@feed';
import { ILogger } from '@logger';
import { TransformerUtil } from '@lsports/entities';
import {
  HttpRequestDto,
  HttpResponsePayloadDto,
  IStartResponseBody,
  IStatusResponseBody,
  IStopResponseBody,
} from '@api/common';
import { CustomersApiFactory, IPackageDistributionHttpClient } from '@api/customers-api';

/**
 * Utility class for distribution operations such as starting and stopping distribution
 * and checking the status of the distribution service through the API request object.
 */
export class DistributionUtil {
  private static packageDistributionApi?: IPackageDistributionHttpClient;

  private static logger?: ILogger;

  private static delayMs = 2000;

  constructor(settings: MQSettingsOptions, logger: ILogger) {
    const customersApiFactory = new CustomersApiFactory();

    DistributionUtil.packageDistributionApi =
      customersApiFactory.createPackageDistributionHttpClient({
        packageCredentials: TransformerUtil.transform(settings, HttpRequestDto),
        customersApiBaseUrl: settings.customersApiBaseUrl,
        logger: (DistributionUtil.logger = logger),
      });
  }

  /**
   * Check the status of the distribution service through the API request object.
   * @returns the status of the distribution service
   */
  static async checkStatus(): Promise<
    | {
        httpStatusCode: number;
        isDistributionOn: boolean;
      }
    | undefined
  > {
    if (isNil(DistributionUtil.packageDistributionApi))
      throw new Error('initialize distribution api first!');

    const distributionStatus: HttpResponsePayloadDto<IStatusResponseBody> | undefined =
      await DistributionUtil.packageDistributionApi.getDistributionStatus<IStatusResponseBody>();

    if (!isNil(distributionStatus) && !isNil(distributionStatus.Body)) {
      const {
        Header: { HttpStatusCode: httpStatusCode },
        Body: { IsDistributionOn: isDistributionOn },
      } = distributionStatus;

      return { httpStatusCode, isDistributionOn };
    }
  }

  /**
   * Start the distribution service through the API request object. This method will wait for a delay before resolving.
   * @returns a promise that resolves when the distribution service is started after the delay has passed successfully
   */
  static async start(): Promise<void> {
    if (isNil(DistributionUtil.packageDistributionApi))
      throw new Error('initialize distribution api first!');

    const startRequest: HttpResponsePayloadDto<IStartResponseBody> | undefined =
      await DistributionUtil.packageDistributionApi.startDistribution<IStartResponseBody>();

    if (!isNil(startRequest) && !isNil(startRequest.Body))
      DistributionUtil.logger?.debug(startRequest.Body.Message);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        return resolve();
      }, DistributionUtil.delayMs);
    });
  }

  /**
   * Stop the distribution service through the API request object. This method will wait for a delay before resolving.
   * @returns a promise that resolves when the distribution service is stopped after the delay has passed successfully
   */
  static async stop(): Promise<void> {
    if (isNil(DistributionUtil.packageDistributionApi))
      throw new Error('initialize distribution api first!');

    const stopRequest: HttpResponsePayloadDto<IStopResponseBody> | undefined =
      await DistributionUtil.packageDistributionApi.stopDistribution<IStopResponseBody>();

    if (!isNil(stopRequest) && !isNil(stopRequest.Body))
      DistributionUtil.logger?.debug(stopRequest.Body.Message);
  }
}
