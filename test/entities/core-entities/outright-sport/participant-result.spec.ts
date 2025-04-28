import { plainToInstance } from 'class-transformer';
import { ParticipantResult } from '../../../../src/entities/core-entities/outright-sport/participant-result';

describe('ParticipantResult', () => {
  it('should deserialize a plain object into a ParticipantResult instance', (): void => {
    const plain = { ParticipantId: 1, Name: 'P1', Result: 2 };
    const result = plainToInstance(ParticipantResult, plain, { excludeExtraneousValues: true });
    expect(result).toBeInstanceOf(ParticipantResult);
    expect(result.participantId).toBe(1);
    expect(result.name).toBe('P1');
    expect(result.result).toBe(2);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const result = plainToInstance(ParticipantResult, plain, { excludeExtraneousValues: true });
    expect(result.participantId).toBeUndefined();
    expect(result.name).toBeUndefined();
    expect(result.result).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { Name: 'P2', Extra: 'ignore me' };
    const result = plainToInstance(ParticipantResult, plain, { excludeExtraneousValues: true });
    expect((result as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
