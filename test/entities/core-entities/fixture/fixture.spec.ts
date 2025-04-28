import { plainToInstance } from 'class-transformer';
import { Fixture } from '../../../../src/entities/core-entities/fixture/fixture';
import { Subscription } from '../../../../src/entities/core-entities/common/subscription';
import { Sport } from '../../../../src/entities/core-entities/fixture/sport';
import { Location } from '../../../../src/entities/core-entities/fixture/location';
import { League } from '../../../../src/entities/core-entities/fixture/league';
import { Participant } from '../../../../src/entities/core-entities/fixture/participant';
import { NameValueRecord } from '../../../../src/entities/core-entities/common/name-value-record';

describe('Fixture Entity', () => {
  it('should deserialize a plain object into a Fixture instance', (): void => {
    const plain = {
      Subscription: { id: 1 },
      Sport: { id: 2, name: 'Football' },
      Location: { id: 3, name: 'England' },
      League: { id: 4, name: 'Premier League' },
      StartDate: '2024-06-01T12:00:00Z',
      LastUpdate: '2024-06-01T13:00:00Z',
      Status: 'Scheduled',
      Participants: [
        { id: 10, name: 'Team A' },
        { id: 11, name: 'Team B' },
      ],
      FixtureExtraData: [{ name: 'Referee', value: 'John Doe' }],
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect(fixture).toBeInstanceOf(Fixture);
    expect(fixture.subscription).toBeInstanceOf(Subscription);
    expect(fixture.sport).toBeInstanceOf(Sport);
    expect(fixture.location).toBeInstanceOf(Location);
    expect(fixture.league).toBeInstanceOf(League);
    expect(fixture.startDate).toBeInstanceOf(Date);
    expect(fixture.startDate?.toString()).toBe('2024-06-01T12:00:00.000Z');
    expect(fixture.lastUpdate).toBeInstanceOf(Date);
    expect(fixture.lastUpdate?.toString()).toBe('2024-06-01T13:00:00.000Z');
    expect(fixture.status).toBe('Scheduled');
    expect(Array.isArray(fixture.participants)).toBe(true);
    expect(fixture.participants?.[0]).toBeInstanceOf(Participant);
    expect(Array.isArray(fixture.fixtureExtraData)).toBe(true);
    expect(fixture.fixtureExtraData?.[0]).toBeInstanceOf(NameValueRecord);
  });

  it('should handle missing optional properties', (): void => {
    const plain = {
      Sport: { id: 2, name: 'Football' },
      Status: 'InProgress',
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect(fixture.sport).toBeInstanceOf(Sport);
    expect(fixture.status).toBe('InProgress');
    expect(fixture.subscription).toBeUndefined();
    expect(fixture.location).toBeUndefined();
    expect(fixture.league).toBeUndefined();
    expect(fixture.startDate).toBeUndefined();
    expect(fixture.lastUpdate).toBeUndefined();
    expect(fixture.participants).toBeUndefined();
    expect(fixture.fixtureExtraData).toBeUndefined();
  });

  it('should handle empty arrays for participants and fixtureExtraData', (): void => {
    const plain = {
      Participants: [],
      FixtureExtraData: [],
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect(Array.isArray(fixture.participants)).toBe(true);
    expect(fixture.participants?.length).toBe(0);
    expect(Array.isArray(fixture.fixtureExtraData)).toBe(true);
    expect(fixture.fixtureExtraData?.length).toBe(0);
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Sport: { id: 2, name: 'Football' },
      ExtraField: 'should be ignored',
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect((fixture as unknown as { ExtraField?: unknown }).ExtraField).toBeUndefined();
  });
});
