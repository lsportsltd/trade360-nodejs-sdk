import { ParticipantBodyStructure } from '../../../../../src/api/common/body-entities/responses/participant-body-structure';
import { Gender } from '../../../../../src/api/common/body-entities/responses/gender.enum';
import { AgeCategory } from '../../../../../src/api/common/body-entities/responses/age-category.enum';
import { ParticipantType } from '../../../../../src/api/common/body-entities/responses/participant-type.enum';

describe('ParticipantBodyStructure', () => {
  it('should instantiate with default values', () => {
    const participant = new ParticipantBodyStructure();

    expect(participant).toBeInstanceOf(ParticipantBodyStructure);
    expect(participant.id).toBeUndefined();
    expect(participant.sportId).toBeUndefined();
    expect(participant.locationId).toBeUndefined();
    expect(participant.name).toBeUndefined();
    expect(participant.gender).toBeUndefined();
    expect(participant.ageCategory).toBeUndefined();
    expect(participant.type).toBeUndefined();
  });

  it('should set and get all properties', () => {
    const participant = new ParticipantBodyStructure();

    participant.id = 123;
    participant.sportId = 6046;
    participant.locationId = 142;
    participant.name = 'Manchester United';
    participant.gender = Gender.Men;
    participant.ageCategory = AgeCategory.Regular;
    participant.type = ParticipantType.Club;

    expect(participant.id).toBe(123);
    expect(participant.sportId).toBe(6046);
    expect(participant.locationId).toBe(142);
    expect(participant.name).toBe('Manchester United');
    expect(participant.gender).toBe(Gender.Men);
    expect(participant.ageCategory).toBe(AgeCategory.Regular);
    expect(participant.type).toBe(ParticipantType.Club);
  });

  it('should handle nullable enum properties', () => {
    const participant = new ParticipantBodyStructure();

    participant.id = 100;
    participant.sportId = 1;
    participant.locationId = 5;
    participant.name = 'Test Participant';
    participant.gender = null;
    participant.ageCategory = null;
    participant.type = null;

    expect(participant.id).toBe(100);
    expect(participant.sportId).toBe(1);
    expect(participant.locationId).toBe(5);
    expect(participant.name).toBe('Test Participant');
    expect(participant.gender).toBeNull();
    expect(participant.ageCategory).toBeNull();
    expect(participant.type).toBeNull();
  });

  it('should handle different gender values', () => {
    const participant = new ParticipantBodyStructure();

    participant.gender = Gender.Women;
    expect(participant.gender).toBe(Gender.Women);
    expect(participant.gender).toBe(2);

    participant.gender = Gender.Mix;
    expect(participant.gender).toBe(Gender.Mix);
    expect(participant.gender).toBe(3);
  });

  it('should handle different age category values', () => {
    const participant = new ParticipantBodyStructure();

    participant.ageCategory = AgeCategory.Youth;
    expect(participant.ageCategory).toBe(AgeCategory.Youth);
    expect(participant.ageCategory).toBe(1);

    participant.ageCategory = AgeCategory.Reserves;
    expect(participant.ageCategory).toBe(AgeCategory.Reserves);
    expect(participant.ageCategory).toBe(2);
  });

  it('should handle different participant type values', () => {
    const participant = new ParticipantBodyStructure();

    participant.type = ParticipantType.National;
    expect(participant.type).toBe(ParticipantType.National);
    expect(participant.type).toBe(2);

    participant.type = ParticipantType.Individual;
    expect(participant.type).toBe(ParticipantType.Individual);
    expect(participant.type).toBe(3);

    participant.type = ParticipantType.Virtual;
    expect(participant.type).toBe(ParticipantType.Virtual);
    expect(participant.type).toBe(4);

    participant.type = ParticipantType.Esports;
    expect(participant.type).toBe(ParticipantType.Esports);
    expect(participant.type).toBe(5);

    participant.type = ParticipantType.VirtuReal;
    expect(participant.type).toBe(ParticipantType.VirtuReal);
    expect(participant.type).toBe(6);

    participant.type = ParticipantType.Doubles;
    expect(participant.type).toBe(ParticipantType.Doubles);
    expect(participant.type).toBe(7);
  });
});
