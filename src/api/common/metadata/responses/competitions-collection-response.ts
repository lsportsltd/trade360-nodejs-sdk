import { Expose, Type } from 'class-transformer';

import { CompetitionBodyStructure } from '../body-entities';

/**
 * CompetitionCollectionResponse class is responsible for deserializing the response
 * from the metadata API to a collection of competitions.
 */
export class CompetitionCollectionResponse {
  @Expose({ name: 'Competitions' })
  @Type(() => CompetitionBodyStructure)
  competitions?: CompetitionBodyStructure[];
}
