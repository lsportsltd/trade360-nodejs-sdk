import { Expose, Type } from 'class-transformer';

import { Location } from '@entities';

/**
 * LocationsCollectionResponse class is responsible for deserializing the response
 * from the metadata API to a collection of locations.
 */
export class LocationsCollectionResponse {
  @Expose({ name: 'Locations' })
  @Type(() => Location)
  locations?: Location[];
}
