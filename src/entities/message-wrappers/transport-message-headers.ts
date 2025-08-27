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

    // Security: Safe property access with additional validation
    const value = this.safePropertyAccess(properties, key);
    const stringValue = this.convertToString(value, key);

    return this.validateFinalValue(stringValue, key, required);
  }

  private static safePropertyAccess(properties: Record<string, unknown>, key: string): unknown {
    // Additional security check: Verify property descriptor is safe
    const descriptor = Object.getOwnPropertyDescriptor(properties, key);
    if (!descriptor) {
      return undefined;
    }

    // Ensure the property is enumerable and has a simple value (not a getter)
    if (!descriptor.enumerable || typeof descriptor.get === 'function') {
      throw new Error(`Header '${key}' has unsafe property descriptor`);
    }

    // Safe access: we've validated the key and property descriptor
    return descriptor.value;
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
    // Handle null and undefined - these are valid for optional properties
    if (value === null || value === undefined) {
      return value; // Return as-is for proper handling in validation
    }

    const isValidType =
      typeof value === 'string' ||
      Buffer.isBuffer(value) ||
      typeof value === 'number' ||
      typeof value === 'boolean';

    if (!isValidType) {
      return Symbol('invalid'); // Use unique symbol to signal invalid type
    }

    return value;
  }

  private static convertToString(value: unknown, key: string): string {
    // Handle undefined (missing property)
    if (value === undefined) {
      return '';
    }

    // Handle null values - these should be treated as missing for validation
    if (value === null) {
      return '';
    }

    // Handle invalid type marker
    if (typeof value === 'symbol') {
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
