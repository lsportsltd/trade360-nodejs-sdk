import { MQSettingsOptions } from '@feed';
import { ValidationError } from '@lsports/errors';

import { MQSettingsSchema } from './mq-settings-schema';

/**
 * Class for vaildate that the configure mq setting is vaild.
 * Use MQSettingsSchema to parse and validate data.
 */
export class MqConnectionSettingsValidator {
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
