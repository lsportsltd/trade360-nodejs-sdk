import { Expose, Type } from 'class-transformer';

import { OutrightParticipantResult } from './outright-participant-element';
import { FixtureStatus } from '@lsports/enums';

/**
 * Outright Score Element class is responsible for
 * deserializing the response from the snapshot API to a
 * outright score element structure.
 */
export class OutrightScoreElement {
  @Expose({ name: 'ParticipantResults' })
  @Type(() => OutrightParticipantResult)
  participantResults: OutrightParticipantResult[] = [];

  @Expose({ name: 'Status' })
  status!: FixtureStatus;
}
