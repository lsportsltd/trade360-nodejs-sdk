import { plainToInstance } from 'class-transformer';
import { Participant } from '../../../../src/entities/core-entities/fixture/participant';

describe('Participant Entity', () => {
  it('should deserialize a plain object into a Participant instance', (): void => {
    const plain = {
      Id: 5,
      Name: 'Player One',
      Position: 'Forward',
    };
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect(participant).toBeInstanceOf(Participant);
    expect(participant.id).toBe(5);
    expect(participant.name).toBe('Player One');
    expect(participant.position).toBe('Forward');
  });

  it('should handle missing properties', (): void => {
    const plain = {};
    const participant = plainToInstance(Participant, plain, { excludeExtraneousValues: true });
    expect(participant.id).toBeUndefined();
    expect(participant.name).toBeUndefined();
    expect(participant.position).toBeUndefined();
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
});
