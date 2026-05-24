import { MarketEvent } from '../../../../src/entities/core-entities/market/market-event';
import { OutrightLeagueFixtureEvent } from '../../../../src/entities/core-entities/outright-league/outright-league-fixture-event';
import { transformToEventInstance } from '../../../../src/entities/core-entities/utilities/transform-event-instance';

describe('transformToEventInstance', () => {
  it('maps OutrightLeague events to OutrightLeagueFixtureEvent instances', () => {
    const result = transformToEventInstance([
      { FixtureId: 1, OutrightLeague: { Status: 2 } },
    ]) as OutrightLeagueFixtureEvent[];

    expect(result[0]).toBeInstanceOf(OutrightLeagueFixtureEvent);
    expect(result[0].fixtureId).toBe(1);
  });

  it('maps Markets events to MarketEvent instances with nested markets', () => {
    const result = transformToEventInstance([
      {
        FixtureId: 2,
        Markets: [{ Id: 10, Name: 'Winner', Bets: [{ Id: 20, Name: 'Home', Status: 1 }] }],
      },
    ]) as MarketEvent[];

    expect(result[0]).toBeInstanceOf(MarketEvent);
    expect(result[0].fixtureId).toBe(2);
    expect(result[0].markets?.[0]?.id).toBe(10);
    expect(result[0].markets?.[0]?.bets?.[0]?.id).toBe('20');
  });

  it('returns empty arrays unchanged', () => {
    expect(transformToEventInstance([])).toEqual([]);
  });
});
