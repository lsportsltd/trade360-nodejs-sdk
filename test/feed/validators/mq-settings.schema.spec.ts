import { MQSettingsSchema } from '../../../src/feed/validators/mq-settings.schema';

const validMqSettings = {
  hostname: 'localhost',
  port: 5672,
  vhost: '/',
  username: 'user',
  password: 'pass',
  packageId: 1,
  maxRetryAttempts: 5,
  customersApiBaseUrl: 'https://stm-api.lsports.eu/',
};

describe('MQSettingsSchema (TR-23899)', () => {
  it('applies defaults for distribution and initial connection settings', () => {
    const result = MQSettingsSchema.parse(validMqSettings);

    expect(result.distributionPropagationDelayMs).toBe(2000);
    expect(result.initialConnectionRetryIntervalMs).toBe(1000);
    expect(result.initialConnectionMaxAttempts).toBe(5);
  });

  it('accepts custom distribution and initial connection values', () => {
    const result = MQSettingsSchema.parse({
      ...validMqSettings,
      distributionPropagationDelayMs: 5000,
      initialConnectionRetryIntervalMs: 1000,
      initialConnectionMaxAttempts: 10,
    });

    expect(result.distributionPropagationDelayMs).toBe(5000);
    expect(result.initialConnectionRetryIntervalMs).toBe(1000);
    expect(result.initialConnectionMaxAttempts).toBe(10);
  });

  it('rejects initialConnectionRetryIntervalMs below minimum', () => {
    const result = MQSettingsSchema.safeParse({
      ...validMqSettings,
      initialConnectionRetryIntervalMs: 100,
    });

    expect(result.success).toBe(false);
  });

  it('rejects negative distributionPropagationDelayMs', () => {
    const result = MQSettingsSchema.safeParse({
      ...validMqSettings,
      distributionPropagationDelayMs: -1,
    });

    expect(result.success).toBe(false);
  });
});
