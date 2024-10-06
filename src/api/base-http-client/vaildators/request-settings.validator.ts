import { ValidationError } from '@lsports/errors';

import { HttpRequestSettings, HttpRequestSettingsSchema } from './request-settings.schema';

/**
 * Class for vaildate that the configure request setting is vaild
 * Use HttpRequestSchema to parse and validate data.
 */
export class RequestSettingsValidator {
  /**
   * Validate the requestSettings object using the HttpRequestSchema.
   * @param requestSettings the requestSettings object to validate
   * @returns the validated HttpRequestSettings object
   * @throws ValidationError if the HttpRequestSettings object is invalid
   */
  public static validate(requestSettings: unknown): HttpRequestSettings {
    const { success, data, error } = HttpRequestSettingsSchema.safeParse(requestSettings);

    if (success) {
      return data;
    } else {
      throw new ValidationError('Failed validate request settings', {
        context: JSON.parse(JSON.stringify(error.errors)),
      });
    }
  }
}
