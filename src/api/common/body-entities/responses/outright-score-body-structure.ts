import { Expose, Type } from 'class-transformer';

import { OutrightParticipantResultBodyStructure } from './outright-participant-body-structure';
import { FixtureStatus } from '@lsports/enums';

/**
 * Outright Score Element class is responsible for
 * deserializing the response from the snapshot API to a
 * outright score element structure.
 */
export class OutrightScoreBodyStructure {
  @Expose({ name: 'ParticipantResults' })
  @Type(() => OutrightParticipantResultBodyStructure)
  participantResults: OutrightParticipantResultBodyStructure[] = [];

  @Expose({ name: 'Status' })
  status!: FixtureStatus;
}
