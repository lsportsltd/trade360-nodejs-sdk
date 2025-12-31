import { Expose } from 'class-transformer';
import { BaseEntity } from '@entities';

/**
 * GetToursRequestDto class for sending request
 * to get tours from the API.
 *
 * @param tourId Optional filter by tour ID
 * @param sportId Optional filter by sport ID
 */
export class GetToursRequestDto implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'TourId' })
  tourId?: number;

  @Expose({ name: 'SportId' })
  sportId?: number;

  constructor(data: Partial<GetToursRequestDto> = {}) {
    Object.assign(this, data);
  }

  get EntityId(): string {
    return this.tourId?.toString() || '';
  }
}



