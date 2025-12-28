import { Expose } from 'class-transformer';
import { BaseEntity } from '@entities';

/**
 * GetSeasonsRequestDto class for sending request
 * to get seasons from the API.
 *
 * @param seasonId Optional filter by season ID
 */
export class GetSeasonsRequestDto implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'SeasonId' })
  seasonId?: number;

  constructor(data: Partial<GetSeasonsRequestDto> = {}) {
    Object.assign(this, data);
  }

  get EntityId(): string {
    return this.seasonId?.toString() || '';
  }
}



