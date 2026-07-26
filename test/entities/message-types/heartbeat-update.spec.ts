import { plainToInstance } from 'class-transformer';

import { HeartbeatUpdate } from '../../../src/entities/message-types';

describe('HeartbeatUpdate', () => {
  it('should deserialize Problem from the message body', (): void => {
    const body = { Problem: 1 };

    const update = plainToInstance(HeartbeatUpdate, body, {
      excludeExtraneousValues: true,
    });

    expect(update.problem).toBe(1);
  });

  it('should leave problem undefined when absent from the body', (): void => {
    const body = {};

    const update = plainToInstance(HeartbeatUpdate, body, {
      excludeExtraneousValues: true,
    });

    expect(update.problem).toBeUndefined();
  });
});
