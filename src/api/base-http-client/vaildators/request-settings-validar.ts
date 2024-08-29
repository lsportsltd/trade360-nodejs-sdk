import { isNil, isNumber, isString } from "lodash";
import { HttpRequestDto } from "../../common";

/**
 * Class for vaildate that the configure request setting is vaild
 */
export class RequestSettingsValidator {
  public static validate(requestSettings: HttpRequestDto) {
    const { packageId, userName, password } = requestSettings;

    if (isNil(packageId) || !isNumber(packageId) || packageId <= 0)
      throw new Error("packageId must be a positive integer");

    if (isNil(userName) || !isString(userName))
      throw new Error("UserName is required and need to be string");

    if (isNil(password) || !isString(password))
      throw new Error("Password is required and need to be string");
  }
}
