import { Expose } from 'class-transformer';

/**
 * LocationBodyStructure class is responsible for
 * deserializing the response from the metadata
 * API to a location.
 */
export class LocationsBodyStructure {
  @Expose({ name: 'Id' })
  public id?: number;

  @Expose({ name: 'Name' })
  public name?: string;
}
