import { Expose, Type } from 'class-transformer';
// import { HttpRequestDto } from '@api/common';
import { HttpRequestDto } from '@api/common/dtos/http-request.dto';
import { BaseEntity } from '@lsports/entities';

/**
 * Filter structure for the incidents request
 */
export class IncidentsFilter implements BaseEntity {
  [key: string]: unknown;

  @Expose()
  @Type(() => Number)
  ids?: number[];

  @Expose()
  @Type(() => Number)
  sports?: number[];

  @Expose()
  @Type(() => String)
  searchText?: string[];

  @Expose()
  from?: string;
}

/**
 * GetIncidentsRequest class for sending request
 * to get incidents from the API.
 *
 * @param filter Incident field parameters to filter by
 */
export class GetIncidentsRequest extends HttpRequestDto {
  @Expose()
  @Type(() => IncidentsFilter)
  filter?: IncidentsFilter;
}
