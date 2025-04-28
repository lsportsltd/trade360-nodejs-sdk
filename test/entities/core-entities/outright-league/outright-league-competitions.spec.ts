import { plainToInstance } from 'class-transformer';
import { OutrightLeagueCompetitions } from '../../../../src/entities/core-entities/outright-league/outright-league-competitions';
import { BaseEntity } from '../../../../src/entities/message-types';

class DummyEvent implements BaseEntity {
  [key: string]: unknown;

  id?: number;
}

describe('OutrightLeagueCompetitions', () => {
  it('should deserialize a plain object into an OutrightLeagueCompetitions instance', (): void => {
    const plain = { Id: 1, Name: 'Comp', Type: 2, Events: [{ id: 10 }, { id: 11 }] };
    // We use as unknown as new (...args: unknown[]) => OutrightLeagueCompetitions<DummyEvent> to bypass the generic for test purposes
    const competitions = plainToInstance(
      OutrightLeagueCompetitions as unknown as new (
        ...args: unknown[]
      ) => OutrightLeagueCompetitions<DummyEvent>,
      plain,
      { excludeExtraneousValues: true },
    ) as OutrightLeagueCompetitions<DummyEvent>;
    expect(competitions).toBeInstanceOf(OutrightLeagueCompetitions);
    expect(competitions.id).toBe(1);
    expect(competitions.name).toBe('Comp');
    expect(competitions.type).toBe(2);
    expect(Array.isArray(competitions.events)).toBe(true);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    // We use as unknown as new (...args: unknown[]) => OutrightLeagueCompetitions<DummyEvent> to bypass the generic for test purposes
    const competitions = plainToInstance(
      OutrightLeagueCompetitions as unknown as new (
        ...args: unknown[]
      ) => OutrightLeagueCompetitions<DummyEvent>,
      plain,
      { excludeExtraneousValues: true },
    ) as OutrightLeagueCompetitions<DummyEvent>;
    expect(competitions.id).toBeUndefined();
    expect(competitions.name).toBeUndefined();
    expect(competitions.type).toBeUndefined();
    expect(competitions.events).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { Id: 2, Extra: 'ignore me' };
    // We use as unknown as new (...args: unknown[]) => OutrightLeagueCompetitions<DummyEvent> to bypass the generic for test purposes
    const competitions = plainToInstance(
      OutrightLeagueCompetitions as unknown as new (
        ...args: unknown[]
      ) => OutrightLeagueCompetitions<DummyEvent>,
      plain,
      { excludeExtraneousValues: true },
    ) as OutrightLeagueCompetitions<DummyEvent>;
    expect((competitions as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
