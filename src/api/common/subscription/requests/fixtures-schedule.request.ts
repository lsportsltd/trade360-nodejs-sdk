import { Expose } from 'class-transformer';

import { HttpRequestDto } from '@api/common/dtos';

/**
 * GetFixtureScheduleRequest class for sending request
 * to get fixture schedule from the API. It extends the
 * HttpRequestDto class and contains the properties for
 * the request to get fixture schedule from the API.
 * @param sportIds The sport IDs to filter the fixture
 * schedule by in the request to get fixture schedule
 * from the API.
 * @param locationIds The location IDs to filter the
 * fixture schedule by in the request to get fixture
 * schedule from the API.
 * @param leagueIds The league IDs to filter the
 * fixture schedule by in the request to get fixture
 * schedule from the API.
 * @returns GetFixtureScheduleRequest instance that
 * contains the properties for the request to get
 * fixture schedule from the API.
 */
export class GetFixtureScheduleRequest extends HttpRequestDto {
  @Expose()
  sportIds?: number[];

  @Expose()
  locationIds?: number[];

  @Expose()
  leagueIds?: number[];
}
