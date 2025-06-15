import { plainToInstance } from 'class-transformer';
import { StatisticValue } from '../../../../src/entities/core-entities/livescore/statistic-value';

describe('StatisticValue Entity', () => {
  it('should deserialize a plain object into a StatisticValue instance', (): void => {
    const plain = {
      Id: 1,
      Name: 'Goals',
      Value: '2'
    };
    const statisticValue = plainToInstance(StatisticValue, plain, { excludeExtraneousValues: true });
    expect(statisticValue).toBeInstanceOf(StatisticValue);
    expect(statisticValue.id).toBe(1);
    expect(statisticValue.name).toBe('Goals');
    expect(statisticValue.value).toBe('2');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const statisticValue = plainToInstance(StatisticValue, plain, { excludeExtraneousValues: true });
    expect(statisticValue.id).toBeUndefined();
    expect(statisticValue.name).toBeUndefined();
    expect(statisticValue.value).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 2,
      Name: 'Assists',
      Value: '3',
      Extra: 'ignore me'
    };
    const statisticValue = plainToInstance(StatisticValue, plain, { excludeExtraneousValues: true });
    expect((statisticValue as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});