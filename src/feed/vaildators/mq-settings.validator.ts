import { MQSettingsOptions } from '@feed';
import { ValidationError } from '@lsports/errors';

import { MQSettingsSchema } from './mq-settings.schema';

/**
 * Class for validate that the configure mq setting
 * is valid. Use MQSettingsSchema to parse and validate
 * data.
 */
export class MqConnectionSettingsValidator {
  /**
   * Validate the mqSettings object using the
   * MQSettingsSchema.
   * @param mqSettings the mqSettings object to validate
   * @returns the validated mqSettings object as
   * MQSettingsOptions type if the object is valid and
   * the validation passes successfully without errors or
   * exceptions thrown by the schema parser and validator
   * @throws ValidationError if the mqSettings object is
   * invalid and the validation fails with errors or
   * exceptions thrown by the schema parser and validator
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
