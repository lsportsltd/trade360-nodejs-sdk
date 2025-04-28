import { plainToInstance } from 'class-transformer';
import { OutrightLeagueFixture } from '../../../../src/entities/core-entities/outright-league/outright-league-fixture';
import { Subscription } from '../../../../src/entities/core-entities/common/subscription';
import { NameValueRecord } from '../../../../src/entities/core-entities/common/name-value-record';

describe('OutrightLeagueFixture', () => {
  it('should deserialize a plain object into an OutrightLeagueFixture instance', (): void => {
    const plain = {
      Subscription: { Type: 1, Status: 'Active' },
      Sport: { id: 2, name: 'Football' },
      Location: { id: 3, name: 'Europe' },
      LastUpdate: '2024-06-01T12:00:00Z',
      Status: 1,
      ExtraData: [{ Name: 'foo', Value: 'bar' }],
    };
    const fixture = plainToInstance(OutrightLeagueFixture, plain, {
      excludeExtraneousValues: true,
    });
    expect(fixture).toBeInstanceOf(OutrightLeagueFixture);
    expect(fixture.subscription).toBeInstanceOf(Subscription);
    expect(fixture.sport).toBeDefined();
    expect(fixture.location).toBeDefined();
    expect(fixture.lastUpdate).toBeInstanceOf(Date);
    expect(fixture.lastUpdate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
    expect(Array.isArray(fixture.extraData)).toBe(true);
    expect(fixture.extraData?.[0]).toBeInstanceOf(NameValueRecord);
    expect(fixture.status).toBe(1);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const fixture = plainToInstance(OutrightLeagueFixture, plain, {
      excludeExtraneousValues: true,
    });
    expect(fixture.subscription).toBeUndefined();
    expect(fixture.sport).toBeUndefined();
    expect(fixture.location).toBeUndefined();
    expect(fixture.lastUpdate).toBeUndefined();
    expect(fixture.status).toBeUndefined();
    expect(fixture.extraData).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { Status: 2, Extra: 'ignore me' };
    const fixture = plainToInstance(OutrightLeagueFixture, plain, {
      excludeExtraneousValues: true,
    });
    expect((fixture as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
