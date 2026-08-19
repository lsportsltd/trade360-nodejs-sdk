import { plainToInstance } from 'class-transformer';
import { OutrightLeagueEventsCompetitionElement } from '../../../../../src/api/common/snapshot/responses/outright-league-events-response';

describe('OutrightLeagueEventsCompetitionElement', () => {
  it('should deserialize NextFixtureStartTime from GetOutrightLeagueEvents', (): void => {
    const plain = {
      Id: 67,
      Name: 'League_67',
      Type: 3,
      NextFixtureStartTime: '2026-05-29T14:44:55Z',
    };
    const competition = plainToInstance(OutrightLeagueEventsCompetitionElement, plain, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    expect(competition).toBeInstanceOf(OutrightLeagueEventsCompetitionElement);
    expect(competition.id).toBe(67);
    expect(competition.name).toBe('League_67');
    expect(competition.type).toBe(3);
    expect(competition.nextFixtureStartTime).toEqual(new Date('2026-05-29T14:44:55Z'));
  });
});
