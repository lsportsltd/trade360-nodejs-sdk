import { Expose } from 'class-transformer';

export class Participant {
  @Expose({ name: 'ParticipantId' })
  participantId!: number;

  @Expose({ name: 'ParticipantName' })
  participantName?: string;
}
