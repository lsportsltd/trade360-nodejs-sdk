import { IncidentConfirmation } from '../../../../src/entities/core-entities/enums/incident-confirmation';

describe('IncidentConfirmation Enum', () => {
  it('should map names to values correctly', () => {
    expect(IncidentConfirmation.Confirmed).toBe(0);
    expect(IncidentConfirmation.TBD).toBe(1);
    expect(IncidentConfirmation.Cancelled).toBe(2);
  });

  it('should map values to names correctly (reverse mapping)', () => {
    expect(IncidentConfirmation[0]).toBe('Confirmed');
    expect(IncidentConfirmation[1]).toBe('TBD');
    expect(IncidentConfirmation[2]).toBe('Cancelled');
  });

  it('should contain all expected enum keys', () => {
    const keys = Object.keys(IncidentConfirmation).filter((k) => isNaN(Number(k)));
    expect(keys).toEqual(['Confirmed', 'TBD', 'Cancelled']);
  });
});
