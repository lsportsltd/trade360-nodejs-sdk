import { plainToInstance } from 'class-transformer';
import { League } from '../../../../src/entities/core-entities/fixture/league';

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
});
