import { Expose, Type } from 'class-transformer';

import { BaseEntity } from '@entities';

import { LocationsBodyStructure } from '@api/common/body-entities';

/**
 * LocationsCollectionResponse class is responsible for deserializing the response
 * from the metadata API to a collection of locations.
 */
export class LocationsCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Locations' })
  @Type(() => LocationsBodyStructure)
  locations?: LocationsBodyStructure[];
}
