import { Expose, Transform, Type, TransformationType, TransformFnParams } from 'class-transformer';
import { BaseEntity } from '@entities';
import moment, { Moment as MomentType } from 'moment';

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
      if (moment.isMoment(value)) return value;
      if (typeof value === 'string') {
        const m = moment(value);
        if (m.isValid()) return m;
      }
      return undefined;
    }
    if (type === TransformationType.CLASS_TO_PLAIN) {
      if (moment.isMoment(value)) return (value as MomentType).toISOString();
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
