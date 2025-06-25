import { plainToInstance } from 'class-transformer';
import { Clock } from '../../../../src/entities/core-entities/livescore/clock';
import { ClockStatus } from '../../../../src/entities/core-entities/enums/clock-status';

describe('Clock Entity', () => {
  it('should deserialize a plain object into a Clock instance', (): void => {
    const plain = {
      Status: ClockStatus.Running,
      Seconds: 45
    };
    const clock = plainToInstance(Clock, plain, { excludeExtraneousValues: true });
    expect(clock).toBeInstanceOf(Clock);
    expect(clock.status).toBe(ClockStatus.Running);
    expect(clock.seconds).toBe(45);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const clock = plainToInstance(Clock, plain, { excludeExtraneousValues: true });
    expect(clock.status).toBeUndefined();
    expect(clock.seconds).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Status: ClockStatus.Paused,
      Seconds: 30,
      Extra: 'ignore me'
    };
    const clock = plainToInstance(Clock, plain, { excludeExtraneousValues: true });
    expect((clock as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});