import { Expose } from 'class-transformer';

import { CompetitionType } from '@lsports/entities';

/**
 * CompetitionBodyStructure class is responsible for deserializing the response
 * from the metadata API to a competition body structure.
 */
export class CompetitionBodyStructure {
  @Expose({ name: 'Id' })
  id!: number;

  @Expose({ name: 'Name' })
  name?: string;

  @Expose({ name: 'Type' })
  type!: CompetitionType;

  @Expose({ name: 'TrackId' })
  trackId!: number;
}
