import { Expose, Type } from 'class-transformer';
import { BaseCollectionResponse } from './base-collection-response';
import { VenueBodyStructure } from '@api/common/body-entities/responses';

/**
 * VenuesCollectionResponse class is responsible
 * for deserializing the response from the metadata
 * API to a collection of venues.
 */
export class VenuesCollectionResponse extends BaseCollectionResponse<VenueBodyStructure> {
  constructor(data?: unknown) {
    super();
    Object.assign(this, data);
  }

  @Expose({ name: 'Data' })
  @Type(() => VenueBodyStructure)
  data?: VenueBodyStructure[];
}
