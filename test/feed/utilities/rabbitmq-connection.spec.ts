import {
  buildRabbitMqConnectOptions,
  enhanceRabbitMqConnectionError,
} from '../../../src/feed/utilities/rabbitmq-connection';

const baseSettings = {
  hostname: 'stm-inplay.lsports.eu',
  port: 5672,
  username: 'user',
  password: 'pass',
  vhost: 'StmInPlay',
  sslEnabled: false,
};

describe('buildRabbitMqConnectOptions', () => {
  it('uses amqp protocol when sslEnabled is false', () => {
    const options = buildRabbitMqConnectOptions(baseSettings);

    expect(options.protocol).toBe('amqp');
    expect(options.servername).toBeUndefined();
  });

  it('uses amqps protocol and servername when sslEnabled is true', () => {
    const options = buildRabbitMqConnectOptions({ ...baseSettings, sslEnabled: true, port: 5671 });

    expect(options.protocol).toBe('amqps');
    expect(options.servername).toBe('stm-inplay.lsports.eu');
  });
});

describe('enhanceRabbitMqConnectionError', () => {
  it('explains ssl enabled with plain port mismatch', () => {
    const err = enhanceRabbitMqConnectionError(new Error('ECONNRESET'), {
      ...baseSettings,
      sslEnabled: true,
    });

    expect(err.message).toMatch(/SSL is enabled but Port is 5672/);
  });

  it('explains ssl disabled with tls port mismatch', () => {
    const err = enhanceRabbitMqConnectionError(new Error('BrokerUnreachable'), {
      ...baseSettings,
      port: 5671,
      sslEnabled: false,
    });

    expect(err.message).toMatch(/SSL is disabled but Port is 5671/);
  });

  it('explains authentication failures', () => {
    const err = enhanceRabbitMqConnectionError(new Error('ACCESS_REFUSED'), baseSettings);

    expect(err.message).toMatch(/authentication failed/i);
  });

  it('explains likely tls certificate failures', () => {
    const err = enhanceRabbitMqConnectionError(new Error('certificate has expired'), {
      ...baseSettings,
      sslEnabled: true,
      port: 5671,
    });

    expect(err.message).toMatch(/TLS connection to RabbitMQ/i);
  });

  it('returns original error when no pattern matches', () => {
    const original = new Error('unexpected');
    const err = enhanceRabbitMqConnectionError(original, baseSettings);

    expect(err).toBe(original);
  });
});
