import { Expose, Type } from 'class-transformer';

import { BaseEntity, Location } from '@entities';

/**
 * LocationsCollectionResponse class is responsible for deserializing the response
 * from the metadata API to a collection of locations.
 */
export class LocationsCollectionResponse implements BaseEntity {
  [key: string]: unknown;

  @Expose({ name: 'Locations' })
  @Type(() => Location)
  locations?: Location[];
}
