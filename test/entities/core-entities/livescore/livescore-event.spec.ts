import { plainToInstance } from 'class-transformer';
import { LivescoreEvent } from '../../../../src/entities/core-entities/livescore/livescore-event';
import { Fixture } from '../../../../src/entities/core-entities/fixture/fixture';
import { Livescore } from '../../../../src/entities/core-entities/livescore/livescore';

describe('LivescoreEvent Entity', () => {
  it('should deserialize a plain object into a LivescoreEvent instance', (): void => {
    const plain = {
      FixtureId: 123,
      Fixture: { Sport: { id: 2, name: 'Football' } },
      Livescore: { Scoreboard: { id: 1 } },
    };
    const event = plainToInstance(LivescoreEvent, plain, { excludeExtraneousValues: true });
    expect(event).toBeInstanceOf(LivescoreEvent);
    expect(event.fixtureId).toBe(123);
    expect(event.fixture).toBeInstanceOf(Fixture);
    expect(event.livescore).toBeInstanceOf(Livescore);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const event = plainToInstance(LivescoreEvent, plain, { excludeExtraneousValues: true });
    expect(event.fixtureId).toBeUndefined();
    expect(event.fixture).toBeUndefined();
    expect(event.livescore).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      FixtureId: 456,
      Extra: 'ignore me',
    };
    const event = plainToInstance(LivescoreEvent, plain, { excludeExtraneousValues: true });
    expect((event as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
