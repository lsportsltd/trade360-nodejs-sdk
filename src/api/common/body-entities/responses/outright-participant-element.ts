import { Expose } from 'class-transformer';

/**
 * Outright Participant Result Structure class is responsible for
 * deserializing the response from the snapshot API to a
 * outright participant structure.
 */
export class OutrightParticipantResult {
  @Expose({ name: 'ParticipantId' })
  participantId!: number;

  @Expose({ name: 'Name' })
  name!: string;

  @Expose({ name: 'Result' })
  result!: number;
}
