import { plainToInstance } from 'class-transformer';
import { Statistic } from '../../../../src/entities/core-entities/livescore/statistic';
import { Result } from '../../../../src/entities/core-entities/livescore/result';
import { Incident } from '../../../../src/entities/core-entities/livescore/incident';
import { StatisticType } from '../../../../src/entities/core-entities/enums/statistic-type';

describe('Statistic Entity', () => {
  it('should deserialize a plain object into a Statistic instance', (): void => {
    const plain = {
      Type: StatisticType.Goal,
      Results: [{ position: '1st', value: '2' }],
      Incidents: [{ period: 1 }],
    };
    const statistic = plainToInstance(Statistic, plain, { excludeExtraneousValues: true });
    expect(statistic).toBeInstanceOf(Statistic);
    expect(statistic.type).toBe(StatisticType.Goal);
    expect(Array.isArray(statistic.results)).toBe(true);
    expect(statistic.results?.[0]).toBeInstanceOf(Result);
    expect(Array.isArray(statistic.incidents)).toBe(true);
    expect(statistic.incidents?.[0]).toBeInstanceOf(Incident);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const statistic = plainToInstance(Statistic, plain, { excludeExtraneousValues: true });
    expect(statistic.type).toBeUndefined();
    expect(statistic.results).toBeUndefined();
    expect(statistic.incidents).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Type: StatisticType.Corners,
      Extra: 'ignore me',
    };
    const statistic = plainToInstance(Statistic, plain, { excludeExtraneousValues: true });
    expect((statistic as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
