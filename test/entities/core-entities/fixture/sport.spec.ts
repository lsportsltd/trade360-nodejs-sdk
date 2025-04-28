import { plainToInstance } from 'class-transformer';
import { Sport } from '../../../../src/entities/core-entities/fixture/sport';

describe('Sport Entity', () => {
  it('should deserialize a plain object into a Sport instance', (): void => {
    const plain = {
      Id: 3,
      Name: 'Basketball',
    };
    const sport = plainToInstance(Sport, plain, { excludeExtraneousValues: true });
    expect(sport).toBeInstanceOf(Sport);
    expect(sport.id).toBe(3);
    expect(sport.name).toBe('Basketball');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const sport = plainToInstance(Sport, plain, { excludeExtraneousValues: true });
    expect(sport.id).toBeUndefined();
    expect(sport.name).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test Sport',
      Extra: 'ignore me',
    };
    const sport = plainToInstance(Sport, plain, { excludeExtraneousValues: true });
    expect((sport as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
