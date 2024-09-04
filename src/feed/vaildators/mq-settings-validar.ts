import { isNil, isNumber, isString } from "lodash";

import { ValidationError } from "../../common";
import {
  MIN_NETWORK_RECOVERY_INTERVAL_IN_MS,
  MIN_PREFETCH_COUNT,
  MIN_REQUESTED_HEARTBEAT_SECONDS,
  MQSettings,
} from "../types";

/**
 * Class for vaildate that the configure mq setting is vaild
 */
export class MqConnectionSettingsValidator {
  public static validate(mqSettings: MQSettings) {
    const {
      host,
      port,
      virtualHost,
      packageId,
      userName,
      password,
      prefetchCount,
      networkRecoveryIntervalInMs,
      consumptionLatencyThreshold,
      requestedHeartbeatSeconds,
    } = mqSettings;

    if (isNil(host) || !isString(host))
      throw new ValidationError("host is required and need to be string");

    if (isNil(port) || !isNumber(port) || port <= 0)
      throw new ValidationError("port must be a positive integer");

    if (isNil(virtualHost) || !isString(virtualHost))
      throw new ValidationError("virtualHost is required");

    if (isNil(packageId) || !isNumber(packageId) || packageId <= 0)
      throw new ValidationError("packageId must be a positive integer");

    if (isNil(userName) || !isString(userName))
      throw new ValidationError("userName is required and need to be string");

    if (isNil(password) || !isString(password))
      throw new ValidationError("password is required and need to be string");

    if (
      isNil(prefetchCount) ||
      !isNumber(prefetchCount) ||
      prefetchCount < +MIN_PREFETCH_COUNT
    )
      throw new ValidationError(
        `prefetchCount must be a positive integer - larger then ${MIN_PREFETCH_COUNT}`
      );

    if (
      isNil(requestedHeartbeatSeconds) ||
      !isNumber(requestedHeartbeatSeconds) ||
      requestedHeartbeatSeconds <= +MIN_REQUESTED_HEARTBEAT_SECONDS
    )
      throw new ValidationError(
        `requestedHeartbeatSeconds must be a positive integer - larger then ${requestedHeartbeatSeconds}`
      );

    if (
      isNil(networkRecoveryIntervalInMs) ||
      !isNumber(networkRecoveryIntervalInMs) ||
      networkRecoveryIntervalInMs < +MIN_NETWORK_RECOVERY_INTERVAL_IN_MS
    )
      throw new ValidationError(
        `networkRecoveryInterval must be a positive integer - larger then ${MIN_NETWORK_RECOVERY_INTERVAL_IN_MS}`
      );

    if (
      (!isNil(consumptionLatencyThreshold) &&
        !isNumber(consumptionLatencyThreshold)) ||
      consumptionLatencyThreshold <= 0
    )
      throw new ValidationError(
        "consumptionLatencyThreshold must be a positive integer"
      );
  }
}
