import { Expose } from 'class-transformer';

/**
 * SportsBodyStructure class is responsible for
 * deserializing the response from the metadata
 * API to a sports body structure.
 */
export class SportsBodyStructure {
  @Expose({ name: 'Id' })
  public id?: number;

  @Expose({ name: 'Name' })
  public name?: string;
}
