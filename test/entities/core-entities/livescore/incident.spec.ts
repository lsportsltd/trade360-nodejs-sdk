import { plainToInstance } from 'class-transformer';
import { Incident } from '../../../../src/entities/core-entities/livescore/incident';
import { Result } from '../../../../src/entities/core-entities/livescore/result';

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
