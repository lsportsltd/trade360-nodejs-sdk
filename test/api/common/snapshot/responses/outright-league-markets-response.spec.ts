import { plainToInstance } from 'class-transformer';
import { OutrightLeagueMarketsCompetitionElement } from '../../../../../src/api/common/snapshot/responses/outright-league-markets-response';

describe('OutrightLeagueMarketsCompetitionElement', () => {
  it('should deserialize NextFixtureStartTime from GetOutrightLeagueMarkets', (): void => {
    const plain = {
      Id: 67,
      Name: 'League_67',
      Type: 3,
      NextFixtureStartTime: '2026-05-29T14:44:55Z',
    };
    const competition = plainToInstance(OutrightLeagueMarketsCompetitionElement, plain, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    expect(competition).toBeInstanceOf(OutrightLeagueMarketsCompetitionElement);
    expect(competition.id).toBe(67);
    expect(competition.name).toBe('League_67');
    expect(competition.type).toBe(3);
    expect(competition.nextFixtureStartTime).toEqual(new Date('2026-05-29T14:44:55Z'));
  });
});
