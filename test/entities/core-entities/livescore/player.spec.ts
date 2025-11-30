import { plainToInstance } from 'class-transformer';
import { Player } from '../../../../src/entities/core-entities/livescore/player';

describe('Player Entity', () => {
  it('should deserialize a plain object into a Player instance', (): void => {
    const plain = {
      Id: 207444,
      Name: 'Ferran Torres',
    };
    const player = plainToInstance(Player, plain, { excludeExtraneousValues: true });
    expect(player).toBeInstanceOf(Player);
    expect(player.id).toBe(207444);
    expect(player.name).toBe('Ferran Torres');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const player = plainToInstance(Player, plain, { excludeExtraneousValues: true });
    expect(player.id).toBeUndefined();
    expect(player.name).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 123,
      Extra: 'ignore me',
    };
    const player = plainToInstance(Player, plain, { excludeExtraneousValues: true });
    expect((player as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
