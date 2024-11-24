import { ValidationError } from '@lsports/errors';

import { HttpRequestSettings, HttpRequestSettingsSchema } from './request-settings.schema';

/**
 * Class for validate that the configure request
 * setting is valid. Use HttpRequestSchema to
 * parse and validate data.
 */
export class RequestSettingsValidator {
  /**
   * Validate the requestSettings object using the
   * HttpRequestSchema.
   * @param requestSettings the requestSettings
   * object to validate
   * @returns the validated HttpRequestSettings
   * object
   * @throws ValidationError if the requestSettings
   * object is invalid or does not match the schema
   * definition in HttpRequestSettingsSchema object
   * @see HttpRequestSettingsSchema
   */
  public static validate(requestSettings: unknown): HttpRequestSettings {
    const { success, data, error } = HttpRequestSettingsSchema.safeParse(requestSettings);

    if (success) {
      return data;
    } else {
      const errorsStringified = JSON.stringify(error.errors);

      throw new ValidationError('Request Settings', {
        context: JSON.parse(errorsStringified),
      });
    }
  }
}
