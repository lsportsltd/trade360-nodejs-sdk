import { plainToInstance } from 'class-transformer';
import { League } from '../../../../src/entities/core-entities/fixture/league';
import { IdNNameRecord } from '../../../../src/entities/core-entities/common/id-and-name-record';

describe('League Entity', () => {
  it('should deserialize a plain object into a League instance', (): void => {
    const plain = {
      Id: 42,
      Name: 'Premier League',
    };
    const league = plainToInstance(League, plain, { excludeExtraneousValues: true });
    expect(league).toBeInstanceOf(League);
    expect(league.id).toBe(42);
    expect(league.name).toBe('Premier League');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const league = plainToInstance(League, plain, { excludeExtraneousValues: true });
    expect(league.id).toBeUndefined();
    expect(league.name).toBeUndefined();
    expect(league.tour).toBeUndefined();
    expect(league.ageCategory).toBeUndefined();
    expect(league.gender).toBeUndefined();
    expect(league.type).toBeUndefined();
    expect(league.numberOfPeriods).toBeUndefined();
    expect(league.sportCategory).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test League',
      Extra: 'ignore me',
    };
    const league = plainToInstance(League, plain, { excludeExtraneousValues: true });
    expect((league as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });

  it('should deserialize Tour property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test League',
      Tour: { Id: 10, Name: 'World Tour' },
    };
    const league = plainToInstance(League, plain, { excludeExtraneousValues: true });
    expect(league.tour).toBeInstanceOf(IdNNameRecord);
    expect(league.tour?.id).toBe(10);
    expect(league.tour?.name).toBe('World Tour');
  });

  it('should deserialize AgeCategory property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'U21 League',
      AgeCategory: 21,
    };
    const league = plainToInstance(League, plain, { excludeExtraneousValues: true });
    expect(league.ageCategory).toBe(21);
  });

  it('should deserialize Gender property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test League',
      Gender: 1,
    };
    const league = plainToInstance(League, plain, { excludeExtraneousValues: true });
    expect(league.gender).toBe(1);
  });

  it('should deserialize Type property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test League',
      Type: 2,
    };
    const league = plainToInstance(League, plain, { excludeExtraneousValues: true });
    expect(league.type).toBe(2);
  });

  it('should deserialize NumberOfPeriods property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test League',
      NumberOfPeriods: 4,
    };
    const league = plainToInstance(League, plain, { excludeExtraneousValues: true });
    expect(league.numberOfPeriods).toBe(4);
  });

  it('should deserialize SportCategory property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test League',
      SportCategory: { Id: 5, Name: 'Football' },
    };
    const league = plainToInstance(League, plain, { excludeExtraneousValues: true });
    expect(league.sportCategory).toBeInstanceOf(IdNNameRecord);
    expect(league.sportCategory?.id).toBe(5);
    expect(league.sportCategory?.name).toBe('Football');
  });

  it('should deserialize all new properties together', (): void => {
    const plain = {
      Id: 1,
      Name: 'UEFA Champions League',
      Tour: { Id: 10, Name: 'European Competition' },
      AgeCategory: 0,
      Gender: 1,
      Type: 1,
      NumberOfPeriods: 2,
      SportCategory: { Id: 1, Name: 'Football' },
    };
    const league = plainToInstance(League, plain, { excludeExtraneousValues: true });
    expect(league.id).toBe(1);
    expect(league.name).toBe('UEFA Champions League');
    expect(league.tour?.name).toBe('European Competition');
    expect(league.ageCategory).toBe(0);
    expect(league.gender).toBe(1);
    expect(league.type).toBe(1);
    expect(league.numberOfPeriods).toBe(2);
    expect(league.sportCategory?.name).toBe('Football');
  });
});
