import { IncidentType } from '../../../../src/entities/core-entities/enums/incident-type';

describe('IncidentType', () => {
  it('should have NotSet with value 0', () => {
    expect(IncidentType.NotSet).toBe(0);
  });

  it('should have Corners with value 1', () => {
    expect(IncidentType.Corners).toBe(1);
  });

  it('should have Goal with value 9', () => {
    expect(IncidentType.Goal).toBe(9);
  });

  it('should have PlayerShotsOnTarget with value 2005', () => {
    expect(IncidentType.PlayerShotsOnTarget).toBe(2005);
  });

  it('should have PlayerShotsOffTarget with value 2006', () => {
    expect(IncidentType.PlayerShotsOffTarget).toBe(2006);
  });

  it('should have all expected enum values', () => {
    // Test a sample of key values to ensure enum is properly defined
    expect(IncidentType.NotSet).toBe(0);
    expect(IncidentType.Corners).toBe(1);
    expect(IncidentType.Goal).toBe(9);
    expect(IncidentType.Penalties).toBe(8);
    expect(IncidentType.YellowCard).toBe(6);
    expect(IncidentType.RedCard).toBe(7);
    expect(IncidentType.Aces).toBe(20);
    expect(IncidentType.Dragon).toBe(1005);
    expect(IncidentType.Tower).toBe(1004);
    expect(IncidentType.Baron).toBe(1007);
    expect(IncidentType.Inhibitor).toBe(1008);
    expect(IncidentType.Kills).toBe(2019);
    expect(IncidentType.Assists).toBe(2034);
    expect(IncidentType.Crosses).toBe(2148);
    expect(IncidentType.PlayerShotsOnTarget).toBe(2005);
    expect(IncidentType.PlayerShotsOffTarget).toBe(2006);
  });

  it('should allow reverse lookup by value', () => {
    expect(IncidentType[0]).toBe('NotSet');
    expect(IncidentType[1]).toBe('Corners');
    expect(IncidentType[9]).toBe('Goal');
  });

  it('should handle numeric values correctly', () => {
    const value: number = IncidentType.Goal;
    expect(typeof value).toBe('number');
    expect(value).toBe(9);
  });
});

