import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';

/**
 * Filter structure for the venues request
 */
export class VenueFilterDto implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'VenueIds' })
  @Type(() => Number)
  venueIds?: number[];

  @Expose({ name: 'CountryIds' })
  @Type(() => Number)
  countryIds?: number[];

  @Expose({ name: 'StateIds' })
  @Type(() => Number)
  stateIds?: number[];

  @Expose({ name: 'CityIds' })
  @Type(() => Number)
  cityIds?: number[];

  constructor(data: Partial<VenueFilterDto> = {}) {
    Object.assign(this, data);
  }

  get EntityId(): string {
    if (!this.venueIds) {
      return '';
    }
    return this.venueIds.join(',');
  }
}

/**
 * GetVenuesRequest class for sending request
 * to get venues from the API.
 *
 * @param filter Filter parameters for the venues
 */
export class GetVenuesRequestDto implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Filter' })
  @Type(() => VenueFilterDto)
  filter?: VenueFilterDto;

  constructor(data: Partial<GetVenuesRequestDto> = {}) {
    if (data.filter) {
      // Check if 'filter' is already an instance of VenueFilterDto
      if (data.filter instanceof VenueFilterDto) {
        this.filter = data.filter;
      } else {
        // Create a new VenueFilterDto from the plain object
        this.filter = new VenueFilterDto(data.filter);
      }
    }
  }

  get EntityId(): string {
    return this.filter?.EntityId || '';
  }
}
