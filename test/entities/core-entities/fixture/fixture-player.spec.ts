import { plainToInstance } from 'class-transformer';
import { FixturePlayer } from '../../../../src/entities/core-entities/fixture/fixture-player';
import { FixturePlayerInfo } from '../../../../src/entities/core-entities/fixture/fixture-player-info';
import { IdNNameRecord } from '../../../../src/entities/core-entities/common/id-and-name-record';
import { PlayerType } from '../../../../src/entities/core-entities/enums/player-type';

describe('FixturePlayer Entity', () => {
  it('should deserialize a plain object into a FixturePlayer instance', (): void => {
    const plain = {
      PlayerId: 7,
      ShirtNumber: '7',
      IsCaptain: true,
      IsStartingLineup: true,
      Position: { Id: 4, Name: 'Forward' },
      State: { Id: 1, Name: 'Playing' },
      Player: {
        Id: 7,
        Name: 'Test Player',
        TeamId: 101,
        Type: PlayerType.Player,
      },
    };
    const fixturePlayer = plainToInstance(FixturePlayer, plain, { excludeExtraneousValues: true });
    expect(fixturePlayer).toBeInstanceOf(FixturePlayer);
    expect(fixturePlayer.playerId).toBe(7);
    expect(fixturePlayer.shirtNumber).toBe('7');
    expect(fixturePlayer.isCaptain).toBe(true);
    expect(fixturePlayer.isStartingLineup).toBe(true);
    expect(fixturePlayer.position).toBeInstanceOf(IdNNameRecord);
    expect(fixturePlayer.position?.id).toBe(4);
    expect(fixturePlayer.position?.name).toBe('Forward');
    expect(fixturePlayer.state).toBeInstanceOf(IdNNameRecord);
    expect(fixturePlayer.state?.id).toBe(1);
    expect(fixturePlayer.state?.name).toBe('Playing');
    expect(fixturePlayer.player).toBeInstanceOf(FixturePlayerInfo);
    expect(fixturePlayer.player?.id).toBe(7);
    expect(fixturePlayer.player?.name).toBe('Test Player');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const fixturePlayer = plainToInstance(FixturePlayer, plain, { excludeExtraneousValues: true });
    expect(fixturePlayer.playerId).toBeUndefined();
    expect(fixturePlayer.shirtNumber).toBeUndefined();
    expect(fixturePlayer.isCaptain).toBeUndefined();
    expect(fixturePlayer.isStartingLineup).toBeUndefined();
    expect(fixturePlayer.position).toBeUndefined();
    expect(fixturePlayer.state).toBeUndefined();
    expect(fixturePlayer.player).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      PlayerId: 1,
      ShirtNumber: '10',
      Extra: 'ignore me',
    };
    const fixturePlayer = plainToInstance(FixturePlayer, plain, { excludeExtraneousValues: true });
    expect((fixturePlayer as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });

  it('should deserialize boolean properties correctly', (): void => {
    const captainPlain = { PlayerId: 1, IsCaptain: true, IsStartingLineup: false };
    const captain = plainToInstance(FixturePlayer, captainPlain, { excludeExtraneousValues: true });
    expect(captain.isCaptain).toBe(true);
    expect(captain.isStartingLineup).toBe(false);

    const substitutePlain = { PlayerId: 2, IsCaptain: false, IsStartingLineup: false };
    const substitute = plainToInstance(FixturePlayer, substitutePlain, { excludeExtraneousValues: true });
    expect(substitute.isCaptain).toBe(false);
    expect(substitute.isStartingLineup).toBe(false);
  });

  it('should deserialize nested Position and State objects correctly', (): void => {
    const plain = {
      PlayerId: 5,
      Position: { Id: 1, Name: 'Goalkeeper' },
      State: { Id: 2, Name: 'Bench' },
    };
    const fixturePlayer = plainToInstance(FixturePlayer, plain, { excludeExtraneousValues: true });
    expect(fixturePlayer.position).toBeInstanceOf(IdNNameRecord);
    expect(fixturePlayer.position?.id).toBe(1);
    expect(fixturePlayer.position?.name).toBe('Goalkeeper');
    expect(fixturePlayer.state).toBeInstanceOf(IdNNameRecord);
    expect(fixturePlayer.state?.id).toBe(2);
    expect(fixturePlayer.state?.name).toBe('Bench');
  });

  it('should deserialize nested Player object correctly', (): void => {
    const plain = {
      PlayerId: 10,
      Player: {
        Id: 10,
        Name: 'Test Player',
        TeamId: 200,
        NationalityId: 5,
        Type: PlayerType.Coach,
      },
    };
    const fixturePlayer = plainToInstance(FixturePlayer, plain, { excludeExtraneousValues: true });
    expect(fixturePlayer.player).toBeInstanceOf(FixturePlayerInfo);
    expect(fixturePlayer.player?.id).toBe(10);
    expect(fixturePlayer.player?.name).toBe('Test Player');
    expect(fixturePlayer.player?.teamId).toBe(200);
    expect(fixturePlayer.player?.nationalityId).toBe(5);
    expect(fixturePlayer.player?.type).toBe(PlayerType.Coach);
  });

  it('should handle partial properties', (): void => {
    const plain = {
      PlayerId: 15,
      ShirtNumber: '15',
    };
    const fixturePlayer = plainToInstance(FixturePlayer, plain, { excludeExtraneousValues: true });
    expect(fixturePlayer.playerId).toBe(15);
    expect(fixturePlayer.shirtNumber).toBe('15');
    expect(fixturePlayer.isCaptain).toBeUndefined();
    expect(fixturePlayer.isStartingLineup).toBeUndefined();
    expect(fixturePlayer.position).toBeUndefined();
    expect(fixturePlayer.state).toBeUndefined();
    expect(fixturePlayer.player).toBeUndefined();
  });
});

