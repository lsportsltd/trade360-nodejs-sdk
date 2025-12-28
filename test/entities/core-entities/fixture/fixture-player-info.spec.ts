import { plainToInstance } from 'class-transformer';
import { FixturePlayerInfo } from '../../../../src/entities/core-entities/fixture/fixture-player-info';
import { PlayerType } from '../../../../src/entities/core-entities/enums/player-type';

describe('FixturePlayerInfo Entity', () => {
  it('should deserialize a plain object into a FixturePlayerInfo instance', (): void => {
    const plain = {
      Id: 7,
      Name: 'Test Player',
      TeamId: 101,
      NationalityId: 1,
      BirthDate: '1985-02-05T00:00:00Z',
      Type: PlayerType.Player,
      NationalTeamId: 50,
    };
    const player = plainToInstance(FixturePlayerInfo, plain, { excludeExtraneousValues: true });
    expect(player).toBeInstanceOf(FixturePlayerInfo);
    expect(player.id).toBe(7);
    expect(player.name).toBe('Test Player');
    expect(player.teamId).toBe(101);
    expect(player.nationalityId).toBe(1);
    expect(player.birthDate).toBeInstanceOf(Date);
    expect(player.birthDate?.toISOString()).toBe('1985-02-05T00:00:00.000Z');
    expect(player.type).toBe(PlayerType.Player);
    expect(player.nationalTeamId).toBe(50);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const player = plainToInstance(FixturePlayerInfo, plain, { excludeExtraneousValues: true });
    expect(player.id).toBeUndefined();
    expect(player.name).toBeUndefined();
    expect(player.teamId).toBeUndefined();
    expect(player.nationalityId).toBeUndefined();
    expect(player.birthDate).toBeUndefined();
    expect(player.type).toBeUndefined();
    expect(player.nationalTeamId).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test Player',
      Extra: 'ignore me',
    };
    const player = plainToInstance(FixturePlayerInfo, plain, { excludeExtraneousValues: true });
    expect((player as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });

  it('should deserialize type property correctly for all PlayerType values', (): void => {
    const playerPlain = { Id: 1, Type: PlayerType.Player };
    const player = plainToInstance(FixturePlayerInfo, playerPlain, { excludeExtraneousValues: true });
    expect(player.type).toBe(PlayerType.Player);

    const otherPlain = { Id: 2, Type: PlayerType.Other };
    const other = plainToInstance(FixturePlayerInfo, otherPlain, { excludeExtraneousValues: true });
    expect(other.type).toBe(PlayerType.Other);

    const coachPlain = { Id: 3, Type: PlayerType.Coach };
    const coach = plainToInstance(FixturePlayerInfo, coachPlain, { excludeExtraneousValues: true });
    expect(coach.type).toBe(PlayerType.Coach);
  });

  it('should deserialize birthDate property correctly', (): void => {
    const plain = {
      Id: 10,
      BirthDate: '1990-06-15T00:00:00Z',
    };
    const player = plainToInstance(FixturePlayerInfo, plain, { excludeExtraneousValues: true });
    expect(player.birthDate).toBeInstanceOf(Date);
    expect(player.birthDate?.getFullYear()).toBe(1990);
    expect(player.birthDate?.getMonth()).toBe(5); // June is month 5 (0-indexed)
    expect(player.birthDate?.getDate()).toBe(15);
  });

  it('should handle partial properties', (): void => {
    const plain = {
      Id: 5,
      Name: 'Partial Player',
    };
    const player = plainToInstance(FixturePlayerInfo, plain, { excludeExtraneousValues: true });
    expect(player.id).toBe(5);
    expect(player.name).toBe('Partial Player');
    expect(player.teamId).toBeUndefined();
    expect(player.nationalityId).toBeUndefined();
    expect(player.birthDate).toBeUndefined();
    expect(player.type).toBeUndefined();
    expect(player.nationalTeamId).toBeUndefined();
  });
});





