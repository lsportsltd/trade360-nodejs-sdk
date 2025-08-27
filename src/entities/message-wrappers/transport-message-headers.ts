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
    this.validateKey(key);

    if (!Object.prototype.hasOwnProperty.call(properties, key)) {
      return this.handleMissingProperty(key, required);
    }

    const value = this.extractValidValue(properties[key]);
    const stringValue = this.convertToString(value, key);

    return this.validateFinalValue(stringValue, key, required);
  }

  private static validateKey(key: string): void {
    if (!this.ALLOWED_KEYS.has(key)) {
      throw new Error(`Invalid property key: '${key}'. Only predefined header keys are allowed.`);
    }
  }

  private static handleMissingProperty(key: string, required: boolean): string {
    if (required) {
      throw new Error(`Header '${key}' is missing, null, or empty in message properties object.`);
    }
    return '';
  }

  private static extractValidValue(value: unknown): unknown {
    if (value === null || value === undefined) {
      return undefined;
    }

    const isValidType =
      typeof value === 'string' ||
      Buffer.isBuffer(value) ||
      typeof value === 'number' ||
      typeof value === 'boolean';

    if (!isValidType) {
      return null; // Signal invalid type for error handling
    }

    return value;
  }

  private static convertToString(value: unknown, key: string): string {
    if (value === undefined) {
      return '';
    }

    if (value === null) {
      throw new Error(
        `Header '${key}' contains invalid data type. Only primitive values are allowed.`,
      );
    }

    if (Buffer.isBuffer(value)) {
      return value.toString('utf8');
    }

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }

    throw new Error(
      `Header '${key}' contains invalid data type. Only primitive values are allowed.`,
    );
  }

  private static validateFinalValue(stringValue: string, key: string, required: boolean): string {
    if (required && (!stringValue || stringValue.trim() === '')) {
      throw new Error(`Header '${key}' is missing, null, or empty in message properties object.`);
    }

    return stringValue || '';
  }
}
