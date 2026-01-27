import { plainToInstance } from 'class-transformer';
import { OutrightFixtureBodyStructure } from '../../../../../src/api/common/body-entities/responses/outright-fixture-body-structure';
import { Subscription } from '../../../../../src/entities/core-entities/common/subscription';
import { IdNNameRecord } from '../../../../../src/entities/core-entities/common/id-and-name-record';

describe('OutrightFixtureBodyStructure', () => {
  it('should deserialize a plain object into an OutrightFixtureBodyStructure instance', (): void => {
    const plain = {
      FixtureName: 'World Cup 2024',
      Sport: { Id: 1, Name: 'Football' },
      Location: { Id: 10, Name: 'Europe' },
      StartDate: '2024-06-01T12:00:00Z',
      LastUpdate: '2024-06-01T13:00:00Z',
      Status: 1,
      Participants: [{ Id: 100, Name: 'Team A' }],
      Subscription: { Type: 1, Status: 'Active' },
      Venue: { Id: 1, Name: 'Stadium' },
      Season: { Id: 2024, Name: '2024-2025' },
    };
    const fixture = plainToInstance(OutrightFixtureBodyStructure, plain, {
      excludeExtraneousValues: true,
    });
    expect(fixture).toBeInstanceOf(OutrightFixtureBodyStructure);
    expect(fixture.fixtureName).toBe('World Cup 2024');
    expect(fixture.sport).toBeDefined();
    expect(fixture.location).toBeDefined();
    expect(fixture.subscription).toBeInstanceOf(Subscription);
    expect(fixture.season).toBeInstanceOf(IdNNameRecord);
    expect(fixture.season?.id).toBe(2024);
    expect(fixture.season?.name).toBe('2024-2025');
  });

  it('should handle missing FixtureName and Season properties', (): void => {
    const plain = {
      Sport: { Id: 1, Name: 'Football' },
      Location: { Id: 10, Name: 'Europe' },
      StartDate: '2024-06-01T12:00:00Z',
      LastUpdate: '2024-06-01T13:00:00Z',
      Status: 1,
      Participants: [],
      Subscription: { Type: 1, Status: 'Active' },
    };
    const fixture = plainToInstance(OutrightFixtureBodyStructure, plain, {
      excludeExtraneousValues: true,
    });
    expect(fixture.fixtureName).toBeUndefined();
    expect(fixture.season).toBeUndefined();
  });

  it('should deserialize FixtureName property correctly', (): void => {
    const plain = {
      FixtureName: 'Champions League Final',
      Sport: { Id: 1, Name: 'Football' },
      Location: { Id: 10, Name: 'Europe' },
      StartDate: '2024-06-01T12:00:00Z',
      LastUpdate: '2024-06-01T13:00:00Z',
      Status: 1,
      Participants: [],
      Subscription: { Type: 1, Status: 'Active' },
    };
    const fixture = plainToInstance(OutrightFixtureBodyStructure, plain, {
      excludeExtraneousValues: true,
    });
    expect(fixture.fixtureName).toBe('Champions League Final');
  });

  it('should deserialize Season property correctly', (): void => {
    const plain = {
      Sport: { Id: 1, Name: 'Football' },
      Location: { Id: 10, Name: 'Europe' },
      StartDate: '2024-06-01T12:00:00Z',
      LastUpdate: '2024-06-01T13:00:00Z',
      Status: 1,
      Participants: [],
      Subscription: { Type: 1, Status: 'Active' },
      Season: { Id: 2025, Name: '2025-2026' },
    };
    const fixture = plainToInstance(OutrightFixtureBodyStructure, plain, {
      excludeExtraneousValues: true,
    });
    expect(fixture.season).toBeInstanceOf(IdNNameRecord);
    expect(fixture.season?.id).toBe(2025);
    expect(fixture.season?.name).toBe('2025-2026');
  });
});
