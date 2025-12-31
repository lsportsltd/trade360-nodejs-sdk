import { Expose } from 'class-transformer';
import { HttpRequestDto } from '@api/common/dtos/http-request.dto';

/**
 * GetSeasonsRequest class for sending request
 * to get seasons from the API.
 *
 * @param seasonId Optional filter by season ID
 */
export class GetSeasonsRequest extends HttpRequestDto {
  constructor(data?: unknown) {
    super();
    Object.assign(this, data);
  }

  @Expose()
  seasonId?: number;
}



