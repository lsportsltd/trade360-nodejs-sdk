import { plainToInstance } from 'class-transformer';
import { PlayerStatistic } from '../../../../src/entities/core-entities/livescore/player-statistic';
import { StatisticValue } from '../../../../src/entities/core-entities/livescore/statistic-value';

describe('PlayerStatistic Entity', () => {
  it('should deserialize a plain object into a PlayerStatistic instance', (): void => {
    const plain = {
      PlayerId: 123,
      PlayerName: 'John Doe',
      TeamId: 456,
      HasPlayed: true,
      Statistics: [
        {
          Id: 1,
          Name: 'Goals',
          Value: '2'
        }
      ]
    };
    const playerStatistic = plainToInstance(PlayerStatistic, plain, { excludeExtraneousValues: true });
    expect(playerStatistic).toBeInstanceOf(PlayerStatistic);
    expect(playerStatistic.playerId).toBe(123);
    expect(playerStatistic.playerName).toBe('John Doe');
    expect(playerStatistic.teamId).toBe(456);
    expect(playerStatistic.hasPlayed).toBe(true);
    expect(Array.isArray(playerStatistic.statistics)).toBe(true);
    expect(playerStatistic.statistics?.[0]).toBeInstanceOf(StatisticValue);
    expect(playerStatistic.statistics?.[0].id).toBe(1);
    expect(playerStatistic.statistics?.[0].name).toBe('Goals');
    expect(playerStatistic.statistics?.[0].value).toBe('2');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const playerStatistic = plainToInstance(PlayerStatistic, plain, { excludeExtraneousValues: true });
    expect(playerStatistic.playerId).toBeUndefined();
    expect(playerStatistic.playerName).toBeUndefined();
    expect(playerStatistic.teamId).toBeUndefined();
    expect(playerStatistic.hasPlayed).toBeUndefined();
    expect(playerStatistic.statistics).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      PlayerId: 123,
      PlayerName: 'John Doe',
      Extra: 'ignore me'
    };
    const playerStatistic = plainToInstance(PlayerStatistic, plain, { excludeExtraneousValues: true });
    expect((playerStatistic as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});