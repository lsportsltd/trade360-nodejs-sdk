import { Expose, Type } from 'class-transformer';

import { Location } from '@entities';

export class LocationsCollectionResponse {
  @Expose({ name: 'Locations' })
  @Type(() => Location)
  locations?: Location[];
}
