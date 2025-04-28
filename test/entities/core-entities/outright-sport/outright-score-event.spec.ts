import { plainToInstance } from 'class-transformer';
import { OutrightScoreEvent } from '../../../../src/entities/core-entities/outright-sport/outright-score-event';
import { OutrightScore } from '../../../../src/entities/core-entities/outright-sport/outright-score';

describe('OutrightScoreEvent', () => {
  it('should deserialize a plain object into an OutrightScoreEvent instance', (): void => {
    const plain = { FixtureId: 1, OutrightScore: { Id: 2 } };
    const event = plainToInstance(OutrightScoreEvent, plain, { excludeExtraneousValues: true });
    expect(event).toBeInstanceOf(OutrightScoreEvent);
    expect(event.fixtureId).toBe(1);
    expect(event.outrightScore).toBeInstanceOf(OutrightScore);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const event = plainToInstance(OutrightScoreEvent, plain, { excludeExtraneousValues: true });
    expect(event.fixtureId).toBeUndefined();
    expect(event.outrightScore).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { FixtureId: 3, Extra: 'ignore me' };
    const event = plainToInstance(OutrightScoreEvent, plain, { excludeExtraneousValues: true });
    expect((event as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
