import { plainToInstance } from 'class-transformer';
import { OutrightLeagueFixture } from '../../../../src/entities/core-entities/outright-league/outright-league-fixture';
import { Subscription } from '../../../../src/entities/core-entities/common/subscription';
import { NameValueRecord } from '../../../../src/entities/core-entities/common/name-value-record';
import { IdNNameRecord } from '../../../../src/entities/core-entities/common/id-and-name-record';

describe('OutrightLeagueFixture', () => {
  it('should deserialize a plain object into an OutrightLeagueFixture instance', (): void => {
    const plain = {
      FixtureName: 'League Championship 2024',
      Subscription: { Type: 1, Status: 'Active' },
      Sport: { id: 2, name: 'Football' },
      Location: { id: 3, name: 'Europe' },
      LastUpdate: '2024-06-01T12:00:00Z',
      Status: 1,
      ExtraData: [{ Name: 'foo', Value: 'bar' }],
      EndDate: '2030-06-01T13:00:00Z',
      Season: { Id: 2024, Name: '2024-2025' },
    };
    const fixture = plainToInstance(OutrightLeagueFixture, plain, {
      excludeExtraneousValues: true,
    });
    expect(fixture).toBeInstanceOf(OutrightLeagueFixture);
    expect(fixture.fixtureName).toBe('League Championship 2024');
    expect(fixture.subscription).toBeInstanceOf(Subscription);
    expect(fixture.sport).toBeDefined();
    expect(fixture.location).toBeDefined();
    expect(fixture.lastUpdate).toBeInstanceOf(Date);
    expect(fixture.lastUpdate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
    expect(Array.isArray(fixture.extraData)).toBe(true);
    expect(fixture.extraData?.[0]).toBeInstanceOf(NameValueRecord);
    expect(fixture.status).toBe(1);
    expect(fixture.endDate).toBeInstanceOf(Date);
    expect(fixture.endDate?.toISOString()).toBe('2030-06-01T13:00:00.000Z');
    expect(fixture.season).toBeInstanceOf(IdNNameRecord);
    expect(fixture.season?.id).toBe(2024);
    expect(fixture.season?.name).toBe('2024-2025');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const fixture = plainToInstance(OutrightLeagueFixture, plain, {
      excludeExtraneousValues: true,
    });
    expect(fixture.fixtureName).toBeUndefined();
    expect(fixture.subscription).toBeUndefined();
    expect(fixture.sport).toBeUndefined();
    expect(fixture.location).toBeUndefined();
    expect(fixture.lastUpdate).toBeUndefined();
    expect(fixture.status).toBeUndefined();
    expect(fixture.extraData).toBeUndefined();
    expect(fixture.endDate).toBeUndefined();
    expect(fixture.season).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { Status: 2, Extra: 'ignore me' };
    const fixture = plainToInstance(OutrightLeagueFixture, plain, {
      excludeExtraneousValues: true,
    });
    expect((fixture as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });

  it('should deserialize FixtureName property correctly', (): void => {
    const plain = {
      FixtureName: 'World Series 2024',
      Status: 1,
    };
    const fixture = plainToInstance(OutrightLeagueFixture, plain, {
      excludeExtraneousValues: true,
    });
    expect(fixture.fixtureName).toBe('World Series 2024');
  });

  it('should deserialize Season property correctly', (): void => {
    const plain = {
      Season: { Id: 2025, Name: '2025-2026' },
      Status: 1,
    };
    const fixture = plainToInstance(OutrightLeagueFixture, plain, {
      excludeExtraneousValues: true,
    });
    expect(fixture.season).toBeInstanceOf(IdNNameRecord);
    expect(fixture.season?.id).toBe(2025);
    expect(fixture.season?.name).toBe('2025-2026');
  });
});
