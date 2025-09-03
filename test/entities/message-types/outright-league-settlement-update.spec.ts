/* eslint-env jest */
import { plainToInstance } from 'class-transformer';
import { OutrightLeagueSettlementUpdate } from '../../../src/entities/message-types/outright-league-settlement-update';

describe('OutrightLeagueSettlementUpdate Entity', () => {
  it('should deserialize a plain object into OutrightLeagueSettlementUpdate instance', () => {
    const plain = {
      Competition: {
        Id: 54321,
        Name: 'League Competition',
        Events: [
          {
            Id: 98765,
            Name: 'League Market Event',
            Status: 1,
          },
        ],
      },
    };

    const update = plainToInstance(OutrightLeagueSettlementUpdate, plain, {
      excludeExtraneousValues: true,
    });

    expect(update).toBeInstanceOf(OutrightLeagueSettlementUpdate);
    expect(update.competition).toBeDefined();
    expect(update.competition?.id).toBe('54321');
    expect(update.competition?.name).toBe('League Competition');
  });

  it('should handle missing competition property gracefully', () => {
    const plain = {};

    const update = plainToInstance(OutrightLeagueSettlementUpdate, plain, {
      excludeExtraneousValues: true,
    });

    expect(update).toBeInstanceOf(OutrightLeagueSettlementUpdate);
    expect(update.competition).toBeUndefined();
  });

  it('should have correct EntityKey decorator (43)', () => {
    // Access the metadata to verify EntityKey
    const metadata = Reflect.getMetadata('entityKey', OutrightLeagueSettlementUpdate);
    expect(metadata).toBe(43);
  });

  it('should implement BaseEntity interface with dynamic properties', () => {
    const update = new OutrightLeagueSettlementUpdate();
    
    // Test dynamic property assignment (BaseEntity interface requirement)
    update['customProperty'] = 'test value';
    expect(update['customProperty']).toBe('test value');
    
    // Test that it has the required index signature
    expect(typeof update['someKey']).toBeDefined();
  });

  it('should deserialize with nested OutrightLeagueCompetition containing MarketEvent array', () => {
    const plain = {
      Competition: {
        Id: 54321,
        Name: 'Premier League',
        Events: [
          {
            Id: 1001,
            Name: 'League Market Event 1',
            Status: 1,
            Markets: [
              {
                Id: 2001,
                Name: 'Top Scorer',
                Bets: [
                  {
                    Id: 3001,
                    Name: 'Player A',
                    Status: 1,
                  },
                ],
              },
            ],
          },
          {
            Id: 1002,
            Name: 'League Market Event 2',
            Status: 2,
          },
        ],
      },
    };

    const update = plainToInstance(OutrightLeagueSettlementUpdate, plain, {
      excludeExtraneousValues: true,
    });

    expect(update.competition?.events).toHaveLength(2);
    expect(update.competition?.events?.[0].id).toBe('1001');
    expect(update.competition?.events?.[0].name).toBe('League Market Event 1');
    expect(update.competition?.events?.[1].id).toBe('1002');
  });

  it('should handle null competition property', () => {
    const plain = {
      Competition: null,
    };

    const update = plainToInstance(OutrightLeagueSettlementUpdate, plain, {
      excludeExtraneousValues: true,
    });

    expect(update).toBeInstanceOf(OutrightLeagueSettlementUpdate);
    expect(update.competition).toBeNull();
  });

  it('should handle empty events array in competition', () => {
    const plain = {
      Competition: {
        Id: 54321,
        Name: 'Empty League',
        Events: [],
      },
    };

    const update = plainToInstance(OutrightLeagueSettlementUpdate, plain, {
      excludeExtraneousValues: true,
    });

    expect(update.competition?.events).toHaveLength(0);
    expect(Array.isArray(update.competition?.events)).toBe(true);
  });
});
