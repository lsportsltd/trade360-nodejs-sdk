import { plainToInstance } from 'class-transformer';
import { MarketEvent } from '../../../../src/entities/core-entities/market/market-event';
import { Market } from '../../../../src/entities/core-entities/market/market';

describe('MarketEvent Entity', () => {
  it('should deserialize a plain object into a MarketEvent instance', (): void => {
    const plain = {
      FixtureId: 123,
      Markets: [
        { Id: 1, Name: 'Market1' },
        { Id: 2, Name: 'Market2' },
      ],
    };
    const event = plainToInstance(MarketEvent, plain, { excludeExtraneousValues: true });
    expect(event).toBeInstanceOf(MarketEvent);
    expect(event.fixtureId).toBe(123);
    expect(Array.isArray(event.markets)).toBe(true);
    expect(event.markets?.[0]).toBeInstanceOf(Market);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const event = plainToInstance(MarketEvent, plain, { excludeExtraneousValues: true });
    expect(event.fixtureId).toBeUndefined();
    expect(event.markets).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      FixtureId: 456,
      Extra: 'ignore me',
    };
    const event = plainToInstance(MarketEvent, plain, { excludeExtraneousValues: true });
    expect((event as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
