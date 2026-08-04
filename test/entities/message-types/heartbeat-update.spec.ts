import { plainToInstance } from 'class-transformer';

import { HeartbeatUpdate } from '../../../src/entities/message-types';

describe('HeartbeatUpdate', () => {
  it('should deserialize FeedInterrupted domain array from the message body', (): void => {
    const body = { FeedInterrupted: [1] };

    const update = plainToInstance(HeartbeatUpdate, body, {
      excludeExtraneousValues: true,
    });

    expect(update.feedInterrupted).toEqual([1]);
  });

  it('should leave feedInterrupted undefined when absent from the body', (): void => {
    const body = {};

    const update = plainToInstance(HeartbeatUpdate, body, {
      excludeExtraneousValues: true,
    });

    expect(update.feedInterrupted).toBeUndefined();
  });
});
