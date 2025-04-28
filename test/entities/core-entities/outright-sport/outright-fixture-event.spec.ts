import { plainToInstance } from 'class-transformer';
import { OutrightFixtureEvent } from '../../../../src/entities/core-entities/outright-sport/outright-fixture-event';
import { OutrightFixture } from '../../../../src/entities/core-entities/outright-sport/outright-fixture';

describe('OutrightFixtureEvent', () => {
  it('should deserialize a plain object into an OutrightFixtureEvent instance', (): void => {
    const plain = { FixtureId: 1, OutrightFixture: { Id: 2 } };
    const event = plainToInstance(OutrightFixtureEvent, plain, { excludeExtraneousValues: true });
    expect(event).toBeInstanceOf(OutrightFixtureEvent);
    expect(event.fixtureId).toBe(1);
    expect(event.outrightFixture).toBeInstanceOf(OutrightFixture);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const event = plainToInstance(OutrightFixtureEvent, plain, { excludeExtraneousValues: true });
    expect(event.fixtureId).toBeUndefined();
    expect(event.outrightFixture).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { FixtureId: 3, Extra: 'ignore me' };
    const event = plainToInstance(OutrightFixtureEvent, plain, { excludeExtraneousValues: true });
    expect((event as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
