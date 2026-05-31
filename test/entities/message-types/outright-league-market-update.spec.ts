import { readFileSync } from 'fs';
import { join } from 'path';
import { plainToInstance } from 'class-transformer';

import { MarketEvent, OutrightLeagueMarketCompetition } from '@lsports/entities';
import { OutrightLeagueMarketUpdate } from '../../../src/entities/message-types/outright-league-market-update';
import { TransformerUtil } from '../../../src/utilities/transformer-util';
import { BaseEntity } from '../../../src/entities/message-types';

describe('OutrightLeagueMarketUpdate (type 40)', () => {
  const payload = JSON.parse(
    readFileSync(
      join(__dirname, '../../fixtures/outright-league-market-update-type40.json'),
      'utf-8',
    ),
  );

  it('should deserialize a full production payload including NextFixtureStartTime', (): void => {
    const update = plainToInstance(OutrightLeagueMarketUpdate, payload, {
      excludeExtraneousValues: true,
    });

    expect(update.competition).toBeInstanceOf(OutrightLeagueMarketCompetition);
    expect(update.competition?.id).toBe(67);
    expect(update.competition?.name).toBe('League_67');
    expect(update.competition?.type).toBe(3);
    expect(update.competition?.nextFixtureStartTime).toEqual(new Date('2026-05-29T14:44:55Z'));

    const season = update.competition?.competitions?.[0];
    expect(season?.id).toBe(2029);
    expect(season?.name).toBe('Season_2029');
    expect(season?.type).toBe(4);

    const event = season?.events?.[0];
    expect(event).toBeInstanceOf(MarketEvent);
    expect(event?.fixtureId).toBe(26721036);

    const market = event?.markets?.[0];
    expect(market?.id).toBe(274);
    expect(market?.name).toBe('Outright Winner');
    expect(market?.bets).toHaveLength(2);
    expect(market?.bets?.[0]?.id).toBe('2655634626721036');
    expect(market?.bets?.[0]?.name).toBe('Not Simply Simon');
    expect(market?.bets?.[0]?.participantId).toBe(51523593);
    expect(market?.providerMarkets?.[0]?.id).toBe(8);
    expect(market?.providerMarkets?.[0]?.name).toBe('Bet365');
    expect(market?.providerMarkets?.[0]?.Bets?.[0]?.id).toBe('23362');
  });

  it('should deserialize NextFixtureStartTime via TransformerUtil like the feed consumer', (): void => {
    const update = TransformerUtil.transform(payload as BaseEntity, OutrightLeagueMarketUpdate);

    expect(update.competition?.nextFixtureStartTime).toEqual(new Date('2026-05-29T14:44:55Z'));
  });
});
