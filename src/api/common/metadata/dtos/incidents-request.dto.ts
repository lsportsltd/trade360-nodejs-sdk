import { Expose, Transform, Type, TransformationType, TransformFnParams } from 'class-transformer';
import { BaseEntity } from '@entities';
import moment, { isMoment, Moment as MomentType } from 'moment';

/**
 * Filter structure for the incidents request
 */
export class IncidentsFilterDto implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Ids' })
  @Type(() => Number)
  ids?: number[];

  @Expose({ name: 'Sports' })
  @Type(() => Number)
  sports?: number[];

  @Expose({ name: 'SearchText' })
  searchText?: string[];

  @Expose({ name: 'From' })
  @Transform(({ value, type }: TransformFnParams) => {
    if (type === TransformationType.PLAIN_TO_CLASS) {
      if (isMoment(value)) return value.utc(); // Ensure UTC
      if (typeof value === 'string') {
        // Only accept ISO date-time formats:
        // 1. "2023-04-27 18:36:39" - standard format with space
        // 2. "2023-04-27T18:36:39Z" - ISO 8601 format with T and optional Z
        const isLikelyValidDateString =
          /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})?$/.test(value);
        if (isLikelyValidDateString) {
          const parsedDate = moment(value);
          if (parsedDate.isValid()) {
            return parsedDate.utc();
          }
        }
        return undefined;
      }
      return value;
    }
    if (type === TransformationType.CLASS_TO_PLAIN) {
      if (isMoment(value)) {
        // For serialization, return ISO string format
        return value.toISOString();
      }
    }
    return value;
  })
  from?: MomentType;

  constructor(data: Partial<IncidentsFilterDto> = {}) {
    Object.assign(this, data);
  }

  get EntityId(): string {
    if (!this.searchText) {
      return '';
    }
    return this.searchText.join(',');
  }
}

/**
 * GetIncidentsRequest class for sending request
 * to get incidents from the API.
 *
 * @param filter Filter parameters for the incidents
 */
export class GetIncidentsRequestDto implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Filter' })
  @Type(() => IncidentsFilterDto)
  filter?: IncidentsFilterDto;

  constructor(data: Partial<GetIncidentsRequestDto> = {}) {
    if (data.filter) {
      // Check if 'filter' is already an instance of IncidentsFilterDto
      if (data.filter instanceof IncidentsFilterDto) {
        this.filter = data.filter;
      } else {
        // Create a new IncidentsFilterDto from the plain object
        this.filter = new IncidentsFilterDto(data.filter);
      }
    }
  }

  get EntityId(): string {
    return this.filter?.EntityId || '';
  }
}
