import { plainToInstance } from 'class-transformer';
import { Livescore } from '../../../../src/entities/core-entities/livescore/livescore';
import { Scoreboard } from '../../../../src/entities/core-entities/livescore/scoreboard';
import { Period } from '../../../../src/entities/core-entities/livescore/period';
import { Statistic } from '../../../../src/entities/core-entities/livescore/statistic';
import { NameValueRecord } from '../../../../src/entities/core-entities/common/name-value-record';
import { CurrentIncident } from '../../../../src/entities/core-entities/livescore/current-incident';
import { DangerIndicator } from '../../../../src/entities/core-entities/livescore/danger-indicator';

describe('Livescore Entity', () => {
  it('should deserialize a plain object into a Livescore instance', (): void => {
    const plain = {
      Scoreboard: { id: 1 },
      Periods: [{ id: 2 }, { id: 3 }],
      Statistics: [{ id: 4 }, { id: 5 }],
      LivescoreExtraData: [{ name: 'foo', value: 'bar' }],
      CurrentIncident: { id: 6 },
      DangerTriggers: [{ id: 7 }],
    };
    const livescore = plainToInstance(Livescore, plain, { excludeExtraneousValues: true });
    expect(livescore).toBeInstanceOf(Livescore);
    expect(livescore.scoreboard).toBeInstanceOf(Scoreboard);
    expect(Array.isArray(livescore.periods)).toBe(true);
    expect(livescore.periods?.[0]).toBeInstanceOf(Period);
    expect(Array.isArray(livescore.statistics)).toBe(true);
    expect(livescore.statistics?.[0]).toBeInstanceOf(Statistic);
    expect(Array.isArray(livescore.livescoreExtraData)).toBe(true);
    expect(livescore.livescoreExtraData?.[0]).toBeInstanceOf(NameValueRecord);
    expect(livescore.currentIncident).toBeInstanceOf(CurrentIncident);
    expect(Array.isArray(livescore.dangerTriggers)).toBe(true);
    expect(livescore.dangerTriggers?.[0]).toBeInstanceOf(DangerIndicator);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const livescore = plainToInstance(Livescore, plain, { excludeExtraneousValues: true });
    expect(livescore.scoreboard).toBeUndefined();
    expect(livescore.periods).toBeUndefined();
    expect(livescore.statistics).toBeUndefined();
    expect(livescore.livescoreExtraData).toBeUndefined();
    expect(livescore.currentIncident).toBeUndefined();
    expect(livescore.dangerTriggers).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Scoreboard: { id: 1 },
      Extra: 'ignore me',
    };
    const livescore = plainToInstance(Livescore, plain, { excludeExtraneousValues: true });
    expect((livescore as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
