import { plainToInstance } from 'class-transformer';
import { OutrightCompetition } from '../../../../src/entities/core-entities/outright-sport/outright-competition';

describe('OutrightCompetition', () => {
  it('should deserialize a plain object into an OutrightCompetition instance', (): void => {
    const plain = { Id: 1, Name: 'Competition 1' };
    const competition = plainToInstance(OutrightCompetition, plain, {
      excludeExtraneousValues: true,
    });
    expect(competition).toBeInstanceOf(OutrightCompetition);
    expect(competition.id).toBe(1);
    expect(competition.name).toBe('Competition 1');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const competition = plainToInstance(OutrightCompetition, plain, {
      excludeExtraneousValues: true,
    });
    expect(competition.id).toBeUndefined();
    expect(competition.name).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { Id: 2, Extra: 'ignore me' };
    const competition = plainToInstance(OutrightCompetition, plain, {
      excludeExtraneousValues: true,
    });
    expect((competition as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
