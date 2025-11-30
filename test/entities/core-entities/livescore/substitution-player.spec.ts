import { plainToInstance } from 'class-transformer';
import { SubstitutionPlayer } from '../../../../src/entities/core-entities/livescore/substitution-player';

describe('SubstitutionPlayer Entity', () => {
  it('should deserialize a plain object into a SubstitutionPlayer instance', (): void => {
    const plain = {
      Id: 207444,
      Name: 'Ferran Torres',
    };
    const player = plainToInstance(SubstitutionPlayer, plain, { excludeExtraneousValues: true });
    expect(player).toBeInstanceOf(SubstitutionPlayer);
    expect(player.id).toBe(207444);
    expect(player.name).toBe('Ferran Torres');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const player = plainToInstance(SubstitutionPlayer, plain, { excludeExtraneousValues: true });
    expect(player.id).toBeUndefined();
    expect(player.name).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 123,
      Extra: 'ignore me',
    };
    const player = plainToInstance(SubstitutionPlayer, plain, { excludeExtraneousValues: true });
    expect((player as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});

