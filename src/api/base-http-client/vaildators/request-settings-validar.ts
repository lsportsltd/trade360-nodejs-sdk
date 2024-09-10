import { isNil, isNumber, isString } from "lodash";

import { HttpRequestDto } from "@api/common";
import { ValidationError } from "@lsports/exceptions";

/**
 * Class for vaildate that the configure request setting is vaild
 */
export class RequestSettingsValidator {
  public static validate(requestSettings: HttpRequestDto) {
    const { packageId, userName, password } = requestSettings;

    if (isNil(packageId) || !isNumber(packageId) || packageId <= 0)
      throw new ValidationError("packageId must be a positive integer");

    if (isNil(userName) || !isString(userName))
      throw new ValidationError("UserName is required and need to be string");

    if (isNil(password) || !isString(password))
      throw new ValidationError("Password is required and need to be string");
  }
}
