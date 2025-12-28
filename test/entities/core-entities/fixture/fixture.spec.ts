import { plainToInstance } from 'class-transformer';
import { Fixture } from '../../../../src/entities/core-entities/fixture/fixture';
import { Subscription } from '../../../../src/entities/core-entities/common/subscription';
import { Sport } from '../../../../src/entities/core-entities/fixture/sport';
import { Location } from '../../../../src/entities/core-entities/fixture/location';
import { League } from '../../../../src/entities/core-entities/fixture/league';
import { Participant } from '../../../../src/entities/core-entities/fixture/participant';
import { NameValueRecord } from '../../../../src/entities/core-entities/common/name-value-record';
import { IdNNameRecord } from '../../../../src/entities/core-entities/common/id-and-name-record';

describe('Fixture Entity', () => {
  it('should deserialize a plain object into a Fixture instance', (): void => {
    const plain = {
      FixtureName: 'Team A vs Team B',
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
      ExternalFixtureId: 'EXT-12345',
      Season: { Id: 2024, Name: '2024-2025' },
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect(fixture).toBeInstanceOf(Fixture);
    expect(fixture.fixtureName).toBe('Team A vs Team B');
    expect(fixture.subscription).toBeInstanceOf(Subscription);
    expect(fixture.sport).toBeInstanceOf(Sport);
    expect(fixture.location).toBeInstanceOf(Location);
    expect(fixture.league).toBeInstanceOf(League);
    expect(fixture.startDate).toBeInstanceOf(Date);
    expect(fixture.startDate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
    expect(fixture.lastUpdate).toBeInstanceOf(Date);
    expect(fixture.lastUpdate?.toISOString()).toBe('2024-06-01T13:00:00.000Z');
    expect(fixture.status).toBe('Scheduled');
    expect(Array.isArray(fixture.participants)).toBe(true);
    expect(fixture.participants?.[0]).toBeInstanceOf(Participant);
    expect(Array.isArray(fixture.fixtureExtraData)).toBe(true);
    expect(fixture.fixtureExtraData?.[0]).toBeInstanceOf(NameValueRecord);
    expect(fixture.externalFixtureId).toBe('EXT-12345');
    expect(fixture.season).toBeInstanceOf(IdNNameRecord);
    expect(fixture.season?.id).toBe(2024);
    expect(fixture.season?.name).toBe('2024-2025');
  });

  it('should handle missing optional properties', (): void => {
    const plain = {
      Sport: { id: 2, name: 'Football' },
      Status: 'InProgress',
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect(fixture.sport).toBeInstanceOf(Sport);
    expect(fixture.status).toBe('InProgress');
    expect(fixture.fixtureName).toBeUndefined();
    expect(fixture.subscription).toBeUndefined();
    expect(fixture.location).toBeUndefined();
    expect(fixture.league).toBeUndefined();
    expect(fixture.startDate).toBeUndefined();
    expect(fixture.lastUpdate).toBeUndefined();
    expect(fixture.participants).toBeUndefined();
    expect(fixture.fixtureExtraData).toBeUndefined();
    expect(fixture.externalFixtureId).toBeUndefined();
    expect(fixture.season).toBeUndefined();
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

  it('should handle externalFixtureId with string value', (): void => {
    const plain = {
      Sport: { id: 2, name: 'Football' },
      ExternalFixtureId: 'EXT-98765',
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect(fixture.externalFixtureId).toBe('EXT-98765');
  });

  it('should handle externalFixtureId with null value', (): void => {
    const plain = {
      Sport: { id: 2, name: 'Football' },
      ExternalFixtureId: null,
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect(fixture.externalFixtureId).toBeNull();
  });

  it('should handle externalFixtureId when missing from plain object', (): void => {
    const plain = {
      Sport: { id: 2, name: 'Football' },
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect(fixture.externalFixtureId).toBeUndefined();
  });

  it('should deserialize FixtureName property correctly', (): void => {
    const plain = {
      Sport: { id: 2, name: 'Football' },
      FixtureName: 'Manchester United vs Liverpool',
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect(fixture.fixtureName).toBe('Manchester United vs Liverpool');
  });

  it('should deserialize Season property correctly', (): void => {
    const plain = {
      Sport: { id: 2, name: 'Football' },
      Season: { Id: 2024, Name: '2024-2025' },
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect(fixture.season).toBeInstanceOf(IdNNameRecord);
    expect(fixture.season?.id).toBe(2024);
    expect(fixture.season?.name).toBe('2024-2025');
  });

  it('should handle Season with null value', (): void => {
    const plain = {
      Sport: { id: 2, name: 'Football' },
      Season: null,
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect(fixture.season).toBeNull();
  });

  it('should handle FixtureName with null value', (): void => {
    const plain = {
      Sport: { id: 2, name: 'Football' },
      FixtureName: null,
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect(fixture.fixtureName).toBeNull();
  });

  it('should deserialize complete fixture with all new properties', (): void => {
    const plain = {
      FixtureName: 'Champions League Final',
      Sport: { Id: 1, Name: 'Football' },
      Location: { Id: 1, Name: 'England' },
      League: { Id: 1, Name: 'UEFA Champions League' },
      StartDate: '2024-12-25T15:00:00Z',
      Status: 'NSY',
      Stage: { Id: 1, Name: 'Final' },
      Round: { Id: 1, Name: 'Final' },
      Season: { Id: 2024, Name: '2024-2025' },
      ExternalFixtureId: 'EXT-FINAL-2024',
    };
    const fixture = plainToInstance(Fixture, plain, { excludeExtraneousValues: true });
    expect(fixture.fixtureName).toBe('Champions League Final');
    expect(fixture.sport?.name).toBe('Football');
    expect(fixture.stage?.name).toBe('Final');
    expect(fixture.round?.name).toBe('Final');
    expect(fixture.season?.name).toBe('2024-2025');
    expect(fixture.season?.id).toBe(2024);
  });
});
