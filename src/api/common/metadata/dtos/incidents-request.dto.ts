import { Expose, Transform, Type, plainToInstance } from 'class-transformer';
import { BaseEntity } from '@entities';
import moment, { Moment } from 'moment';

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
  @Type(() => String)
  searchText?: string[];

  @Expose({ name: 'From' })
  from?: Moment;
}

/**
 * GetIncidentsRequestDto class for sending a request
 * to get incidents from the API. It contains the
 * properties for the request to get incidents.
 */
export class GetIncidentsRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: Partial<GetIncidentsRequestDto>) {
    if (data) {
      if (data.filter) {
        if (data.filter instanceof IncidentsFilterDto) {
          this.filter = data.filter;
        } else {
          // data.filter here is your plain object: { Sports: [...], From: momentInstance }
          // This plainToInstance should take momentInstance and assign it to this.filter.from
          this.filter = plainToInstance(
            IncidentsFilterDto,
            data.filter as Record<string, unknown>,
            { excludeExtraneousValues: true },
          );
        }
      }
    }
  }

  @Expose({ name: 'Filter' })
  @Type(() => IncidentsFilterDto)
  filter?: IncidentsFilterDto;
}
