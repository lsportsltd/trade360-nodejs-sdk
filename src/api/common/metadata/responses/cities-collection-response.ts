import { Expose, Type } from 'class-transformer';
import { BaseCollectionResponse } from './base-collection-response';
import { CityBodyStructure } from '@api/common/body-entities/responses';

/**
 * CitiesCollectionResponse class is responsible
 * for deserializing the response from the metadata
 * API to a collection of cities.
 */
export class CitiesCollectionResponse extends BaseCollectionResponse<CityBodyStructure> {
  constructor(data?: unknown) {
    super();
    Object.assign(this, data);
  }

  @Expose({ name: 'Data' })
  @Type(() => CityBodyStructure)
  data?: CityBodyStructure[];
}
