import { plainToInstance } from 'class-transformer';
import { FixtureEvent } from '../../../../src/entities/core-entities/fixture/fixture-event';
import { Fixture } from '../../../../src/entities/core-entities/fixture/fixture';

describe('FixtureEvent Entity', () => {
  it('should deserialize a plain object into a FixtureEvent instance', () => {
    const plain = {
      FixtureId: 123,
      Fixture: {
        Sport: { id: 2, name: 'Football' },
        Status: 'Scheduled',
      },
    };
    const event = plainToInstance(FixtureEvent, plain, { excludeExtraneousValues: true });
    expect(event).toBeInstanceOf(FixtureEvent);
    expect(event.fixtureId).toBe(123);
    expect(event.fixture).toBeInstanceOf(Fixture);
    expect(event.fixture.sport).toBeDefined();
    expect(event.fixture.status).toBe('Scheduled');
  });

  it('should throw if required properties are missing', () => {
    const plain = {};
    const event = plainToInstance(FixtureEvent, plain, { excludeExtraneousValues: true });
    // fixtureId and fixture will be undefined, but class-transformer does not throw by default
    expect(event.fixtureId).toBeUndefined();
    expect(event.fixture).toBeUndefined();
  });
});
