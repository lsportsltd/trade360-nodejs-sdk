import { plainToInstance } from 'class-transformer';
import { DangerIndicator } from '../../../../src/entities/core-entities/livescore/danger-indicator';
import { DangerIndicatorStatus } from '../../../../src/entities/core-entities/enums/danger-indicator-status';
import { DangerIndicatorType } from '../../../../src/entities/core-entities/enums/danger-indicator-type';

describe('DangerIndicator Entity', () => {
  it('should deserialize a plain object into a DangerIndicator instance', (): void => {
    const plain = {
      Type: DangerIndicatorType.General,
      Status: DangerIndicatorStatus.Safe,
      LastUpdate: '2024-06-01T12:00:00Z',
    };
    const indicator = plainToInstance(DangerIndicator, plain, { excludeExtraneousValues: true });
    expect(indicator).toBeInstanceOf(DangerIndicator);
    expect(indicator.type).toBe(DangerIndicatorType.General);
    expect(indicator.status).toBe(DangerIndicatorStatus.Safe);
    expect(indicator.lastUpdate).toBeInstanceOf(Date);
    expect(indicator.lastUpdate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const indicator = plainToInstance(DangerIndicator, plain, { excludeExtraneousValues: true });
    expect(indicator.type).toBeUndefined();
    expect(indicator.status).toBeUndefined();
    expect(indicator.lastUpdate).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Type: DangerIndicatorType.Cards,
      Status: DangerIndicatorStatus.Danger,
      Extra: 'ignore me',
    };
    const indicator = plainToInstance(DangerIndicator, plain, { excludeExtraneousValues: true });
    expect((indicator as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
