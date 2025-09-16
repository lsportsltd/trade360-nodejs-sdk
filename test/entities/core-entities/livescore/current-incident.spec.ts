import { plainToInstance } from 'class-transformer';
import { CurrentIncident } from '../../../../src/entities/core-entities/livescore/current-incident';
import { IncidentConfirmation } from '../../../../src/entities/core-entities/enums/incident-confirmation';

describe('CurrentIncident Entity', () => {
  it('should deserialize a plain object into a CurrentIncident instance', (): void => {
    const plain = {
      Id: 1,
      Name: 'Incident1',
      LastUpdate: '2024-06-01T12:00:00Z',
      Confirmation: IncidentConfirmation.Confirmed,
    };
    const incident = plainToInstance(CurrentIncident, plain, { excludeExtraneousValues: true });
    expect(incident).toBeInstanceOf(CurrentIncident);
    expect(incident.id).toBe(1);
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
      Id: 2,
      Name: 'Confirmed Incident',
      Confirmation: IncidentConfirmation.Confirmed,
    };
    const plainTBD = {
      Id: 3,
      Name: 'TBD Incident',
      Confirmation: IncidentConfirmation.TBD,
    };
    const plainCancelled = {
      Id: 4,
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
      Id: 2,
      Name: 'Test Incident',
      Extra: 'ignore me',
    };
    const incident = plainToInstance(CurrentIncident, plain, { excludeExtraneousValues: true });
    expect((incident as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });
});
