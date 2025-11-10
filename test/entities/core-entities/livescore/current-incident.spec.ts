import { plainToInstance } from 'class-transformer';
import { CurrentIncident } from '../../../../src/entities/core-entities/livescore/current-incident';
import { IncidentConfirmation } from '../../../../src/entities/core-entities/enums/incident-confirmation';
import { IncidentType } from '../../../../src/entities/core-entities/enums/incident-type';

describe('CurrentIncident Entity', () => {
  it('should deserialize a plain object into a CurrentIncident instance', (): void => {
    const plain = {
      Id: IncidentType.Corners,
      Name: 'Incident1',
      LastUpdate: '2024-06-01T12:00:00Z',
      Confirmation: IncidentConfirmation.Confirmed,
    };
    const incident = plainToInstance(CurrentIncident, plain, { excludeExtraneousValues: true });
    expect(incident).toBeInstanceOf(CurrentIncident);
    expect(incident.id).toBe(IncidentType.Corners);
    expect(incident.name).toBe('Incident1');
    expect(incident.lastUpdate).toBeInstanceOf(Date);
    expect(incident.lastUpdate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
    expect(incident.confirmation).toBe(IncidentConfirmation.Confirmed);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const incident = plainToInstance(CurrentIncident, plain, { excludeExtraneousValues: true });
    expect(incident.id).toBeUndefined();
    expect(incident.name).toBeUndefined();
    expect(incident.lastUpdate).toBeUndefined();
    expect(incident.confirmation).toBeUndefined();
  });

  it('should handle different confirmation enum values', (): void => {
    const plainConfirmed = {
      Id: IncidentType.ShotsOnTarget,
      Name: 'Confirmed Incident',
      Confirmation: IncidentConfirmation.Confirmed,
    };
    const plainTBD = {
      Id: IncidentType.ShotsOffTarget,
      Name: 'TBD Incident',
      Confirmation: IncidentConfirmation.TBD,
    };
    const plainCancelled = {
      Id: IncidentType.Attacks,
      Name: 'Cancelled Incident',
      Confirmation: IncidentConfirmation.Cancelled,
    };

    const confirmedIncident = plainToInstance(CurrentIncident, plainConfirmed, { excludeExtraneousValues: true });
    const tbdIncident = plainToInstance(CurrentIncident, plainTBD, { excludeExtraneousValues: true });
    const cancelledIncident = plainToInstance(CurrentIncident, plainCancelled, { excludeExtraneousValues: true });

    expect(confirmedIncident.confirmation).toBe(IncidentConfirmation.Confirmed);
    expect(tbdIncident.confirmation).toBe(IncidentConfirmation.TBD);
    expect(cancelledIncident.confirmation).toBe(IncidentConfirmation.Cancelled);
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: IncidentType.Goal,
      Name: 'Test Incident',
      Extra: 'ignore me',
    };
    const incident = plainToInstance(CurrentIncident, plain, { excludeExtraneousValues: true });
    expect((incident as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });

  it('should handle IncidentType enum values correctly', (): void => {
    const testCases = [
      { type: IncidentType.NotSet, value: 0 },
      { type: IncidentType.Corners, value: 1 },
      { type: IncidentType.Goal, value: 9 },
      { type: IncidentType.YellowCard, value: 6 },
      { type: IncidentType.RedCard, value: 7 },
    ];

    testCases.forEach(({ type, value }) => {
      const plain = {
        Id: value,
        Name: 'Test',
      };
      const incident = plainToInstance(CurrentIncident, plain, { excludeExtraneousValues: true });
      expect(incident.id).toBe(type);
      expect(incident.id).toBe(value);
    });
  });
});
