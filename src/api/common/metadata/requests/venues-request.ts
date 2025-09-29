import { Expose, Type } from 'class-transformer';
import { HttpRequestDto } from '@api/common/dtos/http-request.dto';
import { BaseEntity } from '@entities';

/**
 * Filter structure for the venues request
 */
export class VenuesFilter implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose()
  @Type(() => Number)
  venueIds?: number[];

  @Expose()
  @Type(() => Number)
  countryIds?: number[];

  @Expose()
  @Type(() => Number)
  stateIds?: number[];

  @Expose()
  @Type(() => Number)
  cityIds?: number[];
}

/**
 * GetVenuesRequest class for sending request
 * to get venues from the API.
 *
 * @param filter Venue field parameters to filter by
 */
export class GetVenuesRequest extends HttpRequestDto {
  constructor(data?: unknown) {
    super();
    Object.assign(this, data);
  }

  @Expose()
  @Type(() => VenuesFilter)
  filter?: VenuesFilter;
}
