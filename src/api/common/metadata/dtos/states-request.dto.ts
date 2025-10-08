import { Expose, Type } from 'class-transformer';
import { BaseEntity } from '@entities';

/**
 * Filter structure for the states request
 */
export class StateFilterDto implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'CountryIds' })
  @Type(() => Number)
  countryIds?: number[];

  @Expose({ name: 'StateIds' })
  @Type(() => Number)
  stateIds?: number[];

  constructor(data: Partial<StateFilterDto> = {}) {
    Object.assign(this, data);
  }

  get EntityId(): string {
    if (!this.stateIds) {
      return '';
    }
    return this.stateIds.join(',');
  }
}

/**
 * GetStatesRequest class for sending request
 * to get states from the API.
 *
 * @param filter Filter parameters for the states
 */
export class GetStatesRequestDto implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Filter' })
  @Type(() => StateFilterDto)
  filter?: StateFilterDto;

  constructor(data: Partial<GetStatesRequestDto> = {}) {
    if (data.filter) {
      // Check if 'filter' is already an instance of StateFilterDto
      if (data.filter instanceof StateFilterDto) {
        this.filter = data.filter;
      } else {
        // Create a new StateFilterDto from the plain object
        this.filter = new StateFilterDto(data.filter);
      }
    }
  }

  get EntityId(): string {
    return this.filter?.EntityId || '';
  }
}
