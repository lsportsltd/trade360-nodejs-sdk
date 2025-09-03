/* eslint-env jest */
import { PrematchSnapshotApiClientPrefixUrl } from '../../../../src/api/snapshot-api/enums/prematch-snapshot-routes-prefix-url';

describe('PrematchSnapshotApiClientPrefixUrl Enum', () => {
  it('should have correct route values for all prematch endpoints', () => {
    expect(PrematchSnapshotApiClientPrefixUrl.GET_EVENTS_PREFIX_URL).toBe('/Prematch/GetEvents');
    expect(PrematchSnapshotApiClientPrefixUrl.GET_FIXTURE_MARKETS_PREFIX_URL).toBe(
      '/Prematch/GetFixtureMarkets',
    );
    expect(PrematchSnapshotApiClientPrefixUrl.GET_FIXTURES_PREFIX_URL).toBe(
      '/Prematch/GetFixtures',
    );
    expect(PrematchSnapshotApiClientPrefixUrl.GET_SCORES_PREFIX_URL).toBe('/Prematch/GetScores');
    expect(PrematchSnapshotApiClientPrefixUrl.GET_OUTRIGHT_EVENT_PREFIX_URL).toBe(
      '/Prematch/GetOutrightEvents',
    );
    expect(PrematchSnapshotApiClientPrefixUrl.GET_OUTRIGHT_FIXTURE_PREFIX_URL).toBe(
      '/Prematch/GetOutrightFixture',
    );
    expect(PrematchSnapshotApiClientPrefixUrl.GET_OUTRIGHT_LEAGUES_PREFIX_URL).toBe(
      '/Prematch/GetOutrightLeagues',
    );
    expect(PrematchSnapshotApiClientPrefixUrl.GET_OUTRIGHT_LEAGUES_MARKETS_PREFIX_URL).toBe(
      '/Prematch/GetOutrightLeagueMarkets',
    );
    expect(PrematchSnapshotApiClientPrefixUrl.GET_OUTRIGHT_LEAGUE_EVENTS_PREFIX_URL).toBe(
      '/Prematch/GetOutrightLeagueEvents',
    );
    expect(PrematchSnapshotApiClientPrefixUrl.GET_OUTRIGHT_FIXTURE_MARKETS_PREFIX_URL).toBe(
      '/Prematch/GetOutrightFixtureMarkets',
    );
    expect(PrematchSnapshotApiClientPrefixUrl.GET_OUTRIGHT_SCORES_PREFIX_URL).toBe(
      '/Prematch/GetOutrightScores',
    );
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(PrematchSnapshotApiClientPrefixUrl);
    expect(keys).toEqual([
      'GET_EVENTS_PREFIX_URL',
      'GET_FIXTURE_MARKETS_PREFIX_URL',
      'GET_FIXTURES_PREFIX_URL',
      'GET_SCORES_PREFIX_URL',
      'GET_OUTRIGHT_EVENT_PREFIX_URL',
      'GET_OUTRIGHT_FIXTURE_PREFIX_URL',
      'GET_OUTRIGHT_LEAGUES_PREFIX_URL',
      'GET_OUTRIGHT_LEAGUES_MARKETS_PREFIX_URL',
      'GET_OUTRIGHT_LEAGUE_EVENTS_PREFIX_URL',
      'GET_OUTRIGHT_FIXTURE_MARKETS_PREFIX_URL',
      'GET_OUTRIGHT_SCORES_PREFIX_URL',
    ]);
  });

  it('should have 11 total endpoints (4 standard + 7 outright)', () => {
    const keys = Object.keys(PrematchSnapshotApiClientPrefixUrl);
    expect(keys).toHaveLength(11);
  });

  it('should contain all outright endpoint keys', () => {
    const keys = Object.keys(PrematchSnapshotApiClientPrefixUrl);
    const outrightKeys = keys.filter((key) => key.includes('OUTRIGHT'));
    expect(outrightKeys).toHaveLength(7);
    expect(outrightKeys).toEqual([
      'GET_OUTRIGHT_EVENT_PREFIX_URL',
      'GET_OUTRIGHT_FIXTURE_PREFIX_URL',
      'GET_OUTRIGHT_LEAGUES_PREFIX_URL',
      'GET_OUTRIGHT_LEAGUES_MARKETS_PREFIX_URL',
      'GET_OUTRIGHT_LEAGUE_EVENTS_PREFIX_URL',
      'GET_OUTRIGHT_FIXTURE_MARKETS_PREFIX_URL',
      'GET_OUTRIGHT_SCORES_PREFIX_URL',
    ]);
  });

  it('should have all routes prefixed with /Prematch/', () => {
    const values = Object.values(PrematchSnapshotApiClientPrefixUrl);
    values.forEach((route) => {
      expect(route).toMatch(/^\/Prematch\//);
    });
  });

  it('should differentiate from inplay routes by using Prematch prefix', () => {
    const values = Object.values(PrematchSnapshotApiClientPrefixUrl);
    values.forEach((route) => {
      expect(route).not.toMatch(/^\/Inplay\//);
      expect(route).toMatch(/^\/Prematch\//);
    });
  });

  it('should have unique route values', () => {
    const values = Object.values(PrematchSnapshotApiClientPrefixUrl);
    const uniqueValues = new Set(values);
    expect(uniqueValues.size).toBe(values.length);
  });

  it('should maintain consistent naming pattern for outright endpoints', () => {
    const outrightRoutes = Object.values(PrematchSnapshotApiClientPrefixUrl).filter((route) =>
      route.includes('Outright'),
    );

    outrightRoutes.forEach((route) => {
      expect(route).toMatch(/^\/Prematch\/GetOutright/);
    });
  });
});
