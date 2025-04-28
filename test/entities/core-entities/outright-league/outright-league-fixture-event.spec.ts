import { plainToInstance } from 'class-transformer';
import { OutrightLeagueFixtureEvent } from '../../../../src/entities/core-entities/outright-league/outright-league-fixture-event';
import { OutrightLeagueFixture } from '../../../../src/entities/core-entities/outright-league/outright-league-fixture';

describe('OutrightLeagueFixtureEvent', () => {
  it('should deserialize a plain object into an OutrightLeagueFixtureEvent instance', (): void => {
    const plain = { FixtureId: 1, OutrightLeague: { Id: 2 } };
    const event = plainToInstance(OutrightLeagueFixtureEvent, plain, {
      excludeExtraneousValues: true,
    });
    expect(event).toBeInstanceOf(OutrightLeagueFixtureEvent);
    expect(event.fixtureId).toBe(1);
    expect(event.outrightLeague).toBeInstanceOf(OutrightLeagueFixture);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const event = plainToInstance(OutrightLeagueFixtureEvent, plain, {
      excludeExtraneousValues: true,
    });
    expect(event.fixtureId).toBeUndefined();
    expect(event.outrightLeague).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { FixtureId: 3, Extra: 'ignore me' };
    const event = plainToInstance(OutrightLeagueFixtureEvent, plain, {
      excludeExtraneousValues: true,
    });
    expect((event as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
