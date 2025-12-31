import { Expose } from 'class-transformer';

/**
 * SeasonBodyStructure class is responsible for
 * deserializing the response from the metadata
 * API to a season.
 */
export class SeasonBodyStructure {
  @Expose({ name: 'SeasonId' })
  public seasonId?: number;

  @Expose({ name: 'SeasonName' })
  public seasonName?: string;
}



