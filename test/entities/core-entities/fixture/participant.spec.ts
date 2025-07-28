import { plainToInstance } from 'class-transformer';
import { Participant } from '../../../../src/entities/core-entities/fixture/participant';
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
});
