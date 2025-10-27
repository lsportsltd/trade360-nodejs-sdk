import { Expose, Type } from 'class-transformer';
import { HttpRequestDto } from '@api/common/dtos/http-request.dto';
import { BaseEntity } from '@entities';
import { Gender, AgeCategory, ParticipantType } from '@api/common/body-entities/responses';

/**
 * Filter structure for the participants request
 */
export class ParticipantsFilter implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose()
  @Type(() => Number)
  ids?: number[];

  @Expose()
  @Type(() => Number)
  sportIds?: number[];

  @Expose()
  @Type(() => Number)
  locationIds?: number[];

  @Expose()
  name?: string;

  @Expose()
  @Type(() => Number)
  gender?: Gender;

  @Expose()
  @Type(() => Number)
  ageCategory?: AgeCategory;

  @Expose()
  @Type(() => Number)
  type?: ParticipantType;
}

/**
 * GetParticipantsRequest class for sending request
 * to get participants from the API.
 *
 * @param filter Participant field parameters to filter by
 * @param page Page number for pagination
 * @param pageSize Number of items per page
 */
export class GetParticipantsRequest extends HttpRequestDto {
  constructor(data?: unknown) {
    super();
    Object.assign(this, data);
  }

  @Expose()
  @Type(() => ParticipantsFilter)
  filter?: ParticipantsFilter;

  @Expose()
  @Type(() => Number)
  page?: number;

  @Expose()
  @Type(() => Number)
  pageSize?: number;
}
