import { HttpRequest, HttpRequestSchema } from '@api/common';
import { ValidationError } from '@lsports/errors';

/**
 * Class for vaildate that the configure request setting is vaild
 * Use HttpRequestSchema to parse and validate data.
 */
export class RequestSettingsValidator {
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
