import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';
import { Gender, AgeCategory, ParticipantType } from '@api/common/body-entities/responses';

/**
 * Filter structure for the participants request
 */
export class ParticipantFilterDto implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Ids' })
  @Type(() => Number)
  ids?: number[];

  @Expose({ name: 'SportIds' })
  @Type(() => Number)
  sportIds?: number[];

  @Expose({ name: 'LocationIds' })
  @Type(() => Number)
  locationIds?: number[];

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'Gender' })
  @Type(() => Number)
  gender?: Gender;

  @Expose({ name: 'AgeCategory' })
  @Type(() => Number)
  ageCategory?: AgeCategory;

  @Expose({ name: 'Type' })
  @Type(() => Number)
  type?: ParticipantType;

  constructor(data: Partial<ParticipantFilterDto> = {}) {
    Object.assign(this, data);
  }

  get EntityId(): string {
    if (!this.ids) {
      return '';
    }
    return this.ids.join(',');
  }
}

/**
 * GetParticipantsRequest class for sending request
 * to get participants from the API.
 *
 * @param filter Filter parameters for the participants
 * @param page Page number for pagination
 * @param pageSize Number of items per page
 */
export class GetParticipantsRequestDto implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Filter' })
  @Type(() => ParticipantFilterDto)
  filter?: ParticipantFilterDto;

  @Expose({ name: 'Page' })
  @Type(() => Number)
  page?: number;

  @Expose({ name: 'PageSize' })
  @Type(() => Number)
  pageSize?: number;

  constructor(data: Partial<GetParticipantsRequestDto> = {}) {
    if (data.filter) {
      // Check if 'filter' is already an instance of ParticipantFilterDto
      if (data.filter instanceof ParticipantFilterDto) {
        this.filter = data.filter;
      } else {
        // Create a new ParticipantFilterDto from the plain object
        this.filter = new ParticipantFilterDto(data.filter);
      }
    }
    if (data.page !== undefined) {
      this.page = data.page;
    }
    if (data.pageSize !== undefined) {
      this.pageSize = data.pageSize;
    }
  }

  get EntityId(): string {
    return this.filter?.EntityId || '';
  }
}
