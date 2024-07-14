import { isNil, isNumber, isString } from "lodash";

import {
  MIN_NETWORK_RECOVERY_INTERVAL_IN_MS,
  MIN_PREFETCH_COUNT,
  MIN_REQUESTED_HEARTBEAT_SECONDS,
  MQSettings,
} from "../types";
import { ValidationError } from "../exeptions";

/**
 * Class for vaildate that the configure mq setting is vaild
 */
export class MqConnectionSettingsValidator {
  public static validate(mqSettings: MQSettings) {
    const {
      Host,
      Port,
      VirtualHost,
      PackageId,
      UserName,
      Password,
      PrefetchCount,
      RequestedHeartbeatSeconds,
      NetworkRecoveryIntervalInMs,
    } = mqSettings;

    if (isNil(Host) || !isString(Host)) 
      throw new ValidationError("Host is required and need to be string");

    if (isNil(Port) || !isNumber(Port) || Port <= 0)
      throw new ValidationError("Port must be a positive integer");

    if (isNil(VirtualHost) || !isString(VirtualHost))
      throw new ValidationError("VirtualHost is required");

    if (isNil(PackageId) || !isNumber(PackageId) || PackageId <= 0)
      throw new ValidationError("PackageId must be a positive integer");

    if (isNil(UserName) || !isString(UserName))
      throw new ValidationError("UserName is required and need to be string");

    if (isNil(Password) || !isString(Password))
      throw new ValidationError("Password is required and need to be string");

    if (
      isNil(PrefetchCount) ||
      !isNumber(PrefetchCount) ||
      PrefetchCount < +MIN_PREFETCH_COUNT
    )
      throw new ValidationError("PrefetchCount must be a positive integer");

    if (
      isNil(RequestedHeartbeatSeconds) ||
      !isNumber(RequestedHeartbeatSeconds) ||
      RequestedHeartbeatSeconds <= +MIN_REQUESTED_HEARTBEAT_SECONDS
    )
      throw new ValidationError(
        "RequestedHeartbeatSeconds must be a positive integer - Larger then 10"
      );

    if (
      isNil(NetworkRecoveryIntervalInMs) ||
      !isNumber(NetworkRecoveryIntervalInMs) ||
      NetworkRecoveryIntervalInMs < +MIN_NETWORK_RECOVERY_INTERVAL_IN_MS
    )
      throw new ValidationError("NetworkRecoveryInterval must be a positive integer");
  }
}
