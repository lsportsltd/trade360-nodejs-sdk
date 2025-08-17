import { Expose } from 'class-transformer';

import { BaseEntity } from '@lsports/entities';

/**
 * GetFixtureScheduleRequestDto class for sending request
 *  to get fixture schedule from the API. It contains the
 * properties for the request to get fixture schedule
 * from the API.
 * @param sportIds The sport IDs to filter the fixture
 * schedule by in the request to get fixture schedule from
 * the API.
 * @param locationIds The location IDs to filter the
 * fixture schedule by in the request to get fixture schedule
 *  from the API.
 * @param leagueIds The league IDs to filter the fixture
 * schedule by in the request to get fixture schedule from
 * the API.
 * @returns GetFixtureScheduleRequestDto instance that
 * contains the properties* for the request to get fixture
 * schedule from the API.
 */
export class GetFixtureScheduleRequestDto implements BaseEntity {
  [key: string]: unknown;

  constructor(data?: unknown) {
    Object.assign(this, data);
  }

  @Expose({ name: 'SportIds' })
  sportIds?: number[];

  @Expose({ name: 'LocationIds' })
  locationIds?: number[];

  @Expose({ name: 'LeagueIds' })
  leagueIds?: number[];
}
