import { Gender } from '../../../../../src/api/common/body-entities/responses/gender.enum';
import { AgeCategory } from '../../../../../src/api/common/body-entities/responses/age-category.enum';
import { ParticipantType } from '../../../../../src/api/common/body-entities/responses/participant-type.enum';

describe('Gender Enum', () => {
  it('should have correct values', () => {
    expect(Gender.Men).toBe(1);
    expect(Gender.Women).toBe(2);
    expect(Gender.Mix).toBe(3);
  });

  it('should have all expected members', () => {
    const genderValues = Object.values(Gender).filter((value) => typeof value === 'number');
    expect(genderValues).toHaveLength(3);
    expect(genderValues).toContain(1);
    expect(genderValues).toContain(2);
    expect(genderValues).toContain(3);
  });
});

describe('AgeCategory Enum', () => {
  it('should have correct values', () => {
    expect(AgeCategory.Regular).toBe(0);
    expect(AgeCategory.Youth).toBe(1);
    expect(AgeCategory.Reserves).toBe(2);
  });

  it('should have all expected members', () => {
    const ageCategoryValues = Object.values(AgeCategory).filter(
      (value) => typeof value === 'number',
    );
    expect(ageCategoryValues).toHaveLength(3);
    expect(ageCategoryValues).toContain(0);
    expect(ageCategoryValues).toContain(1);
    expect(ageCategoryValues).toContain(2);
  });
});

describe('ParticipantType Enum', () => {
  it('should have correct values', () => {
    expect(ParticipantType.Club).toBe(1);
    expect(ParticipantType.National).toBe(2);
    expect(ParticipantType.Individual).toBe(3);
    expect(ParticipantType.Virtual).toBe(4);
    expect(ParticipantType.Esports).toBe(5);
    expect(ParticipantType.VirtuReal).toBe(6);
    expect(ParticipantType.Doubles).toBe(7);
  });

  it('should have all expected members', () => {
    const participantTypeValues = Object.values(ParticipantType).filter(
      (value) => typeof value === 'number',
    );
    expect(participantTypeValues).toHaveLength(7);
    expect(participantTypeValues).toContain(1);
    expect(participantTypeValues).toContain(2);
    expect(participantTypeValues).toContain(3);
    expect(participantTypeValues).toContain(4);
    expect(participantTypeValues).toContain(5);
    expect(participantTypeValues).toContain(6);
    expect(participantTypeValues).toContain(7);
  });
});
