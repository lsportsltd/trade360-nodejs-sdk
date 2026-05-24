import { plainToInstance } from 'class-transformer';

import { MarketEvent, OutrightLeagueFixtureEvent } from '@lsports/entities';
import {
  OutrightLeagueFixtureUpdate,
  OutrightLeagueMarketUpdate,
  OutrightLeagueSettlementUpdate,
} from '../../../../src/entities/message-types';

describe('Outright league nested event transform (TR-23836)', () => {
  const competitionPayload38 = {
    Id: 1,
    Name: 'C',
    Type: 1,
    Competitions: [
      {
        Id: 10,
        Name: 'Sub',
        Type: 2,
        Events: [{ FixtureId: 99, OutrightLeague: { Status: 1 } }],
      },
    ],
  };

  const competitionPayload40 = {
    Id: 1,
    Name: 'C',
    Type: 1,
    Competitions: [
      {
        Id: 10,
        Name: 'Sub',
        Type: 2,
        Events: [
          {
            FixtureId: 99,
            Markets: [{ Id: 1, Name: 'M1', Bets: [{ Id: 2, Name: 'B1', Status: 1 }] }],
          },
        ],
      },
    ],
  };

  it('type 38: nested events become OutrightLeagueFixtureEvent with camelCase keys', () => {
    const msg = plainToInstance(
      OutrightLeagueFixtureUpdate,
      { Competition: competitionPayload38 },
      { excludeExtraneousValues: true },
    );
    const event = msg?.competition?.competitions?.[0]?.events?.[0];

    expect(event).toBeInstanceOf(OutrightLeagueFixtureEvent);
    expect(event?.fixtureId).toBe(99);
    expect((event as { FixtureId?: number })?.FixtureId).toBeUndefined();
  });

  it('type 40: nested events become MarketEvent with mapped markets and bets', () => {
    const msg = plainToInstance(
      OutrightLeagueMarketUpdate,
      { Competition: competitionPayload40 },
      { excludeExtraneousValues: true },
    );
    const event = msg?.competition?.competitions?.[0]?.events?.[0];
    const market = event?.markets?.[0];
    const bet = market?.bets?.[0];

    expect(event).toBeInstanceOf(MarketEvent);
    expect(event?.fixtureId).toBe(99);
    expect(market?.id).toBe(1);
    expect(market?.name).toBe('M1');
    expect(bet?.id).toBe('2');
    expect(bet?.name).toBe('B1');
    expect((event as { FixtureId?: number })?.FixtureId).toBeUndefined();
    expect((market as { Id?: number })?.Id).toBeUndefined();
    expect((bet as { Id?: number })?.Id).toBeUndefined();
  });

  it('type 43: nested events become MarketEvent with mapped markets and bets', () => {
    const msg = plainToInstance(
      OutrightLeagueSettlementUpdate,
      { Competition: competitionPayload40 },
      { excludeExtraneousValues: true },
    );
    const event = msg?.competition?.competitions?.[0]?.events?.[0];

    expect(event).toBeInstanceOf(MarketEvent);
    expect(event?.fixtureId).toBe(99);
    expect(event?.markets?.[0]?.bets?.[0]?.id).toBe('2');
  });
});
