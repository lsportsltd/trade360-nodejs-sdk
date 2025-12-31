import { plainToInstance } from 'class-transformer';
import { Participant } from '../../../../src/entities/core-entities/fixture/participant';
import { FixturePlayer } from '../../../../src/entities/core-entities/fixture/fixture-player';
import { ActiveParticipant } from '../../../../src/entities/core-entities/enums/active-participant';

describe('Participant Entity', () => {
  it('should deserialize a plain object into a Participant instance', (): void => {
    const plain = {
      Id: 5,
      Name: 'Player One',
      Position: 'Forward',
      RotationId: 100,
      IsActive: ActiveParticipant.Active,
    };
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect(participant).toBeInstanceOf(Participant);
    expect(participant.id).toBe(5);
    expect(participant.name).toBe('Player One');
    expect(participant.position).toBe('Forward');
    expect(participant.rotationId).toBe(100);
    expect(participant.isActive).toBe(ActiveParticipant.Active);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect(participant.id).toBeUndefined();
    expect(participant.name).toBeUndefined();
    expect(participant.position).toBeUndefined();
    expect(participant.rotationId).toBeUndefined();
    expect(participant.isActive).toBeUndefined();
    expect(participant.form).toBeUndefined();
    expect(participant.formation).toBeUndefined();
    expect(participant.fixturePlayers).toBeUndefined();
    expect(participant.gender).toBeUndefined();
    expect(participant.ageCategory).toBeUndefined();
    expect(participant.type).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test Participant',
      Position: 'Goalkeeper',
      Extra: 'ignore me',
    };
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect((participant as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });

  it('should deserialize rotationId property correctly', (): void => {
    const plain = {
      Id: 2,
      Name: 'Player Two',
      RotationId: 250,
    };
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect(participant.rotationId).toBe(250);
  });

  it('should deserialize isActive property correctly', (): void => {
    const plainActive = {
      Id: 3,
      Name: 'Active Player',
      IsActive: ActiveParticipant.Active,
    };
    const activeParticipant = plainToInstance(Participant, plainActive, { excludeExtraneousValues: true });
    expect(activeParticipant.isActive).toBe(ActiveParticipant.Active);

    const plainInactive = {
      Id: 4,
      Name: 'Inactive Player',
      IsActive: ActiveParticipant.InActive,
    };
    const inactiveParticipant = plainToInstance(Participant, plainInactive, { excludeExtraneousValues: true });
    expect(inactiveParticipant.isActive).toBe(ActiveParticipant.InActive);
  });

  it('should deserialize Form property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test Team',
      Form: 'WWDLW',
    };
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect(participant.form).toBe('WWDLW');
  });

  it('should deserialize Formation property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test Team',
      Formation: '4-3-3',
    };
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect(participant.formation).toBe('4-3-3');
  });

  it('should deserialize FixturePlayers property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test Team',
      FixturePlayers: [
        { PlayerId: 10, ShirtNumber: '10', IsCaptain: true },
        { PlayerId: 7, ShirtNumber: '7', IsCaptain: false },
      ],
    };
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect(Array.isArray(participant.fixturePlayers)).toBe(true);
    expect(participant.fixturePlayers?.length).toBe(2);
    expect(participant.fixturePlayers?.[0]).toBeInstanceOf(FixturePlayer);
    expect(participant.fixturePlayers?.[0].playerId).toBe(10);
    expect(participant.fixturePlayers?.[0].shirtNumber).toBe('10');
    expect(participant.fixturePlayers?.[0].isCaptain).toBe(true);
  });

  it('should handle empty FixturePlayers array', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test Team',
      FixturePlayers: [],
    };
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect(Array.isArray(participant.fixturePlayers)).toBe(true);
    expect(participant.fixturePlayers?.length).toBe(0);
  });

  it('should deserialize Gender property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test Team',
      Gender: 1,
    };
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect(participant.gender).toBe(1);
  });

  it('should deserialize AgeCategory property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'U21 Team',
      AgeCategory: 21,
    };
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect(participant.ageCategory).toBe(21);
  });

  it('should deserialize Type property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Test Team',
      Type: 2,
    };
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect(participant.type).toBe(2);
  });

  it('should deserialize all new properties together', (): void => {
    const plain = {
      Id: 1,
      Name: 'Manchester United',
      Position: '1',
      RotationId: 100,
      IsActive: ActiveParticipant.Active,
      Form: 'WDWWL',
      Formation: '4-2-3-1',
      FixturePlayers: [
        { PlayerId: 1, ShirtNumber: '1', IsStartingLineup: true },
        { PlayerId: 7, ShirtNumber: '7', IsCaptain: true, IsStartingLineup: true },
      ],
      Gender: 1,
      AgeCategory: 0,
      Type: 1,
    };
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect(participant.id).toBe(1);
    expect(participant.name).toBe('Manchester United');
    expect(participant.form).toBe('WDWWL');
    expect(participant.formation).toBe('4-2-3-1');
    expect(participant.fixturePlayers?.length).toBe(2);
    expect(participant.gender).toBe(1);
    expect(participant.ageCategory).toBe(0);
    expect(participant.type).toBe(1);
  });
});
