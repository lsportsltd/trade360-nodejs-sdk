import { plainToInstance } from 'class-transformer';
import { Location } from '../../../../src/entities/core-entities/fixture/location';

describe('Location Entity', () => {
  it('should deserialize a plain object into a Location instance', (): void => {
    const plain = {
      Id: 7,
      Name: 'England',
    };
    const location = plainToInstance(Location, plain, { excludeExtraneousValues: true });
    expect(location).toBeInstanceOf(Location);
    expect(location.id).toBe(7);
    expect(location.name).toBe('England');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const location = plainToInstance(Location, plain, { excludeExtraneousValues: true });
    expect(location.id).toBeUndefined();
    expect(location.name).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test Location',
      Extra: 'ignore me',
    };
    const location = plainToInstance(Location, plain, { excludeExtraneousValues: true });
    expect((location as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
