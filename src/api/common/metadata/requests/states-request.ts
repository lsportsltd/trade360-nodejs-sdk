import { Expose, Type } from 'class-transformer';
import { HttpRequestDto } from '@api/common/dtos/http-request.dto';
import { BaseEntity } from '@entities';

/**
 * Filter structure for the states request
 */
export class StatesFilter implements BaseEntity {
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
}

/**
 * GetStatesRequest class for sending request
 * to get states from the API.
 *
 * @param filter State field parameters to filter by
 */
export class GetStatesRequest extends HttpRequestDto {
  constructor(data?: unknown) {
    super();
    Object.assign(this, data);
  }

  @Expose()
  @Type(() => StatesFilter)
  filter?: StatesFilter;
}
