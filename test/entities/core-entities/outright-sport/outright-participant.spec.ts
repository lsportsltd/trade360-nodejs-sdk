import { plainToInstance } from 'class-transformer';
import { OutrightParticipant } from '../../../../src/entities/core-entities/outright-sport/outright-participant';
import { NameValueRecord } from '../../../../src/entities/core-entities/common/name-value-record';
import { ActiveParticipant } from '../../../../src/entities/core-entities/enums/active-participant';

describe('OutrightParticipant', () => {
  it('should deserialize a plain object into an OutrightParticipant instance', (): void => {
    const plain = {
      Id: 1,
      Name: 'Participant 1',
      Position: '1st',
      RotationId: 150,
      IsActive: ActiveParticipant.Active,
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
});
