import { MQSettingsOptions, MQSettingsSchema } from '@feed';
import { ValidationError } from '@lsports/errors';

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
      throw new ValidationError('Failed validate mq settings', {
        context: JSON.parse(JSON.stringify(error.errors)),
      });
    }
  }
}
