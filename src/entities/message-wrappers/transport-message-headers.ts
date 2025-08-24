export class TransportMessageHeaders {
  private static readonly MESSAGE_GUID_KEY = 'MessageGuid';

  private static readonly MESSAGE_TYPE_KEY = 'MessageType';

  private static readonly TIMESTAMP_IN_MS_KEY = 'timestamp_in_ms';

  private static readonly MESSAGE_SEQUENCE_KEY = 'MessageSequence';

  private static readonly FIXTURE_ID_KEY = 'FixtureId';

  private static readonly ALLOWED_KEYS = new Set([
    TransportMessageHeaders.MESSAGE_GUID_KEY,
    TransportMessageHeaders.MESSAGE_TYPE_KEY,
    TransportMessageHeaders.TIMESTAMP_IN_MS_KEY,
    TransportMessageHeaders.MESSAGE_SEQUENCE_KEY,
    TransportMessageHeaders.FIXTURE_ID_KEY,
  ]);

  public messageType!: string;

  public messageSequence!: string;

  public messageGuid!: string;

  public fixtureId!: string;

  public timestampInMs!: string;

  public static createFromProperties(properties: Record<string, unknown>): TransportMessageHeaders {
    if (!properties) {
      throw new Error('Properties parameter cannot be null or undefined');
    }

    const headers = new TransportMessageHeaders();
    headers.messageGuid = this.getRequiredProperty(properties, this.MESSAGE_GUID_KEY);
    headers.messageType = this.getRequiredProperty(properties, this.MESSAGE_TYPE_KEY);
    headers.timestampInMs = this.getRequiredProperty(properties, this.TIMESTAMP_IN_MS_KEY);
    headers.messageSequence = this.getRequiredProperty(
      properties,
      this.MESSAGE_SEQUENCE_KEY,
      false,
    );
    headers.fixtureId = this.getRequiredProperty(properties, this.FIXTURE_ID_KEY, false);

    return headers;
  }

  private static getRequiredProperty(
    properties: Record<string, unknown>,
    key: string,
    required: boolean = true,
  ): string {
    if (!this.ALLOWED_KEYS.has(key)) {
      throw new Error(`Invalid property key: '${key}'. Only predefined header keys are allowed.`);
    }
    
    const value = properties[key];

    if (value === null || value === undefined) {
      if (required) {
        throw new Error(`Header '${key}' is missing, null, or empty in message properties object.`);
      }
      return '';
    }

    let stringValue: string;
    if (Buffer.isBuffer(value)) {
      stringValue = value.toString('utf8');
    } else {
      stringValue = String(value);
    }

    if (required && (!stringValue || stringValue.trim() === '')) {
      throw new Error(`Header '${key}' is missing, null, or empty in message properties object.`);
    }

    return stringValue || '';
  }
}
