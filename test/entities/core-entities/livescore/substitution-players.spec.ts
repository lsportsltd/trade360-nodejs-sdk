import { plainToInstance } from 'class-transformer';
import { SubstitutionPlayers } from '../../../../src/entities/core-entities/livescore/substitution-players';
import { SubstitutionPlayer } from '../../../../src/entities/core-entities/livescore/substitution-player';

describe('SubstitutionPlayers Entity', () => {
  it('should deserialize a plain object into a SubstitutionPlayers instance', (): void => {
    const plain = {
      Item1: [{ Id: 207444, Name: 'Ferran Torres' }],
      Item2: [{ Id: 643815, Name: 'Lamine Yamal' }],
    };
    const players = plainToInstance(SubstitutionPlayers, plain, { excludeExtraneousValues: true });
    expect(players).toBeInstanceOf(SubstitutionPlayers);
    expect(Array.isArray(players.item1)).toBe(true);
    expect(Array.isArray(players.item2)).toBe(true);
    expect(players.item1?.[0]).toBeInstanceOf(SubstitutionPlayer);
    expect(players.item2?.[0]).toBeInstanceOf(SubstitutionPlayer);
    expect(players.item1?.[0].id).toBe(207444);
    expect(players.item1?.[0].name).toBe('Ferran Torres');
    expect(players.item2?.[0].id).toBe(643815);
    expect(players.item2?.[0].name).toBe('Lamine Yamal');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const players = plainToInstance(SubstitutionPlayers, plain, { excludeExtraneousValues: true });
    expect(players.item1).toBeUndefined();
    expect(players.item2).toBeUndefined();
  });

  it('should handle empty arrays', (): void => {
    const plain = {
      Item1: [],
      Item2: [],
    };
    const players = plainToInstance(SubstitutionPlayers, plain, { excludeExtraneousValues: true });
    expect(Array.isArray(players.item1)).toBe(true);
    expect(Array.isArray(players.item2)).toBe(true);
    expect(players.item1?.length).toBe(0);
    expect(players.item2?.length).toBe(0);
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Item1: [],
      Extra: 'ignore me',
    };
    const players = plainToInstance(SubstitutionPlayers, plain, { excludeExtraneousValues: true });
    expect((players as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});

