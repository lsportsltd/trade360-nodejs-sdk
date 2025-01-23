import { Expose, Type } from 'class-transformer';

import { OutrightParticipantResultBodyStructure } from './outright-participant-body-structure';
import { FixtureStatus } from '@lsports/enums';

/**
 * Outright Livescore Structure class is responsible for
 * deserializing the response from the snapshot API to a
 * outright livescore body structure.
 */
export class OutrightLivescore {
  @Expose({ name: 'status' })
  status!: FixtureStatus;

  @Expose({ name: 'ParticipantResults' })
  @Type(() => OutrightParticipantResultBodyStructure)
  events: OutrightParticipantResultBodyStructure[] = [];
}
