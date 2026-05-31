import { plainToInstance } from 'class-transformer';
import { OutrightLeagueMarketCompetition } from '../../../../src/entities/core-entities/outright-league/outright-league-market-competition';

describe('OutrightLeagueMarketCompetition', () => {
  it('should deserialize NextFixtureStartTime for type 40 market messages', (): void => {
    const plain = {
      Id: 67,
      Name: 'League_67',
      Type: 3,
      NextFixtureStartTime: '2026-05-29T14:44:55Z',
    };
    const competition = plainToInstance(OutrightLeagueMarketCompetition, plain, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    expect(competition).toBeInstanceOf(OutrightLeagueMarketCompetition);
    expect(competition.id).toBe(67);
    expect(competition.name).toBe('League_67');
    expect(competition.type).toBe(3);
    expect(competition.nextFixtureStartTime).toEqual(new Date('2026-05-29T14:44:55Z'));
  });
});
