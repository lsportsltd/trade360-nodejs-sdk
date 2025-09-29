import { plainToInstance } from 'class-transformer';
import { OutrightLeagueFixtureSnapshot } from '../../../../../src/api/common/body-entities/responses/outright-league-fixture-snapshot';
import { Subscription } from '../../../../../src/entities/core-entities/common/subscription';
import { NameValueRecord } from '../../../../../src/entities/core-entities/common/name-value-record';
import { SportsBodyStructure } from '../../../../../src/api/common/body-entities/responses/sports-body-structure';
import { LocationsBodyStructure } from '../../../../../src/api/common/body-entities/responses/locations-body-structure';

describe('OutrightLeagueFixtureSnapshot', () => {
  it('should deserialize a plain object into an OutrightLeagueFixtureSnapshot instance with all properties including EndDate', (): void => {
    const plain = {
      Subscription: { Type: 1, Status: 'Active' },
      Sport: { id: 2, name: 'Football' },
      Location: { id: 3, name: 'Europe' },
      LastUpdate: '2024-06-01T12:00:00Z',
      Status: 1,
      ExtraData: [{ Name: 'foo', Value: 'bar' }],
      EndDate: '2030-06-01T13:00:00Z',
    };
    
    const snapshot = plainToInstance(OutrightLeagueFixtureSnapshot, plain, {
      excludeExtraneousValues: true,
    });
    
    expect(snapshot).toBeInstanceOf(OutrightLeagueFixtureSnapshot);
    expect(snapshot.subscription).toBeInstanceOf(Subscription);
    expect(snapshot.sport).toBeInstanceOf(SportsBodyStructure);
    expect(snapshot.location).toBeInstanceOf(LocationsBodyStructure);
    expect(snapshot.lastUpdate).toBeInstanceOf(Date);
    expect(snapshot.lastUpdate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
    expect(Array.isArray(snapshot.extraData)).toBe(true);
    expect(snapshot.extraData?.[0]).toBeInstanceOf(NameValueRecord);
    expect(snapshot.status).toBe(1);
    expect(snapshot.endDate).toBeInstanceOf(Date);
    expect(snapshot.endDate?.toISOString()).toBe('2030-06-01T13:00:00.000Z');
  });

  it('should handle ISO 8601 date format correctly for EndDate field', (): void => {
    const plain = {
      Subscription: { Type: 1, Status: 'Active' },
      Sport: { id: 1, name: 'Soccer' },
      Location: { id: 1, name: 'International' },
      LastUpdate: '2024-12-25T14:30:00Z',
      Status: 2,
      EndDate: '2025-01-15T18:45:30.123Z',
    };
    
    const snapshot = plainToInstance(OutrightLeagueFixtureSnapshot, plain, {
      excludeExtraneousValues: true,
    });
    
    expect(snapshot.endDate).toBeInstanceOf(Date);
    expect(snapshot.endDate?.toISOString()).toBe('2025-01-15T18:45:30.123Z');
    expect(snapshot.endDate?.getUTCFullYear()).toBe(2025);
    expect(snapshot.endDate?.getUTCMonth()).toBe(0); // January is 0
    expect(snapshot.endDate?.getUTCDate()).toBe(15);
    expect(snapshot.endDate?.getUTCHours()).toBe(18);
    expect(snapshot.endDate?.getUTCMinutes()).toBe(45);
    expect(snapshot.endDate?.getUTCSeconds()).toBe(30);
    expect(snapshot.endDate?.getUTCMilliseconds()).toBe(123);
  });

  it('should handle missing properties including EndDate', (): void => {
    const plain = {};
    
    const snapshot = plainToInstance(OutrightLeagueFixtureSnapshot, plain, {
      excludeExtraneousValues: true,
    });
    
    expect(snapshot.subscription).toBeUndefined();
    expect(snapshot.sport).toBeUndefined();
    expect(snapshot.location).toBeUndefined();
    expect(snapshot.lastUpdate).toBeUndefined();
    expect(snapshot.status).toBeUndefined();
    expect(snapshot.extraData).toBeUndefined();
    expect(snapshot.endDate).toBeUndefined();
  });

  it('should handle partial data with only EndDate provided', (): void => {
    const plain = {
      EndDate: '2024-08-20T09:15:45Z',
    };
    
    const snapshot = plainToInstance(OutrightLeagueFixtureSnapshot, plain, {
      excludeExtraneousValues: true,
    });
    
    expect(snapshot.endDate).toBeInstanceOf(Date);
    expect(snapshot.endDate?.toISOString()).toBe('2024-08-20T09:15:45.000Z');
    expect(snapshot.subscription).toBeUndefined();
    expect(snapshot.sport).toBeUndefined();
    expect(snapshot.location).toBeUndefined();
    expect(snapshot.lastUpdate).toBeUndefined();
    expect(snapshot.status).toBeUndefined();
  });

  it('should ignore extraneous properties while preserving EndDate', (): void => {
    const plain = { 
      Status: 2, 
      EndDate: '2025-03-10T16:20:00Z',
      Extra: 'ignore me',
      AnotherExtra: 123 
    };
    
    const snapshot = plainToInstance(OutrightLeagueFixtureSnapshot, plain, {
      excludeExtraneousValues: true,
    });
    
    expect(snapshot.status).toBe(2);
    expect(snapshot.endDate).toBeInstanceOf(Date);
    expect(snapshot.endDate?.toISOString()).toBe('2025-03-10T16:20:00.000Z');
    expect((snapshot as unknown as { Extra?: unknown }).Extra).toBeUndefined();
    expect((snapshot as unknown as { AnotherExtra?: unknown }).AnotherExtra).toBeUndefined();
  });

  it('should handle different ISO 8601 date formats for EndDate', (): void => {
    const testCases = [
      {
        input: '2024-12-31T23:59:59Z',
        expected: '2024-12-31T23:59:59.000Z',
        description: 'basic UTC format'
      },
      {
        input: '2025-06-15T12:30:45.678Z',
        expected: '2025-06-15T12:30:45.678Z',
        description: 'with milliseconds'
      },
      {
        input: '2023-01-01T00:00:00.000Z',
        expected: '2023-01-01T00:00:00.000Z',
        description: 'new year with explicit milliseconds'
      }
    ];

    testCases.forEach(({ input, expected, description }) => {
      const plain = { EndDate: input };
      const snapshot = plainToInstance(OutrightLeagueFixtureSnapshot, plain, {
        excludeExtraneousValues: true,
      });
      
      expect(snapshot.endDate).toBeInstanceOf(Date);
      expect(snapshot.endDate?.toISOString()).toBe(expected);
    });
  });
});
