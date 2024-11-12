import { isNil } from 'lodash';

import { MQSettingsOptions } from '@feed';
import { ILogger } from '@logger';
import {
  HttpRequestDto,
  HttpResponsePayloadDto,
  StartResponseBody,
  StatusResponseBody,
  StopResponseBody,
} from '@api/common';
import { CustomersApiFactory, IPackageDistributionHttpClient } from '@api/customers-api';

import { TransformerUtil } from './transformer-util';

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

    const distributionStatus: HttpResponsePayloadDto<StatusResponseBody> | undefined =
      await DistributionUtil.packageDistributionApi.getDistributionStatus<StatusResponseBody>(
        StatusResponseBody,
      );

    if (!isNil(distributionStatus) && !isNil(distributionStatus.body)) {
      const {
        header: { httpStatusCode },
        body: { isDistributionOn },
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

    const startRequest: HttpResponsePayloadDto<StartResponseBody> | undefined =
      await DistributionUtil.packageDistributionApi.startDistribution<StartResponseBody>(
        StartResponseBody,
      );

    if (!isNil(startRequest) && !isNil(startRequest.body))
      DistributionUtil.logger?.debug(startRequest.body.message);

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

    const stopRequest: HttpResponsePayloadDto<StopResponseBody> | undefined =
      await DistributionUtil.packageDistributionApi.stopDistribution<StopResponseBody>(
        StopResponseBody,
      );

    if (!isNil(stopRequest) && !isNil(stopRequest.body))
      DistributionUtil.logger?.debug(stopRequest.body.message);
  }
}
