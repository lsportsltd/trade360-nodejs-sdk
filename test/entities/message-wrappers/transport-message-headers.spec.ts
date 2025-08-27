import { TransportMessageHeaders } from '../../../src/entities/message-wrappers/transport-message-headers';

describe('TransportMessageHeaders', () => {
  describe('createFromProperties', () => {
    it('should create TransportMessageHeaders with all required properties', () => {
      const properties = {
        MessageGuid: 'test-guid-123',
        MessageType: 'MarketUpdate',
        timestamp_in_ms: '1640995200000',
        MessageSequence: 'seq-456',
        FixtureId: 'fixture-789',
      };

      const headers = TransportMessageHeaders.createFromProperties(properties);

      expect(headers.messageGuid).toBe('test-guid-123');
      expect(headers.messageType).toBe('MarketUpdate');
      expect(headers.timestampInMs).toBe('1640995200000');
      expect(headers.messageSequence).toBe('seq-456');
      expect(headers.fixtureId).toBe('fixture-789');
    });

    it('should create TransportMessageHeaders with only required properties', () => {
      const properties = {
        MessageGuid: 'test-guid-123',
        MessageType: 'HeartbeatUpdate',
        timestamp_in_ms: '1640995200000',
      };

      const headers = TransportMessageHeaders.createFromProperties(properties);

      expect(headers.messageGuid).toBe('test-guid-123');
      expect(headers.messageType).toBe('HeartbeatUpdate');
      expect(headers.timestampInMs).toBe('1640995200000');
      expect(headers.messageSequence).toBe('');
      expect(headers.fixtureId).toBe('');
    });

    it('should handle Buffer values correctly', () => {
      const properties = {
        MessageGuid: Buffer.from('test-guid-buffer', 'utf8'),
        MessageType: Buffer.from('MarketUpdate', 'utf8'),
        timestamp_in_ms: Buffer.from('1640995200000', 'utf8'),
      };

      const headers = TransportMessageHeaders.createFromProperties(properties);

      expect(headers.messageGuid).toBe('test-guid-buffer');
      expect(headers.messageType).toBe('MarketUpdate');
      expect(headers.timestampInMs).toBe('1640995200000');
    });

    it('should handle non-string values by converting to string', () => {
      const properties = {
        MessageGuid: 12345,
        MessageType: true,
        timestamp_in_ms: 1640995200000,
      };

      const headers = TransportMessageHeaders.createFromProperties(properties);

      expect(headers.messageGuid).toBe('12345');
      expect(headers.messageType).toBe('true');
      expect(headers.timestampInMs).toBe('1640995200000');
    });

    it('should throw error when properties parameter is null', () => {
      expect(() => {
        TransportMessageHeaders.createFromProperties(null as any);
      }).toThrow('Properties parameter cannot be null or undefined');
    });

    it('should throw error when properties parameter is undefined', () => {
      expect(() => {
        TransportMessageHeaders.createFromProperties(undefined as any);
      }).toThrow('Properties parameter cannot be null or undefined');
    });

    it('should throw error when required MessageGuid is missing', () => {
      const properties = {
        MessageType: 'MarketUpdate',
        timestamp_in_ms: '1640995200000',
      };

      expect(() => {
        TransportMessageHeaders.createFromProperties(properties);
      }).toThrow("Header 'MessageGuid' is missing, null, or empty in message properties object.");
    });

    it('should throw error when required MessageType is missing', () => {
      const properties = {
        MessageGuid: 'test-guid-123',
        timestamp_in_ms: '1640995200000',
      };

      expect(() => {
        TransportMessageHeaders.createFromProperties(properties);
      }).toThrow("Header 'MessageType' is missing, null, or empty in message properties object.");
    });

    it('should throw error when required timestamp_in_ms is missing', () => {
      const properties = {
        MessageGuid: 'test-guid-123',
        MessageType: 'MarketUpdate',
      };

      expect(() => {
        TransportMessageHeaders.createFromProperties(properties);
      }).toThrow(
        "Header 'timestamp_in_ms' is missing, null, or empty in message properties object.",
      );
    });

    it('should throw error when required property is null', () => {
      const properties = {
        MessageGuid: null,
        MessageType: 'MarketUpdate',
        timestamp_in_ms: '1640995200000',
      };

      expect(() => {
        TransportMessageHeaders.createFromProperties(properties);
      }).toThrow("Header 'MessageGuid' is missing, null, or empty in message properties object.");
    });

    it('should throw error when required property is empty string', () => {
      const properties = {
        MessageGuid: '',
        MessageType: 'MarketUpdate',
        timestamp_in_ms: '1640995200000',
      };

      expect(() => {
        TransportMessageHeaders.createFromProperties(properties);
      }).toThrow("Header 'MessageGuid' is missing, null, or empty in message properties object.");
    });

    it('should throw error when required property is whitespace only', () => {
      const properties = {
        MessageGuid: '   ',
        MessageType: 'MarketUpdate',
        timestamp_in_ms: '1640995200000',
      };

      expect(() => {
        TransportMessageHeaders.createFromProperties(properties);
      }).toThrow("Header 'MessageGuid' is missing, null, or empty in message properties object.");
    });

    it('should return empty string for optional properties when null', () => {
      const properties = {
        MessageGuid: 'test-guid-123',
        MessageType: 'MarketUpdate',
        timestamp_in_ms: '1640995200000',
        MessageSequence: null,
        FixtureId: undefined,
      };

      const headers = TransportMessageHeaders.createFromProperties(properties);

      expect(headers.messageSequence).toBe('');
      expect(headers.fixtureId).toBe('');
    });

    it('should return empty string for optional properties when empty string', () => {
      const properties = {
        MessageGuid: 'test-guid-123',
        MessageType: 'MarketUpdate',
        timestamp_in_ms: '1640995200000',
        MessageSequence: '',
        FixtureId: '   ',
      };

      const headers = TransportMessageHeaders.createFromProperties(properties);

      expect(headers.messageSequence).toBe('');
      expect(headers.fixtureId).toBe('   '); // Optional properties don't get trimmed, only validated if required
    });

    it('should handle mixed property types correctly', () => {
      const properties = {
        MessageGuid: 'test-guid-123',
        MessageType: Buffer.from('MarketUpdate', 'utf8'),
        timestamp_in_ms: 1640995200000,
        MessageSequence: null,
        FixtureId: Buffer.from('fixture-789', 'utf8'),
      };

      const headers = TransportMessageHeaders.createFromProperties(properties);

      expect(headers.messageGuid).toBe('test-guid-123');
      expect(headers.messageType).toBe('MarketUpdate');
      expect(headers.timestampInMs).toBe('1640995200000');
      expect(headers.messageSequence).toBe('');
      expect(headers.fixtureId).toBe('fixture-789');
    });

    it('should throw error when attempting to access invalid property key', () => {
      const properties = {
        MessageGuid: 'test-guid-123',
        MessageType: 'MarketUpdate',
        timestamp_in_ms: '1640995200000',
      };

      // This test simulates what would happen if someone tried to inject an invalid key
      // In practice, this would only happen if the internal code was modified incorrectly
      expect(() => {
        // Using any to bypass TypeScript checking for this security test
        (TransportMessageHeaders as any).getRequiredProperty(properties, 'maliciousKey', true);
      }).toThrow("Invalid property key: 'maliciousKey'. Only predefined header keys are allowed.");
    });

    it('should reject object values to prevent injection attacks', () => {
      const maliciousObject = {
        toString: () => 'malicious-payload',
        valueOf: () => 'another-payload',
      };

      const properties = {
        MessageGuid: maliciousObject,
        MessageType: 'MarketUpdate',
        timestamp_in_ms: '1640995200000',
      };

      expect(() => {
        TransportMessageHeaders.createFromProperties(properties);
      }).toThrow(
        "Header 'MessageGuid' contains invalid data type. Only primitive values are allowed.",
      );
    });

    it('should reject function values to prevent code injection', () => {
      const maliciousFunction = () => 'malicious-code';

      const properties = {
        MessageGuid: 'test-guid-123',
        MessageType: maliciousFunction,
        timestamp_in_ms: '1640995200000',
      };

      expect(() => {
        TransportMessageHeaders.createFromProperties(properties);
      }).toThrow(
        "Header 'MessageType' contains invalid data type. Only primitive values are allowed.",
      );
    });

    it('should reject array values to prevent injection attacks', () => {
      const maliciousArray = ['payload1', 'payload2'];

      const properties = {
        MessageGuid: 'test-guid-123',
        MessageType: 'MarketUpdate',
        timestamp_in_ms: maliciousArray,
      };

      expect(() => {
        TransportMessageHeaders.createFromProperties(properties);
      }).toThrow(
        "Header 'timestamp_in_ms' contains invalid data type. Only primitive values are allowed.",
      );
    });

    it('should prevent prototype pollution attacks', () => {
      // Create an object that doesn't inherit from Object.prototype
      const maliciousProperties = Object.create(null);
      maliciousProperties.MessageGuid = 'test-guid-123';
      maliciousProperties.MessageType = 'MarketUpdate';
      maliciousProperties.timestamp_in_ms = '1640995200000';

      // Add a property that would exist on prototype but not own property
      Object.setPrototypeOf(maliciousProperties, {
        MessageGuid: 'prototype-pollution-attempt',
      });

      // Should work fine since we use hasOwnProperty check
      const headers = TransportMessageHeaders.createFromProperties(maliciousProperties);
      expect(headers.messageGuid).toBe('test-guid-123');
    });
  });
});
