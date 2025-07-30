import { ConsoleAdapter } from '../../../src/logger/adapters/console.adapter';
import { LogLevel } from '../../../src/logger/enums/log-level';

describe('ConsoleAdapter', () => {
  let consoleAdapter: ConsoleAdapter;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleAdapter = new ConsoleAdapter();
    // Mock console methods
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'debug').mockImplementation();
    jest.spyOn(console, 'info').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Basic logging functionality', () => {
    it('should log messages without metadata', () => {
      const debugSpy = jest.spyOn(console, 'debug');
      
      consoleAdapter.debug('Test message');
      
      expect(debugSpy).toHaveBeenCalledWith('Test message');
      expect(debugSpy).toHaveBeenCalledTimes(1);
    });

    it('should log messages with regular metadata', () => {
      const infoSpy = jest.spyOn(console, 'info');
      
      consoleAdapter.info('Test message', { key: 'value' }, 'extra');
      
      expect(infoSpy).toHaveBeenCalledWith('Test message', { key: 'value' }, 'extra');
    });

    it('should handle all log levels correctly', () => {
      const debugSpy = jest.spyOn(console, 'debug');
      const infoSpy = jest.spyOn(console, 'info');
      const warnSpy = jest.spyOn(console, 'warn');
      const errorSpy = jest.spyOn(console, 'error');

      consoleAdapter.debug('debug message');
      consoleAdapter.info('info message');
      consoleAdapter.warn('warn message');
      consoleAdapter.error('error message');

      expect(debugSpy).toHaveBeenCalledWith('debug message');
      expect(infoSpy).toHaveBeenCalledWith('info message');
      expect(warnSpy).toHaveBeenCalledWith('warn message');
      expect(errorSpy).toHaveBeenCalledWith('error message');
    });
  });

  describe('BigInt serialization handling', () => {
    it('should handle BigInt values in metadata', () => {
      const warnSpy = jest.spyOn(console, 'warn');
      
      const metaWithBigInt = {
        id: 123n,
        name: 'test',
        count: 456,
      };
      
      consoleAdapter.warn('Test warning', metaWithBigInt);
      
      expect(warnSpy).toHaveBeenCalledWith('Test warning', {
        id: '123n',
        name: 'test',
        count: 456,
      });
    });

    it('should handle nested objects with BigInt values', () => {
      const errorSpy = jest.spyOn(console, 'error');
      
      const complexMeta = {
        user: {
          id: 999999999999999999n,
          profile: {
            score: 100n,
          },
        },
        items: [
          { id: 1n, active: true },
          { id: 2n, active: false },
        ],
      };
      
      consoleAdapter.error('Complex error', complexMeta);
      
      const expectedMeta = {
        user: {
          id: '999999999999999999n',
          profile: {
            score: '100n',
          },
        },
        items: [
          { id: '1n', active: true },
          { id: '2n', active: false },
        ],
      };
      
      expect(errorSpy).toHaveBeenCalledWith('Complex error', expectedMeta);
    });

    it('should handle arrays with BigInt values', () => {
      const infoSpy = jest.spyOn(console, 'info');
      
      const arrayMeta = [123n, 'text', 456, true, { nested: 789n }];
      
      consoleAdapter.info('Array test', arrayMeta);
      
      const expectedArray = ['123n', 'text', 456, true, { nested: '789n' }];
      expect(infoSpy).toHaveBeenCalledWith('Array test', expectedArray);
    });

    it('should handle multiple metadata arguments with BigInt', () => {
      const debugSpy = jest.spyOn(console, 'debug');
      
      consoleAdapter.debug(
        'Multiple args',
        { id: 123n },
        'string arg',
        456n,
        { nested: { value: 789n } }
      );
      
      expect(debugSpy).toHaveBeenCalledWith(
        'Multiple args',
        { id: '123n' },
        'string arg',
        '456n',
        { nested: { value: '789n' } }
      );
    });

    it('should handle primitive BigInt values in metadata', () => {
      const infoSpy = jest.spyOn(console, 'info');
      
      consoleAdapter.log(LogLevel.INFO, 'Primitive BigInt', 123n, 456n);
      
      expect(infoSpy).toHaveBeenCalledWith('Primitive BigInt', '123n', '456n');
    });

    it('should handle mixed data types including BigInt', () => {
      const errorSpy = jest.spyOn(console, 'error');
      
      const mixedMeta = {
        bigintValue: 123n,
        stringValue: 'test',
        numberValue: 456,
        booleanValue: true,
        nullValue: null,
        undefinedValue: undefined,
        arrayValue: [1n, 2, '3'],
        objectValue: { nested: 789n },
      };
      
      consoleAdapter.error('Mixed types', mixedMeta);
      
      const expectedMeta = {
        bigintValue: '123n',
        stringValue: 'test',
        numberValue: 456,
        booleanValue: true,
        nullValue: null,
        undefinedValue: undefined,
        arrayValue: ['1n', 2, '3'],
        objectValue: { nested: '789n' },
      };
      
      expect(errorSpy).toHaveBeenCalledWith('Mixed types', expectedMeta);
    });
  });

  describe('Error handling in BigInt serialization', () => {
    it('should handle circular references gracefully', () => {
      const warnSpy = jest.spyOn(console, 'warn');
      
      const circularObj: any = { name: 'test' };
      circularObj.self = circularObj;
      
      // Should not throw an error
      expect(() => {
        consoleAdapter.warn('Circular test', circularObj);
      }).not.toThrow();
      
      expect(warnSpy).toHaveBeenCalled();
      // The second argument should be the fallback serialization or original object
      expect(warnSpy).toHaveBeenCalled();
      // Check that it contains some error indication
      const [message, arg] = warnSpy.mock.calls[0];
      expect(message).toBe('Circular test');
      expect(typeof arg).toBe('object');
    });

    it('should handle objects that fail JSON parsing', () => {
      const infoSpy = jest.spyOn(console, 'info');
      
      const problematicObj = {
        func: () => {},
        symbol: Symbol('test'),
        bigint: 123n,
      };
      
      expect(() => {
        consoleAdapter.info('Problematic object', problematicObj);
      }).not.toThrow();
      
      expect(infoSpy).toHaveBeenCalled();
    });

    it('should remove functions from metadata during BigInt serialization', () => {
      const errorSpy = jest.spyOn(console, 'error');
      
      const metadata = {
        valid: 'data',
        problematic: () => {},
      };
      
      consoleAdapter.error('Serialization test', metadata);
      
      // Functions are removed during JSON stringify/parse cycle
      expect(errorSpy).toHaveBeenCalledWith('Serialization test', { valid: 'data' });
    });
  });

  describe('Edge cases', () => {
    it('should handle empty metadata array', () => {
      const debugSpy = jest.spyOn(console, 'debug');
      
      consoleAdapter.debug('No metadata');
      
      expect(debugSpy).toHaveBeenCalledWith('No metadata');
      expect(debugSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle zero BigInt values', () => {
      const infoSpy = jest.spyOn(console, 'info');
      
      consoleAdapter.info('Zero BigInt', { value: 0n });
      
      expect(infoSpy).toHaveBeenCalledWith('Zero BigInt', { value: '0n' });
    });

    it('should handle negative BigInt values', () => {
      const warnSpy = jest.spyOn(console, 'warn');
      
      consoleAdapter.warn('Negative BigInt', { value: -123n });
      
      expect(warnSpy).toHaveBeenCalledWith('Negative BigInt', { value: '-123n' });
    });

    it('should handle very large BigInt values', () => {
      const errorSpy = jest.spyOn(console, 'error');
      
      const largeBigInt = 999999999999999999999999n;
      consoleAdapter.error('Large BigInt', { value: largeBigInt });
      
      expect(errorSpy).toHaveBeenCalledWith('Large BigInt', { 
        value: '999999999999999999999999n' 
      });
    });

    it('should handle null and undefined in metadata', () => {
      const debugSpy = jest.spyOn(console, 'debug');
      
      consoleAdapter.log(LogLevel.DEBUG, 'Null/undefined test', null, undefined);
      
      expect(debugSpy).toHaveBeenCalledWith('Null/undefined test', null, undefined);
    });
  });

  describe('Performance considerations', () => {
    it('should not process metadata when there is none', () => {
      const debugSpy = jest.spyOn(console, 'debug');
      
      // Spy on BigIntSerializationUtil.stringify to ensure it's not called
      const mockStringify = jest.fn();
      jest.doMock('../../../src/utilities/bigint-serialization.util', () => ({
        BigIntSerializationUtil: {
          stringify: mockStringify,
        },
      }));
      
      consoleAdapter.debug('No metadata message');
      
      expect(debugSpy).toHaveBeenCalledWith('No metadata message');
      // stringify should not be called when there's no metadata
      expect(mockStringify).not.toHaveBeenCalled();
    });
  });
});