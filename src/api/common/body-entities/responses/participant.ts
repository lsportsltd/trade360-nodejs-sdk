import { Expose } from 'class-transformer';

/**
 * Participant class is responsible for deserializing
 * the response from the subscription API to a participant.
 */
export class Participant {
  @Expose({ name: 'ParticipantId' })
  participantId!: number;

  @Expose({ name: 'ParticipantName' })
  participantName?: string;
}
