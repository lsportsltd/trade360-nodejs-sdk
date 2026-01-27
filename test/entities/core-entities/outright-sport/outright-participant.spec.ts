import { plainToInstance } from 'class-transformer';
import { OutrightParticipant } from '../../../../src/entities/core-entities/outright-sport/outright-participant';
import { NameValueRecord } from '../../../../src/entities/core-entities/common/name-value-record';
import { ActiveParticipant } from '../../../../src/entities/core-entities/enums/active-participant';
import { FixturePlayer } from '../../../../src/entities/core-entities/fixture/fixture-player';

describe('OutrightParticipant', () => {
  it('should deserialize a plain object into an OutrightParticipant instance', (): void => {
    const plain = {
      Id: 1,
      Name: 'Participant 1',
      Position: '1st',
      RotationId: 150,
      IsActive: ActiveParticipant.Active,
      Form: 'WWDLW',
      Formation: '4-3-3',
      FixturePlayers: [{ PlayerId: 10, ShirtNumber: '10' }],
      Gender: 1,
      AgeCategory: 21,
      Type: 1,
      ExtraData: [{ Name: 'foo', Value: 'bar' }],
    };
    const participant = plainToInstance(OutrightParticipant, plain, {
      excludeExtraneousValues: true,
    });
    expect(participant).toBeInstanceOf(OutrightParticipant);
    expect(participant.id).toBe(1);
    expect(participant.name).toBe('Participant 1');
    expect(participant.position).toBe('1st');
    expect(participant.rotationId).toBe(150);
    expect(participant.isActive).toBe(ActiveParticipant.Active);
    expect(participant.form).toBe('WWDLW');
    expect(participant.formation).toBe('4-3-3');
    expect(Array.isArray(participant.fixturePlayers)).toBe(true);
    expect(participant.fixturePlayers?.[0]).toBeInstanceOf(FixturePlayer);
    expect(participant.gender).toBe(1);
    expect(participant.ageCategory).toBe(21);
    expect(participant.type).toBe(1);
    expect(Array.isArray(participant.extraData)).toBe(true);
    expect(participant.extraData?.[0]).toBeInstanceOf(NameValueRecord);
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const participant = plainToInstance(OutrightParticipant, plain, {
      excludeExtraneousValues: true,
    });
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
    expect(participant.extraData).toBeUndefined();
  });

  it('should ignore extraneous properties', (): void => {
    const plain = { Id: 2, Extra: 'ignore me' };
    const participant = plainToInstance(OutrightParticipant, plain, {
      excludeExtraneousValues: true,
    });
    expect((participant as unknown as { Extra?: unknown }).Extra).toBeUndefined();
  });

  it('should deserialize rotationId property correctly', (): void => {
    const plain = {
      Id: 3,
      Name: 'Participant 3',
      RotationId: 300,
    };
    const participant = plainToInstance(OutrightParticipant, plain, {
      excludeExtraneousValues: true,
    });
    expect(participant.rotationId).toBe(300);
  });

  it('should deserialize Form property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Team A',
      Form: 'WWWWW',
    };
    const participant = plainToInstance(OutrightParticipant, plain, {
      excludeExtraneousValues: true,
    });
    expect(participant.form).toBe('WWWWW');
  });

  it('should deserialize Formation property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Team A',
      Formation: '4-4-2',
    };
    const participant = plainToInstance(OutrightParticipant, plain, {
      excludeExtraneousValues: true,
    });
    expect(participant.formation).toBe('4-4-2');
  });

  it('should deserialize FixturePlayers property correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Team A',
      FixturePlayers: [
        { PlayerId: 10, ShirtNumber: '10', IsCaptain: true },
        { PlayerId: 7, ShirtNumber: '7', IsCaptain: false },
      ],
    };
    const participant = plainToInstance(OutrightParticipant, plain, {
      excludeExtraneousValues: true,
    });
    expect(Array.isArray(participant.fixturePlayers)).toBe(true);
    expect(participant.fixturePlayers?.length).toBe(2);
    expect(participant.fixturePlayers?.[0]).toBeInstanceOf(FixturePlayer);
    expect(participant.fixturePlayers?.[0].playerId).toBe(10);
  });

  it('should deserialize Gender, AgeCategory, and Type properties correctly', (): void => {
    const plain = {
      Id: 1,
      Name: 'Team A',
      Gender: 1,
      AgeCategory: 18,
      Type: 2,
    };
    const participant = plainToInstance(OutrightParticipant, plain, {
      excludeExtraneousValues: true,
    });
    expect(participant.gender).toBe(1);
    expect(participant.ageCategory).toBe(18);
    expect(participant.type).toBe(2);
  });
});
