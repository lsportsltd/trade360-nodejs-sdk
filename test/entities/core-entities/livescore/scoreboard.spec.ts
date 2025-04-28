import { plainToInstance } from 'class-transformer';
import { Scoreboard } from '../../../../src/entities/core-entities/livescore/scoreboard';
import { FixtureStatus } from '../../../../src/entities/core-entities/enums/fixture-status';
import { StatusDescription } from '../../../../src/entities/core-entities/enums/status-description';
import { Result } from '../../../../src/entities/core-entities/livescore/result';

describe('Scoreboard Entity', () => {
  it('should deserialize a plain object into a Scoreboard instance', (): void => {
    const plain = {
      Status: FixtureStatus.InProgress,
      Description: StatusDescription.HT,
      CurrentPeriod: 2,
      Time: '45:00',
      Results: [{ id: 1 }, { id: 2 }],
    };
    const scoreboard = plainToInstance(Scoreboard, plain, { excludeExtraneousValues: true });
    expect(scoreboard).toBeInstanceOf(Scoreboard);
    expect(scoreboard.status).toBe(FixtureStatus.InProgress);
    expect(scoreboard.description).toBe(StatusDescription.HT);
    expect(scoreboard.currentPeriod).toBe(2);
    expect(scoreboard.time).toBe('45:00');
    expect(Array.isArray(scoreboard.results)).toBe(true);
    expect(scoreboard.results?.[0]).toBeInstanceOf(Result);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const scoreboard = plainToInstance(Scoreboard, plain, { excludeExtraneousValues: true });
    expect(scoreboard.status).toBeUndefined();
    expect(scoreboard.description).toBeUndefined();
    expect(scoreboard.currentPeriod).toBeUndefined();
    expect(scoreboard.time).toBeUndefined();
    expect(scoreboard.results).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Status: FixtureStatus.Finished,
      Extra: 'ignore me',
    };
    const scoreboard = plainToInstance(Scoreboard, plain, { excludeExtraneousValues: true });
    expect((scoreboard as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
