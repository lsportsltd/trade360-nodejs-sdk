import { plainToInstance } from 'class-transformer';
import { Period } from '../../../../src/entities/core-entities/livescore/period';
import { Result } from '../../../../src/entities/core-entities/livescore/result';
import { Incident } from '../../../../src/entities/core-entities/livescore/incident';

describe('Period Entity', () => {
  it('should deserialize a plain object into a Period instance', (): void => {
    const plain = {
      Type: 1,
      IsFinished: true,
      IsConfirmed: false,
      Results: [{ id: 1 }],
      Incidents: [{ period: 1 }],
      SubPeriods: [{ Type: 2 }],
      SequenceNumber: 10,
    };
    const period = plainToInstance(Period, plain, { excludeExtraneousValues: true });
    expect(period).toBeInstanceOf(Period);
    expect(period.type).toBe(1);
    expect(period.isFinished).toBe(true);
    expect(period.isConfirmed).toBe(false);
    expect(Array.isArray(period.results)).toBe(true);
    expect(period.results?.[0]).toBeInstanceOf(Result);
    expect(Array.isArray(period.incidents)).toBe(true);
    expect(period.incidents?.[0]).toBeInstanceOf(Incident);
    expect(Array.isArray(period.subPeriods)).toBe(true);
    expect(period.subPeriods?.[0]).toBeInstanceOf(Period);
    expect(period.sequenceNumber).toBe(10);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const period = plainToInstance(Period, plain, { excludeExtraneousValues: true });
    expect(period.type).toBeUndefined();
    expect(period.isFinished).toBeUndefined();
    expect(period.isConfirmed).toBeUndefined();
    expect(period.results).toBeUndefined();
    expect(period.incidents).toBeUndefined();
    expect(period.subPeriods).toBeUndefined();
    expect(period.sequenceNumber).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Type: 3,
      Extra: 'ignore me',
    };
    const period = plainToInstance(Period, plain, { excludeExtraneousValues: true });
    expect((period as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
