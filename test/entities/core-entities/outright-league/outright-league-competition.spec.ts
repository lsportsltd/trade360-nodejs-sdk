import { plainToInstance } from 'class-transformer';
import { OutrightLeagueCompetition } from '../../../../src/entities/core-entities/outright-league/outright-league-competition';

describe('OutrightLeagueCompetition', () => {
  it('should deserialize a plain object into an OutrightLeagueCompetition instance', (): void => {
    const plain = { Id: 1, Name: 'Competition 1' };
    const competition = plainToInstance(OutrightLeagueCompetition, plain, {
      excludeExtraneousValues: true,
    });
    expect(competition).toBeInstanceOf(OutrightLeagueCompetition);
    expect(competition.id).toBe(1);
    expect(competition.name).toBe('Competition 1');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const competition = plainToInstance(OutrightLeagueCompetition, plain, {
      excludeExtraneousValues: true,
    });
    expect(competition.id).toBeUndefined();
    expect(competition.name).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { Id: 2, Extra: 'ignore me' };
    const competition = plainToInstance(OutrightLeagueCompetition, plain, {
      excludeExtraneousValues: true,
    });
    expect((competition as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });

  it('should deserialize NextFixtureStartTime', (): void => {
    const plain = {
      Id: 67,
      Name: 'League_67',
      Type: 3,
      NextFixtureStartTime: '2026-05-29T14:44:55Z',
    };
    const competition = plainToInstance(OutrightLeagueCompetition, plain, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    expect(competition.nextFixtureStartTime).toEqual(new Date('2026-05-29T14:44:55Z'));
  });
});
