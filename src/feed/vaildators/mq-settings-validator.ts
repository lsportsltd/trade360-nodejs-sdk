import { MQSettingsOptions } from '@feed';
import { ValidationError } from '@lsports/errors';

import { MQSettingsSchema } from './mq-settings-schema';

/**
 * Class for vaildate that the configure mq setting is vaild.
 * Use MQSettingsSchema to parse and validate data.
 */
export class MqConnectionSettingsValidator {
  /**
   * Validate the mqSettings object using the MQSettingsSchema.
   * @param mqSettings the mqSettings object to validate
   * @returns the validated mqSettings object
   * @throws ValidationError if the mqSettings object is invalid
   */
  public static validate(mqSettings: unknown): MQSettingsOptions {
    const { success, data, error } = MQSettingsSchema.safeParse(mqSettings);

    if (success) {
      return data;
    } else {
      throw new ValidationError('Configuration settings validation failed', {
        context: JSON.parse(JSON.stringify(error.errors)),
      });
    }
  }
}
