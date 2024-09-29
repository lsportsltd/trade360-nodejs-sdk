import { ValidationError } from '@lsports/errors';

import { HttpRequest, HttpRequestSchema } from './request-settings-schema';

/**
 * Class for vaildate that the configure request setting is vaild
 * Use HttpRequestSchema to parse and validate data.
 */
export class RequestSettingsValidator {
  /**
   * Validate the requestSettings object using the HttpRequestSchema.
   * @param requestSettings the requestSettings object to validate
   * @returns the validated requestSettings object
   * @throws ValidationError if the requestSettings object is invalid
   */
  public static validate(requestSettings: unknown): HttpRequest {
    const { success, data, error } = HttpRequestSchema.safeParse(requestSettings);

    if (success) {
      return data;
    } else {
      throw new ValidationError('Failed validate request settings', {
        context: JSON.parse(JSON.stringify(error.errors)),
      });
    }
  }
}
