import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';

/**
 * Filter structure for the cities request
 */
export class CityFilterDto implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'CountryIds' })
  @Type(() => Number)
  countryIds?: number[];

  @Expose({ name: 'StateIds' })
  @Type(() => Number)
  stateIds?: number[];

  @Expose({ name: 'CityIds' })
  @Type(() => Number)
  cityIds?: number[];

  constructor(data: Partial<CityFilterDto> = {}) {
    Object.assign(this, data);
  }

  get EntityId(): string {
    if (!this.cityIds) {
      return '';
    }
    return this.cityIds.join(',');
  }
}

/**
 * GetCitiesRequest class for sending request
 * to get cities from the API.
 *
 * @param filter Filter parameters for the cities
 */
export class GetCitiesRequestDto implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Filter' })
  @Type(() => CityFilterDto)
  filter?: CityFilterDto;

  constructor(data: Partial<GetCitiesRequestDto> = {}) {
    if (data.filter) {
      // Check if 'filter' is already an instance of CityFilterDto
      if (data.filter instanceof CityFilterDto) {
        this.filter = data.filter;
      } else {
        // Create a new CityFilterDto from the plain object
        this.filter = new CityFilterDto(data.filter);
      }
    }
  }

  get EntityId(): string {
    return this.filter?.EntityId || '';
  }
}
