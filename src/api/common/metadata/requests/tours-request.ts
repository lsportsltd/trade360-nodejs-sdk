import { Expose } from 'class-transformer';
import { HttpRequestDto } from '@api/common/dtos/http-request.dto';

/**
 * GetToursRequest class for sending request
 * to get tours from the API.
 *
 * @param tourId Optional filter by tour ID
 * @param sportId Optional filter by sport ID
 */
export class GetToursRequest extends HttpRequestDto {
  constructor(data?: unknown) {
    super();
    Object.assign(this, data);
  }

  @Expose()
  tourId?: number;

  @Expose()
  sportId?: number;
}



