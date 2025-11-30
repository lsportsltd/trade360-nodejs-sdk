import { plainToInstance } from 'class-transformer';
import { Incident } from '../../../../src/entities/core-entities/livescore/incident';
import { Result } from '../../../../src/entities/core-entities/livescore/result';
import { SubstitutionPlayers } from '../../../../src/entities/core-entities/livescore/substitution-players';
import { SubstitutionPlayer } from '../../../../src/entities/core-entities/livescore/substitution-player';

describe('Incident Entity', () => {
  it('should deserialize a plain object into an Incident instance', (): void => {
    const plain = {
      Period: 1,
      IncidentType: 5,
      Seconds: 120,
      ParticipantPosition: 'Forward',
      PlayerId: '123',
      PlayerName: 'John Doe',
      Results: [{ id: 1 }, { id: 2 }],
    };
    const incident = plainToInstance(Incident, plain, { excludeExtraneousValues: true });
    expect(incident).toBeInstanceOf(Incident);
    expect(incident.period).toBe(1);
    expect(incident.incidentType).toBe(5);
    expect(incident.seconds).toBe(120);
    expect(incident.participantPosition).toBe('Forward');
    expect(incident.playerId).toBe('123');
    expect(incident.playerName).toBe('John Doe');
    expect(Array.isArray(incident.results)).toBe(true);
    expect(incident.results?.[0]).toBeInstanceOf(Result);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const incident = plainToInstance(Incident, plain, { excludeExtraneousValues: true });
    expect(incident.period).toBeUndefined();
    expect(incident.incidentType).toBeUndefined();
    expect(incident.seconds).toBeUndefined();
    expect(incident.participantPosition).toBeUndefined();
    expect(incident.playerId).toBeUndefined();
    expect(incident.playerName).toBeUndefined();
    expect(incident.results).toBeUndefined();
    expect(incident.players).toBeUndefined();
  });

  it('should deserialize players correctly', (): void => {
    const plain = {
      Period: 1,
      IncidentType: 10,
      Seconds: 4320,
      Players: {
        Item1: [{ Id: 207444, Name: 'Ferran Torres' }],
        Item2: [{ Id: 643815, Name: 'Lamine Yamal' }],
      },
    };
    const incident = plainToInstance(Incident, plain, { excludeExtraneousValues: true });
    expect(incident).toBeInstanceOf(Incident);
    expect(incident.players).toBeInstanceOf(SubstitutionPlayers);
    expect(Array.isArray(incident.players?.item1)).toBe(true);
    expect(Array.isArray(incident.players?.item2)).toBe(true);
    expect(incident.players?.item1?.[0]).toBeInstanceOf(SubstitutionPlayer);
    expect(incident.players?.item2?.[0]).toBeInstanceOf(SubstitutionPlayer);
    expect(incident.players?.item1?.[0].id).toBe(207444);
    expect(incident.players?.item1?.[0].name).toBe('Ferran Torres');
    expect(incident.players?.item2?.[0].id).toBe(643815);
    expect(incident.players?.item2?.[0].name).toBe('Lamine Yamal');
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Period: 2,
      Extra: 'ignore me',
    };
    const incident = plainToInstance(Incident, plain, { excludeExtraneousValues: true });
    expect((incident as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
