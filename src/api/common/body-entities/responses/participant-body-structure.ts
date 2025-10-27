import { Expose, Type } from 'class-transformer';
import { Gender } from './gender.enum';
import { AgeCategory } from './age-category.enum';
import { ParticipantType } from './participant-type.enum';

/**
 * ParticipantBodyStructure class is responsible for
 * deserializing the response from the metadata
 * API to a participant.
 */
export class ParticipantBodyStructure {
  @Expose({ name: 'Id' })
  public id?: number;

  @Expose({ name: 'SportId' })
  public sportId?: number;

  @Expose({ name: 'LocationId' })
  public locationId?: number;

  @Expose({ name: 'Name' })
  public name?: string;

  @Expose({ name: 'Gender' })
  @Type(() => Number)
  public gender?: Gender | null;

  @Expose({ name: 'AgeCategory' })
  @Type(() => Number)
  public ageCategory?: AgeCategory | null;

  @Expose({ name: 'Type' })
  @Type(() => Number)
  public type?: ParticipantType | null;
}
