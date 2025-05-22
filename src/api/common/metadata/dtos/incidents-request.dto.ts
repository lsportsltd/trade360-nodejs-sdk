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
      if (isMoment(value)) return value;
      if (typeof value === 'string') {
        // Support ISO date-time formats:
        // 1. "2023-04-27 18:36:39" (standard ISO format with space)
        // 2. "2023-10-01T10:00:00Z" (ISO 8601 with T and optional Z)
        const isLikelyValidDateString =
          /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value) || // Format: YYYY-MM-DD HH:MM:SS
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})?$/.test(value); // ISO 8601 format

        if (isLikelyValidDateString) {
          const m = moment(value);
          if (m.isValid()) return m;
        }
        // Skip moment parsing for obviously invalid date strings
        return undefined;
      }
      return undefined;
    }
    if (type === TransformationType.CLASS_TO_PLAIN) {
      if (isMoment(value)) return (value as MomentType).toISOString();
      return value;
    }
    return value;
  })
  from?: MomentType;

  constructor(data?: Partial<IncidentsFilterDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  get EntityId(): string {
    return this.searchText?.join(',') || '';
  }
}

/**
 * GetIncidentsRequestDto class for sending a request
 * to get incidents from the API. It contains the
 * properties for the request to get incidents.
 */
export class GetIncidentsRequestDto implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Filter' })
  @Type(() => IncidentsFilterDto)
  filter?: IncidentsFilterDto;

  constructor(data?: Partial<GetIncidentsRequestDto & { filter: Partial<IncidentsFilterDto> }>) {
    if (data) {
      if (data.filter instanceof IncidentsFilterDto) {
        this.filter = data.filter;
      } else if (data.filter) {
        this.filter = new IncidentsFilterDto(data.filter);
      }
    }
  }

  get EntityId(): string {
    return this.filter?.EntityId || '';
  }
}
