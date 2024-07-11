import { isNil, isNumber, isString } from "lodash";
import { HttpRequestDto } from "../../common";

/**
 * Class for vaildate that the configure request setting is vaild
 */
export class RequestSettingsValidator {
  public static validate(requestSettings: HttpRequestDto) {
    const {
      PackageId,
      UserName,
      Password,
    } = requestSettings;

    if (isNil(PackageId) || !isNumber(PackageId) || PackageId <= 0)
      throw new Error("PackageId must be a positive integer");

    if (isNil(UserName) || !isString(UserName))
      throw new Error("UserName is required and need to be string");

    if (isNil(Password) || !isString(Password))
      throw new Error("Password is required and need to be string");
  }
}
