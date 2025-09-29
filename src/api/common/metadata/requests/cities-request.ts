import { Expose, Type } from 'class-transformer';
import { HttpRequestDto } from '@api/common/dtos/http-request.dto';
import { BaseEntity } from '@entities';

/**
 * Filter structure for the cities request
 */
export class CitiesFilter implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

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
 * GetCitiesRequest class for sending request
 * to get cities from the API.
 *
 * @param filter City field parameters to filter by
 */
export class GetCitiesRequest extends HttpRequestDto {
  constructor(data?: unknown) {
    super();
    Object.assign(this, data);
  }

  @Expose()
  @Type(() => CitiesFilter)
  filter?: CitiesFilter;
}
