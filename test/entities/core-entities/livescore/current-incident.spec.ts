import { plainToInstance } from 'class-transformer';
import { CurrentIncident } from '../../../../src/entities/core-entities/livescore/current-incident';

describe('CurrentIncident Entity', () => {
  it('should deserialize a plain object into a CurrentIncident instance', (): void => {
    const plain = {
      Id: 1,
      Name: 'Incident1',
      LastUpdate: '2024-06-01T12:00:00Z',
    };
    const incident = plainToInstance(CurrentIncident, plain, { excludeExtraneousValues: true });
    expect(incident).toBeInstanceOf(CurrentIncident);
    expect(incident.id).toBe(1);
    expect(incident.name).toBe('Incident1');
    expect(incident.lastUpdate).toBeInstanceOf(Date);
    expect(incident.lastUpdate?.toISOString()).toBe('2024-06-01T12:00:00.000Z');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const incident = plainToInstance(CurrentIncident, plain, { excludeExtraneousValues: true });
    expect(incident.id).toBeUndefined();
    expect(incident.name).toBeUndefined();
    expect(incident.lastUpdate).toBeUndefined();
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
