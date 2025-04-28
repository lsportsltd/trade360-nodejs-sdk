import { plainToInstance } from 'class-transformer';
import { OutrightScore } from '../../../../src/entities/core-entities/outright-sport/outright-score';
import { ParticipantResult } from '../../../../src/entities/core-entities/outright-sport/participant-result';
import { OutrightScoreStatus } from '../../../../src/entities/core-entities/enums/outright-score-status';

describe('OutrightScore', () => {
  it('should deserialize a plain object into an OutrightScore instance', (): void => {
    const plain = {
      ParticipantResults: [{ Id: 1, Name: 'P1' }],
      Status: OutrightScoreStatus.Completed,
    };
    const score = plainToInstance(OutrightScore, plain, { excludeExtraneousValues: true });
    expect(score).toBeInstanceOf(OutrightScore);
    expect(Array.isArray(score.participantResults)).toBe(true);
    expect(score.participantResults?.[0]).toBeInstanceOf(ParticipantResult);
    expect(score.status).toBe(OutrightScoreStatus.Completed);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const score = plainToInstance(OutrightScore, plain, { excludeExtraneousValues: true });
    expect(score.participantResults).toBeUndefined();
    expect(score.status).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { Status: OutrightScoreStatus.InProgress, Extra: 'ignore me' };
    const score = plainToInstance(OutrightScore, plain, { excludeExtraneousValues: true });
    expect((score as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
