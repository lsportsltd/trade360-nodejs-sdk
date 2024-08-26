import { isNil, isNumber, isString } from "lodash";

import { ValidationError } from "../exceptions";
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
      requestedHeartbeatSeconds,
      networkRecoveryIntervalInMs,
    } = mqSettings;

    if (isNil(host) || !isString(host))
      throw new ValidationError("Host is required and need to be string");

    if (isNil(port) || !isNumber(port) || port <= 0)
      throw new ValidationError("Port must be a positive integer");

    if (isNil(virtualHost) || !isString(virtualHost))
      throw new ValidationError("VirtualHost is required");

    if (isNil(packageId) || !isNumber(packageId) || packageId <= 0)
      throw new ValidationError("PackageId must be a positive integer");

    if (isNil(userName) || !isString(userName))
      throw new ValidationError("UserName is required and need to be string");

    if (isNil(password) || !isString(password))
      throw new ValidationError("Password is required and need to be string");

    if (
      isNil(prefetchCount) ||
      !isNumber(prefetchCount) ||
      prefetchCount < +MIN_PREFETCH_COUNT
    )
      throw new ValidationError("PrefetchCount must be a positive integer");

    if (
      isNil(requestedHeartbeatSeconds) ||
      !isNumber(requestedHeartbeatSeconds) ||
      requestedHeartbeatSeconds <= +MIN_REQUESTED_HEARTBEAT_SECONDS
    )
      throw new ValidationError(
        "RequestedHeartbeatSeconds must be a positive integer - Larger then 10"
      );

    if (
      isNil(networkRecoveryIntervalInMs) ||
      !isNumber(networkRecoveryIntervalInMs) ||
      networkRecoveryIntervalInMs < +MIN_NETWORK_RECOVERY_INTERVAL_IN_MS
    )
      throw new ValidationError(
        "NetworkRecoveryInterval must be a positive integer"
      );
  }
}
